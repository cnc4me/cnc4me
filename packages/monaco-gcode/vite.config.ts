/// <reference types="vitest" />
import { readdirSync } from "node:fs";
import path from "node:path";

import { defineConfig } from "vite";

const testsDir = path.join(__dirname, "tests");

const EXCLUDE = {
  tests: readdirSync(testsDir).map(filename => path.join(testsDir, filename))
};

export default defineConfig({
  root: ".",
  esbuild: {
    minifyIdentifiers: false,
    keepNames: true,
    drop: ["debugger"],
    pure: ["console.log"]
  },
  build: {
    outDir: "./dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"]
    }
  }
});
