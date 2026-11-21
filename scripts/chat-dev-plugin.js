/* global process, Buffer */
import { loadEnv } from "vite";
import chatHandler from "../api/chat.js";

export function chatDevPlugin() {
  return {
    name: "portfolio-chat-api",
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.envDir, ["GEMINI_", "CHATBOT_"]);
      for (const key of ["GEMINI_API_KEY", "CHATBOT_MODEL"]) {
        if (env[key]) process.env[key] = env[key];
      }
      // Vite does not execute Vercel functions during local development.
      server.middlewares.use(async (request, response, next) => {
        if (request.url?.split("?")[0] !== "/api/chat") return next();
        response.status = (code) => { response.statusCode = code; return response; };
        response.json = (body) => {
          response.setHeader("Content-Type", "application/json; charset=utf-8");
          response.end(JSON.stringify(body));
        };
        try {
          let bytes = 0;
          const chunks = [];
          for await (const chunk of request) {
            bytes += Buffer.byteLength(chunk);
            if (bytes > 65536) return response.status(413).json({ error: "Message history is too large." });
            chunks.push(chunk);
          }
          request.body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString("utf8")) : {};
          await chatHandler(request, response);
        } catch (error) {
          const invalidJson = error instanceof SyntaxError;
          response.status(invalidJson ? 400 : 500).json({ error: invalidJson ? "Invalid JSON request." : "The chat service could not be reached." });
        }
      });
    },
  };
}
