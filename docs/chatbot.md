# Portfolio Chatbot

## Local development

1. Add `OPENAI_API_KEY=your_actual_key` to the ignored `.env.local` file. Never use a `VITE_` prefix for this secret.
2. Optionally set `OPENAI_CHAT_MODEL` to an OpenAI Responses-compatible text model available to your account. The default is `gpt-4.1-mini`; there is no Gemini fallback. Model-specific reasoning options are not configured.
3. Restart `npm run dev` after changing environment variables.

The Vite chat plugin runs the same `api/chat.js` handler used by Vercel. Keys are loaded only on the server. A missing key returns JSON with `CHAT_NOT_CONFIGURED`, not an HTML 404 page.

## Vercel

Set `OPENAI_API_KEY` (and optionally `OPENAI_CHAT_MODEL`) in the project's environment variables for the intended deployment environment, then redeploy. A key configured in Vercel is not automatically available on your local computer. API permission, credits, and model availability must also be valid for that key. ChatGPT subscriptions do not configure this application.

The server calls `https://api.openai.com/v1/responses` with `store: false`, a bounded conversation history, and a 700-token output limit (1,600 for detailed questions). It only displays completed text responses, not reasoning or unfinished output. OpenAI API usage can incur charges; monitor usage in your OpenAI project.

## Checks

- `node --test tests/chat.test.js` runs mocked provider tests and a local Vite endpoint integration test without calling OpenAI.
- `npm run build` checks the frontend build.
- Actual AI replies require a valid key; passing these checks alone does not verify a live provider response.

The assistant guides visitors to the contact form; it does not send messages to Udara or book appointments.

## Request and cost protection

Defaults: 50 requests per visitor IP per UTC day, 5 requests per IP per UTC minute, and 200 total requests per UTC day across the whole site. Daily counters reset at 00:00 UTC (05:30 in Sri Lanka). These are fixed windows, not rolling windows. Only valid questions with a configured AI key reserve a request. Provider errors and timeouts still consume the reservation; rejected over-limit requests do not call OpenAI.

The limits are configurable with `CHAT_DAILY_LIMIT`, `CHAT_MINUTE_LIMIT`, and `CHAT_GLOBAL_DAILY_LIMIT`. Invalid values revert to safe defaults. The existing message length, bounded history, output-token caps, and request timeouts remain active. A 429 response includes `Retry-After` and a contact alternative.

This is IP-based protection, not verified person identification: shared Wi-Fi can share an allowance, and VPNs or changing IPs can bypass a visitor quota. The shared site-wide cap remains a backstop. There is no login or signup requirement. IP identities are HMAC-hashed before counter storage, with expiring keys. Optionally set a private `CHAT_RATE_LIMIT_SECRET`; otherwise the OpenAI key is used as the hashing secret. Rotating that secret resets visitor identities, not the global counter.

### Required before deploying this change

1. Choose or create an Upstash-compatible Redis REST database after reviewing its account terms and any costs. No account, database, or paid resource was provisioned by this implementation.
2. Add `UPSTASH_REDIS_REST_URL` (HTTPS URL) and `UPSTASH_REDIS_REST_TOKEN` (write-capable token) to the Vercel project's private environment variables for Production and any Preview environments that need chat.
3. Add the optional limit settings and hashing secret if different from the defaults. Keep all credentials server-side; never prefix them with `VITE_`.
4. Redeploy and verify allowed requests, 429 handling, daily reset, and correct client-IP identification on the actual deployment. For a threshold test use a separate preview database, not production counters.

The shared Redis check/reservation is atomic, including the global cap, so concurrent serverless instances use the same counters. A missing or unreachable store in production returns 503 and makes no OpenAI call. Production never silently falls back to process memory. Configure the store BEFORE deploying or the chatbot will be unavailable by design. Local development alone uses process-memory counters if Redis is not configured; these reset when the dev server restarts and are not production protection.

Request caps are not an exact dollar budget. Cost depends on the configured model, input/history size, output length, and usage elsewhere on the same API project. The default global cap bounds this endpoint to 200 provider attempts and up to 320,000 configured output tokens per UTC day, plus input tokens. Review OpenAI usage and any available provider-side spending controls separately; do not rely on a notification threshold as a guaranteed hard cutoff.

Run all protection and contact tests with `node --test tests/chat.test.js tests/chat-rate-limit.test.js tests/contactDelivery.test.js`. They use local counters and mocked Redis/OpenAI/email responses, not live services. Shared Redis deployment behavior and real inbox delivery still require separate verification.

Implementation references: [Upstash REST API](https://upstash.com/docs/redis/features/restapi), [Vercel request headers](https://vercel.com/docs/headers/request-headers).

Clicking outside the chat panel or pressing Escape minimizes it without clearing the conversation. The glass panel uses a more transparent background, with an opaque fallback when reduced transparency is requested.
