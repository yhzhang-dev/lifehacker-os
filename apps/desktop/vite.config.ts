import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@lifehacker/core": path.resolve(__dirname, "../../packages/core/src"),
      "@lifehacker/storage": path.resolve(
        __dirname,
        "../../packages/storage/src",
      ),
      "@lifehacker/ai": path.resolve(__dirname, "../../packages/ai/src"),
      "@lifehacker/plugins": path.resolve(
        __dirname,
        "../../packages/plugins/src",
      ),
    },
  },

  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
});
