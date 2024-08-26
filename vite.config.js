import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "trivia-with-openai",
  css: {
    postcss: "./postcss.config.js",
  },
});
