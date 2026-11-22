/* global process */
import { createHmac } from "node:crypto";
import { isIP } from "node:net";

const localCounters = new Map();
const DAY = 86400000;
const MINUTE = 60000;
const RESERVE_REQUEST = `
for i = 1, #KEYS do
  local count = tonumber(redis.call('GET', KEYS[i]) or '0')
  if count >= tonumber(ARGV[i]) then
    return {0, i, math.max(1, redis.call('TTL', KEYS[i]))}
  end
end
for i = 1, #KEYS do
  local count = redis.call('INCR', KEYS[i])
  if count == 1 then redis.call('EXPIRE', KEYS[i], ARGV[#KEYS + i]) end
end
return {1, 0, 0}
`;

function boundedLimit(value, fallback) {
  const number = Number(value);
  return Number.isSafeInteger(number) && number > 0 && number <= 100000 ? number : fallback;
}

function visitorAddress(request, env) {
  // Trust forwarded headers only when the request is running behind Vercel.
  const forwarded = env.VERCEL === "1" ? request.headers?.["x-forwarded-for"] : null;
  const address = typeof forwarded === "string" ? forwarded.split(",")[0].trim() : request.socket?.remoteAddress;
  return isIP(address || "") ? address.toLowerCase().replace(/^::ffff:/, "") : "unknown-visitor";
}

export async function checkChatLimit(request, {
  env = process.env, now = Date.now(), fetchImpl = fetch, counters = localCounters,
} = {}) {
  const secret = env.CHAT_RATE_LIMIT_SECRET || env.OPENAI_API_KEY;
  if (!secret) throw new Error("CHAT_LIMIT_SECRET_MISSING");
  const visitor = createHmac("sha256", secret).update(visitorAddress(request, env)).digest("hex");
  const day = Math.floor(now / DAY);
  const minute = Math.floor(now / MINUTE);
  const keys = [
    `portfolio:{chat}:visitor:${visitor}:day:${day}`,
    `portfolio:{chat}:visitor:${visitor}:minute:${minute}`,
    `portfolio:{chat}:global:day:${day}`,
  ];
  const limits = [boundedLimit(env.CHAT_DAILY_LIMIT, 50), boundedLimit(env.CHAT_MINUTE_LIMIT, 5), boundedLimit(env.CHAT_GLOBAL_DAILY_LIMIT, 200)];
  const dayTtl = Math.max(1, Math.ceil(((day + 1) * DAY - now) / 1000));
  const minuteTtl = Math.max(1, Math.ceil(((minute + 1) * MINUTE - now) / 1000));
  const ttls = [dayTtl, minuteTtl, dayTtl];
  let result;
  const url = env.UPSTASH_REDIS_REST_URL?.trim();
  const token = env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (url && token) {
    if (new URL(url).protocol !== "https:") throw new Error("CHAT_LIMIT_STORE_INVALID");
    const response = await fetchImpl(url.replace(/\/$/, ""), {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["EVAL", RESERVE_REQUEST, keys.length, ...keys, ...limits, ...ttls]),
      signal: AbortSignal.timeout(3000),
    });
    const data = await response.json();
    if (!response.ok || data.error || !Array.isArray(data.result)) throw new Error("CHAT_LIMIT_STORE_UNAVAILABLE");
    result = data.result;
  } else {
    // Process memory is only appropriate for development, not serverless hosting.
    if (env.VERCEL === "1" || env.NODE_ENV === "production" || url || token) throw new Error("CHAT_LIMIT_STORE_MISSING");
    for (const [key, entry] of counters) if (entry.expiresAt <= now) counters.delete(key);
    const blocked = keys.findIndex((key, index) => (counters.get(key)?.count || 0) >= limits[index]);
    if (blocked !== -1) {
      result = [0, blocked + 1, Math.max(1, Math.ceil((counters.get(keys[blocked]).expiresAt - now) / 1000))];
    } else {
      keys.forEach((key, index) => {
        const entry = counters.get(key) || { count: 0, expiresAt: now + ttls[index] * 1000 };
        entry.count++;
        counters.set(key, entry);
      });
      result = [1, 0, 0];
    }
  }
  if (result.length !== 3 || ![0, 1].includes(result[0]) || !Number.isInteger(result[1]) || result[1] < 0 || result[1] > 3 || !Number.isFinite(result[2])) {
    throw new Error("CHAT_LIMIT_STORE_INVALID_RESPONSE");
  }
  return { allowed: result[0] === 1, scope: [null, "daily", "minute", "global"][result[1]], retryAfter: Math.max(1, Math.ceil(result[2])) };
}
