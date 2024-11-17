/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        FanucMacroB: "./src/index.ts"
      },
      output: {
        entryFileNames: "[name].js"
      }
    }
  },
  test: {
    setupFiles: ["./tests/_vitest/setup.ts"]
  },
  plugins: []
});
