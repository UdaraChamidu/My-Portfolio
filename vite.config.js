import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { chatDevPlugin } from "./scripts/chat-dev-plugin.js";

// Keep the local chat endpoint aligned with the Vercel function.
export default defineConfig({
  plugins: [react(), tailwindcss(), chatDevPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});


