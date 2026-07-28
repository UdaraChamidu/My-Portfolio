const PORTFOLIO_CONTEXT = `
You are Udara Herath's portfolio assistant. Answer concisely and professionally.
Always finish the answer. Use 2-5 complete sentences unless the visitor asks for
more detail. Never end halfway through a sentence or list.

Key facts:
- Udara Herath is a final-year BSc Computer Engineering undergraduate at the University of Jaffna.
- He works as an AI Automation Engineer at Atlantic Bridge Exchange Limited, United Kingdom, from June 2026.
- He also works with Technology Center Lanka.
- He runs Veloxdy.com, providing web application development, AI solutions, automation, and digital products.
- He freelances on Upwork in AI, automation, SaaS, and web application development.
- He completed an AI/ML and Software Engineer internship at Idea8 Pvt Ltd from November 2025 to May 2026.
- His focus areas include Generative AI, RAG, AI agents, voice agents, n8n, LangGraph, FastAPI, React, NestJS, Supabase, Pinecone, TensorFlow, and SaaS.
- His CV is available at /Herath_CV_AI.pdf.

When a visitor wants to hire or contact Udara, direct them to the portfolio contact section. Do not invent personal, employment, or project details.
`;

const DEFAULT_MODELS = ["gemini-2.5-flash-lite", "gemini-2.5-flash"];
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_ITEMS = 8;
const DETAILED_REQUEST_PATTERN =
  /\b(detail(?:ed|s)?|explain|elaborate|tell me more|in depth|step[- ]by[- ]step|compare|complete list|all projects)\b/i;

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const apiKey = process.env.GEMINI_API_KEY
    ?.trim()
    .replace(/^["']|["']$/g, "");

  if (!apiKey) {
    return response.status(503).json({ error: "Chat service is not configured." });
  }

  const message = typeof request.body?.message === "string"
    ? request.body.message.trim().slice(0, MAX_MESSAGE_LENGTH)
    : "";

  if (!message) {
    return response.status(400).json({ error: "Please enter a message." });
  }

  const maxOutputTokens = DETAILED_REQUEST_PATTERN.test(message) ? 1600 : 700;

  const history = Array.isArray(request.body?.history)
    ? request.body.history
        .slice(-MAX_HISTORY_ITEMS)
        .filter((item) => item?.role === "user" || item?.role === "model")
        .map((item) => ({
          role: item.role,
          parts: [{ text: String(item.text || "").slice(0, MAX_MESSAGE_LENGTH) }],
        }))
    : [];

  try {
    const requestedModel = process.env.CHATBOT_MODEL?.trim();
    const models = [...new Set([requestedModel, ...DEFAULT_MODELS].filter(Boolean))];
    let lastFailure = null;

    for (const model of models) {
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: PORTFOLIO_CONTEXT }],
            },
            contents: [
              ...history,
              { role: "user", parts: [{ text: message }] },
            ],
            generationConfig: {
              maxOutputTokens,
              thinkingConfig: {
                thinkingBudget: 0,
              },
            },
          }),
        }
      );

      const data = await geminiResponse.json().catch(() => ({}));

      if (geminiResponse.ok) {
        const text = data?.candidates?.[0]?.content?.parts
          ?.map((part) => part.text || "")
          .join("")
          .trim();

        if (text) {
          return response.status(200).json({ text });
        }

        lastFailure = {
          status: 502,
          code: data?.promptFeedback?.blockReason || "EMPTY_RESPONSE",
        };
        continue;
      }

      lastFailure = {
        status: geminiResponse.status,
        code: data?.error?.status || "GEMINI_REQUEST_FAILED",
        message: data?.error?.message || "",
      };
      console.error("Gemini API error:", model, lastFailure);

      if (geminiResponse.status === 401 || geminiResponse.status === 403) {
        break;
      }
    }

    const configurationError =
      lastFailure?.status === 401 ||
      lastFailure?.status === 403 ||
      lastFailure?.code === "PERMISSION_DENIED";

    return response.status(502).json({
      error: configurationError
        ? "Chat authentication failed. The Gemini key must allow server-side Generative Language API requests."
        : "The AI service is temporarily unavailable. Please try again shortly.",
      code: lastFailure?.code || "GEMINI_REQUEST_FAILED",
    });
  } catch (error) {
    console.error("Chat endpoint failed:", error);
    return response.status(500).json({ error: "The chat service could not be reached." });
  }
}
