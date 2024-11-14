/// <reference types="vitest" />
import { defineConfig } from "vite";
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";

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
  // @ts-expect-error
  plugins: [optimizeLodashImports()]
});
