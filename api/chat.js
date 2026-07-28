const PORTFOLIO_CONTEXT = `
You are Udara Herath's portfolio assistant. Answer concisely and professionally.

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

const MODEL = process.env.CHATBOT_MODEL || "gemini-2.5-flash-lite";
const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_ITEMS = 8;

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  if (!process.env.GEMINI_API_KEY) {
    return response.status(503).json({ error: "Chat service is not configured." });
  }

  const message = typeof request.body?.message === "string"
    ? request.body.message.trim().slice(0, MAX_MESSAGE_LENGTH)
    : "";

  if (!message) {
    return response.status(400).json({ error: "Please enter a message." });
  }

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
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: PORTFOLIO_CONTEXT }],
          },
          contents: [
            ...history,
            { role: "user", parts: [{ text: message }] },
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 350,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const details = await geminiResponse.text();
      console.error("Gemini API error:", geminiResponse.status, details);
      return response.status(502).json({ error: "The AI service is temporarily unavailable." });
    }

    const data = await geminiResponse.json();
    const text = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!text) {
      return response.status(502).json({ error: "The AI service returned an empty response." });
    }

    return response.status(200).json({ text });
  } catch (error) {
    console.error("Chat endpoint failed:", error);
    return response.status(500).json({ error: "The chat service could not be reached." });
  }
}
