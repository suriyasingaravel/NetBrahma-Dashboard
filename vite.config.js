import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Remove the tailwindcss import and plugin
export default defineConfig({
  plugins: [react()], // Only React plugin
});
