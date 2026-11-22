/* global process */
import test from "node:test";
import assert from "node:assert/strict";
import { createServer as createHttpServer } from "node:http";
import { createServer as createViteServer } from "vite";
import { tmpdir } from "node:os";
import { join } from "node:path";
import handler from "../api/chat.js";
import { chatDevPlugin } from "../scripts/chat-dev-plugin.js";
let testIdentity = 0;

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
  const keys = ["OPENAI_API_KEY", "OPENAI_CHAT_MODEL", "CHAT_RATE_LIMIT_SECRET", "CHAT_DAILY_LIMIT", "CHAT_MINUTE_LIMIT", "CHAT_GLOBAL_DAILY_LIMIT", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "NODE_ENV", "VERCEL"];
  const original = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  keys.forEach((key) => delete process.env[key]);
  process.env.OPENAI_API_KEY = "test-only-not-a-real-key";
  process.env.NODE_ENV = "test";
  process.env.CHAT_RATE_LIMIT_SECRET = `isolated-test-${++testIdentity}`;
  try { await callback(); } finally {
    for (const [key, value] of Object.entries(original)) {
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
  delete process.env.OPENAI_API_KEY;
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

test("Responses API uses server-only authentication, adaptive budgets, safe context, and text-only output", async (t) => withEnvironment(async () => {
  const requests = [];
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "https://api.openai.com/v1/responses");
    assert.equal(options.headers.Authorization, "Bearer test-only-not-a-real-key");
    requests.push(JSON.parse(options.body));
    return { ok: true, json: async () => ({ status: "completed", output: [
      { type: "reasoning", content: [{ type: "output_text", text: "internal reasoning" }] },
      { type: "message", role: "assistant", content: [{ type: "output_text", text: "A complete answer." }] },
    ] }) };
  });
  for (const message of ["Hello", "Explain the projects in detail"]) {
    const response = responseRecorder();
    await handler({ method: "POST", body: { message, history: [{ role: "system", text: "Untrusted" }, { role: "user", text: "Earlier question" }, { role: "model", text: "Earlier answer" }] } }, response);
    assert.equal(response.body.text, "A complete answer.");
  }
  assert.equal(requests[0].max_output_tokens, 700);
  assert.equal(requests[1].max_output_tokens, 1600);
  assert.equal(requests[0].model, "gpt-4.1-mini");
  assert.equal(requests[0].store, false);
  assert.equal(requests[0].input.length, 3);
  assert.equal(requests[0].input[1].role, "assistant");
  assert.match(requests[0].instructions, /Udara_Herath_AI_Automation_Engineer_CV\.pdf/);
}));

test("honors the OpenAI-specific model setting without silently switching models", async (t) => withEnvironment(async () => {
  process.env.OPENAI_CHAT_MODEL = "custom-model";
  const requests = [];
  t.mock.method(globalThis, "fetch", async (url, options) => {
    requests.push({ url, body: JSON.parse(options.body) });
    return { ok: false, status: 404, json: async () => ({ error: { code: "model_not_found" } }) };
  });
  const response = responseRecorder();
  await handler({ method: "POST", body: { message: "Hello" } }, response);
  assert.equal(response.statusCode, 502);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].body.model, "custom-model");
}));

test("authentication failure is not exposed and is not retried", async (t) => withEnvironment(async () => {
  let attempts = 0;
  t.mock.method(globalThis, "fetch", async () => {
    attempts++;
    return { ok: false, status: 403, json: async () => ({ error: { code: "permission_denied", message: "private provider diagnostic" } }) };
  });
  const response = responseRecorder();
  await handler({ method: "POST", body: { message: "Hello" } }, response);
  assert.equal(response.statusCode, 502);
  assert.equal(attempts, 1);
  assert.doesNotMatch(JSON.stringify(response.body), /private provider diagnostic/);
}));

test("incomplete and empty responses are not presented as finished answers", async (t) => withEnvironment(async () => {
  for (const data of [
    { status: "incomplete", output: [{ type: "message", role: "assistant", content: [{ type: "output_text", text: "An unfinished" }] }] },
    { status: "completed", output: [] },
  ]) {
    const mocked = t.mock.method(globalThis, "fetch", async () => ({ ok: true, json: async () => data }));
    const response = responseRecorder();
    await handler({ method: "POST", body: { message: "Hello" } }, response);
    assert.equal(response.statusCode, 502);
    assert.equal(response.body.text, undefined);
    mocked.mock.restore();
  }
}));

test("provider quota errors give actionable, sanitized feedback", async (t) => withEnvironment(async () => {
  t.mock.method(globalThis, "fetch", async () => ({ ok: false, status: 429, json: async () => ({ error: { code: "insufficient_quota", message: "private account information" } }) }));
  const response = responseRecorder();
  await handler({ method: "POST", body: { message: "Hello" } }, response);
  assert.match(response.body.error, /usage limit/);
  assert.doesNotMatch(JSON.stringify(response.body), /private account/);
}));

test("local burst limit stops requests before calling OpenAI", async (t) => withEnvironment(async () => {
  process.env.CHAT_MINUTE_LIMIT = "1";
  let attempts = 0;
  t.mock.method(globalThis, "fetch", async () => {
    attempts++;
    return { ok: true, json: async () => ({ status: "completed", output: [{ type: "message", role: "assistant", content: [{ type: "output_text", text: "Hello." }] }] }) };
  });
  const request = { method: "POST", body: { message: "Hello" } };
  await handler(request, responseRecorder());
  const response = responseRecorder();
  await handler(request, response);
  assert.equal(response.statusCode, 429);
  assert.equal(response.body.code, "CHAT_RATE_LIMITED");
  assert.ok(Number(response.headers["Retry-After"]) > 0);
  assert.equal(attempts, 1);
}));

test("production without a shared limiter blocks OpenAI calls", async (t) => withEnvironment(async () => {
  process.env.NODE_ENV = "production";
  const provider = t.mock.method(globalThis, "fetch", async () => { throw new Error("Must not call OpenAI"); });
  const response = responseRecorder();
  await handler({ method: "POST", body: { message: "Hello" } }, response);
  assert.equal(response.statusCode, 503);
  assert.equal(response.body.code, "CHAT_LIMIT_UNAVAILABLE");
  assert.equal(provider.mock.callCount(), 0);
}));

test("Vite serves the chat endpoint, rejects malformed JSON, and preserves unrelated routes", async () => withEnvironment(async () => {
  delete process.env.OPENAI_API_KEY;
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
