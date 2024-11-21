/// <reference types="vitest" />
import define from "rollup-plugin-define";
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
    setupFiles: ["./tests/_vitest/setup.ts"],
    coverage: {
      provider: "v8"
    },
    poolOptions: {
      forks: {
        singleFork: true
      }
    }
  },
  plugins: [
    define({
      replacements: {
        "process.env.NODE_ENV": `"production"`
      }
    })
  ]
});
