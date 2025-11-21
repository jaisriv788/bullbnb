import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  // base: "/reactdemo/",
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true, // automatically opens the browser
      gzipSize: true,
      brotliSize: true,
      filename: "bundle-analysis.html",
    }),
  ],
  define: {
    __AUTHOR__: JSON.stringify(
      "Jai Srivastava (https://github.com/jaisriv788)"
    ),
    __BUILD_PROOF__: JSON.stringify("BULLBNB_PROOF_2025_JAI_SRIVASTAVA"),
  },
  build: {
    rollupOptions: {
      output: {
        banner:
          "/*! BullBNB | Developer: Jai Srivastava | GitHub: github.com/jaisriv788 | Contact: jaisrivastava788@gmail.com */",
      },
    },
  },
});
