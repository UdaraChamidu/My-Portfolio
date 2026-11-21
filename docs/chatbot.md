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

Clicking outside the chat panel or pressing Escape minimizes it without clearing the conversation. The glass panel uses a more transparent background, with an opaque fallback when reduced transparency is requested.
