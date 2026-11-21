# Portfolio Chatbot

## Local development

1. Add `GEMINI_API_KEY=your_actual_key` to the ignored `.env.local` file. Never use a `VITE_` prefix for this secret.
2. Optionally set `CHATBOT_MODEL` to a model available to your Gemini account. The existing Gemini 2.5 Flash-Lite and Flash fallbacks remain configured.
3. Restart `npm run dev` after changing environment variables.

The Vite chat plugin runs the same `api/chat.js` handler used by Vercel. Keys are loaded only on the server. A missing key returns JSON with `CHAT_NOT_CONFIGURED`, not an HTML 404 page.

## Vercel

Set `GEMINI_API_KEY` in the project's environment variables for the intended deployment environment, then redeploy. A key configured in Vercel is not automatically available on your local computer. API permission, quota, and model availability must also be valid for that key.

## Checks

- `node --test tests/chat.test.js` runs mocked provider tests and a local Vite endpoint integration test without calling Gemini.
- `npm run build` checks the frontend build.
- Actual AI replies require a valid key; passing these checks alone does not verify a live provider response.

The assistant guides visitors to the contact form; it does not send messages to Udara or book appointments.
