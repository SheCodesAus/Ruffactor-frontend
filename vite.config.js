import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/heroku-api": {
        target: "https://ruffactor-backend-f36fc347ab07.herokuapp.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/heroku-api/, ""),
      },
    },
  },
});
