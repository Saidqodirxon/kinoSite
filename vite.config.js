import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/news": {
        target: "http://185.215.166.140:8098",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/news/, "/news"),
      },
    },
  },
});
