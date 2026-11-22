import test from "node:test";
import assert from "node:assert/strict";
import { checkChatLimit } from "../scripts/chat-rate-limit.js";

const request = (ip = "192.0.2.1") => ({ socket: { remoteAddress: ip } });
const env = { OPENAI_API_KEY: "test-secret", NODE_ENV: "test" };
const start = Date.UTC(2026, 10, 21, 12);

test("allows exactly 50 per visitor per UTC day, then resets", async () => {
  const counters = new Map();
  for (let index = 0; index < 50; index++) {
    assert.equal((await checkChatLimit(request(), { env, counters, now: start + index * 60000 })).allowed, true);
  }
  const blocked = await checkChatLimit(request(), { env, counters, now: start + 50 * 60000 });
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.scope, "daily");
  assert.equal((await checkChatLimit(request("192.0.2.2"), { env, counters, now: start + 50 * 60000 })).allowed, true);
  assert.equal((await checkChatLimit(request(), { env, counters, now: start + 86400000 })).allowed, true);
});

test("burst limit resets after the minute and untrusted headers cannot bypass it", async () => {
  const counters = new Map();
  for (let index = 0; index < 5; index++) await checkChatLimit(request(), { env, counters, now: start });
  const blocked = await checkChatLimit({ ...request(), headers: { "x-forwarded-for": "192.0.2.99" } }, { env, counters, now: start });
  assert.equal(blocked.scope, "minute");
  assert.equal(blocked.retryAfter, 60);
  assert.equal((await checkChatLimit(request(), { env, counters, now: start + 60000 })).allowed, true);
});

test("site-wide daily cap protects against many different IPs", async () => {
  const counters = new Map();
  const settings = { ...env, CHAT_GLOBAL_DAILY_LIMIT: "2" };
  await checkChatLimit(request("192.0.2.1"), { env: settings, counters, now: start });
  await checkChatLimit(request("192.0.2.2"), { env: settings, counters, now: start });
  const blocked = await checkChatLimit(request("192.0.2.3"), { env: settings, counters, now: start });
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.scope, "global");
});

test("production uses atomic shared-store command without storing raw IPs", async () => {
  let command;
  const settings = { ...env, VERCEL: "1", UPSTASH_REDIS_REST_URL: "https://redis.example.test", UPSTASH_REDIS_REST_TOKEN: "test-token" };
  const fetchImpl = async (url, options) => {
    assert.equal(url, settings.UPSTASH_REDIS_REST_URL);
    command = JSON.parse(options.body);
    assert.equal(options.headers.Authorization, "Bearer test-token");
    return { ok: true, json: async () => ({ result: [1, 0, 0] }) };
  };
  assert.equal((await checkChatLimit({ headers: { "x-forwarded-for": "192.0.2.3" } }, { env: settings, now: start, fetchImpl })).allowed, true);
  assert.equal(command[0], "EVAL");
  assert.equal(command[2], 3);
  assert.deepEqual(command.slice(6, 9), [50, 5, 200]);
  assert.doesNotMatch(JSON.stringify(command), /192\.0\.2\.3/);
  assert.ok(command.slice(3, 6).every((key) => key.includes("{chat}")));
});

test("missing credentials, store failure, or malformed results fail closed in production", async () => {
  await assert.rejects(checkChatLimit(request(), { env: { ...env, VERCEL: "1" }, now: start }));
  for (const data of [{ error: "unavailable" }, { result: [99] }]) {
    await assert.rejects(checkChatLimit(request(), {
      env: { ...env, VERCEL: "1", UPSTASH_REDIS_REST_URL: "https://redis.example.test", UPSTASH_REDIS_REST_TOKEN: "test-token" },
      now: start, fetchImpl: async () => ({ ok: true, json: async () => data }),
    }));
  }
});
