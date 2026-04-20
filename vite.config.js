import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // checker({
    //   eslint: {
    //     // 1. Tell it to use the new Flat Config (ESLint 9+)
    //     useFlatConfig: true,
    //     // 2. Point it to your source files
    //     lintCommand: 'eslint "./src/**/*.{js,jsx}"',
    //   },
    //   overlay: {
    //     initialIsOpen: false,
    //     position: "bl",
    //   },
    // }),
  ],
});
