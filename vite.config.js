import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // This splits vendor libraries (like React/Lucide) into separate files
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increases warning threshold to 1MB
  },
});
