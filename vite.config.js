import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import the path module

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"), // Alias for components
      "@pages": path.resolve(__dirname, "./src/pages"), // Alias for pages
      "@utils": path.resolve(__dirname, "./src/utils"), // Alias for utilities
      "@convex": path.resolve(__dirname, "./convex"), // Alias for Convex files
    },
  },
});
