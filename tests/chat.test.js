/* global process */
import test from "node:test";
import assert from "node:assert/strict";
import { createServer as createHttpServer } from "node:http";
import { createServer as createViteServer } from "vite";
import { tmpdir } from "node:os";
import { join } from "node:path";
import handler from "../api/chat.js";
import { chatDevPlugin } from "../scripts/chat-dev-plugin.js";

function responseRecorder() {
  return {
    headers: {},
    statusCode: 200,
    setHeader(key, value) { this.headers[key] = value; },
    status(code) { this.statusCode = code; return this; },
    json(value) { this.body = value; return this; },
  };
}

async function withEnvironment(callback) {
  const originalKey = process.env.GEMINI_API_KEY;
  const originalModel = process.env.CHATBOT_MODEL;
  process.env.GEMINI_API_KEY = "test-only-not-a-real-key";
  delete process.env.CHATBOT_MODEL;
  try { await callback(); } finally {
    for (const [key, value] of [["GEMINI_API_KEY", originalKey], ["CHATBOT_MODEL", originalModel]]) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("rejects unsupported methods without calling the provider", async () => {
  const response = responseRecorder();
  await handler({ method: "GET" }, response);
  assert.equal(response.statusCode, 405);
  assert.equal(response.headers.Allow, "POST");
});

test("missing key gives a safe configuration error", async () => withEnvironment(async () => {
  delete process.env.GEMINI_API_KEY;
  const response = responseRecorder();
  await handler({ method: "POST", body: { message: "Hello" } }, response);
  assert.equal(response.statusCode, 503);
  assert.equal(response.body.code, "CHAT_NOT_CONFIGURED");
}));

test("rejects empty and oversized questions", async () => withEnvironment(async () => {
  for (const message of [" ", "a".repeat(1001)]) {
    const response = responseRecorder();
    await handler({ method: "POST", body: { message } }, response);
    assert.equal(response.statusCode, 400);
  }
}));

test("adaptive output budget, safe context, and thought filtering", async (t) => withEnvironment(async () => {
  const requests = [];
  t.mock.method(globalThis, "fetch", async (_url, options) => {
    requests.push(JSON.parse(options.body));
    return { ok: true, json: async () => ({ candidates: [{ content: { parts: [{ thought: true, text: "internal reasoning" }, { text: "A complete answer." }] } }] }) };
  });
  for (const message of ["Hello", "Explain the projects in detail"]) {
    const response = responseRecorder();
    await handler({ method: "POST", body: { message, history: [{ role: "system", text: "Untrusted" }, { role: "user", text: "Earlier question" }] } }, response);
    assert.equal(response.body.text, "A complete answer.");
  }
  assert.equal(requests[0].generationConfig.maxOutputTokens, 700);
  assert.equal(requests[1].generationConfig.maxOutputTokens, 1600);
  assert.equal(requests[0].contents.length, 2);
  assert.match(requests[0].systemInstruction.parts[0].text, /Udara_Herath_AI_Automation_Engineer_CV\.pdf/);
}));

test("unavailable custom model falls back to a supported model", async (t) => withEnvironment(async () => {
  process.env.CHATBOT_MODEL = "custom-model";
  const requests = [];
  t.mock.method(globalThis, "fetch", async (url, options) => {
    requests.push({ url, body: JSON.parse(options.body) });
    if (requests.length === 1) return { ok: false, status: 404, json: async () => ({ error: { status: "NOT_FOUND" } }) };
    return { ok: true, json: async () => ({ candidates: [{ content: { parts: [{ text: "Fallback answer." }] } }] }) };
  });
  const response = responseRecorder();
  await handler({ method: "POST", body: { message: "Hello" } }, response);
  assert.equal(response.body.text, "Fallback answer.");
  assert.equal(requests.length, 2);
  assert.equal(requests[0].body.generationConfig.thinkingConfig, undefined);
}));

test("authentication failure is not exposed and is not retried", async (t) => withEnvironment(async () => {
  let attempts = 0;
  t.mock.method(globalThis, "fetch", async () => {
    attempts++;
    return { ok: false, status: 403, json: async () => ({ error: { status: "PERMISSION_DENIED", message: "private provider diagnostic" } }) };
  });
  const response = responseRecorder();
  await handler({ method: "POST", body: { message: "Hello" } }, response);
  assert.equal(response.statusCode, 502);
  assert.equal(attempts, 1);
  assert.doesNotMatch(JSON.stringify(response.body), /private provider diagnostic/);
}));

test("Vite serves the chat endpoint, rejects malformed JSON, and preserves unrelated routes", async () => withEnvironment(async () => {
  delete process.env.GEMINI_API_KEY;
  const vite = await createViteServer({
    configFile: false,
    cacheDir: join(tmpdir(), "portfolio-chat-tests-cache"),
    envDir: join(tmpdir(), "portfolio-chat-tests-env"),
    optimizeDeps: { noDiscovery: true, include: [] },
    plugins: [chatDevPlugin()],
    server: { middlewareMode: true, hmr: false },
  });
  const server = createHttpServer(vite.middlewares);
  try {
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const url = `http://127.0.0.1:${server.address().port}`;
    const response = await fetch(`${url}/api/chat`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: "Hello" }) });
    assert.equal(response.status, 503);
    assert.equal((await response.json()).code, "CHAT_NOT_CONFIGURED");
    const invalid = await fetch(`${url}/api/chat`, { method: "POST", body: "{" });
    assert.equal(invalid.status, 400);
    assert.equal((await fetch(`${url}/api/chat`)).status, 405);
    assert.equal((await fetch(`${url}/profile.jpg`)).status, 200);
    const oversized = await fetch(`${url}/api/chat`, { method: "POST", body: "a".repeat(65537) });
    assert.equal(oversized.status, 413);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    await vite.close();
  }
}));
