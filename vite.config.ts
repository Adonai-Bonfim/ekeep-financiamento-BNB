import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({ server: { entry: "server" } }),
    nitro({ preset: process.env['VERCEL'] ? "vercel" : "cloudflare-pages" }),
    react(),
  ],
  resolve: {
    tsconfigPaths: true,
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
  },
  server: { host: "0.0.0.0", port: 5173, strictPort: true },
});
