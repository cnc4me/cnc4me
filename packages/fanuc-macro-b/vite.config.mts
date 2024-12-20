/// <reference types="vitest" />
import { readdirSync } from "node:fs";
import path from "node:path";

import define from "rollup-plugin-define";
import nodeExternals from "rollup-plugin-node-externals";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const testsDir = path.join(__dirname, "tests");
const scriptDir = path.join(__dirname, "scripts");

const EXCLUDE = {
  scripts: readdirSync(scriptDir).map(filename =>
    path.join(scriptDir, filename)
  ),
  tests: readdirSync(testsDir).map(filename => path.join(testsDir, filename))
};

export default defineConfig({
  root: ".",
  build: {
    outDir: "./dist",
    rollupOptions: {
      preserveEntrySignatures: "strict",
      input: "./src/index.ts",
      output: {
        format: "es",
        preserveModules: true,
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      },
      external: [...EXCLUDE.scripts, ...EXCLUDE.tests]
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
    nodeExternals(),
    define({
      replacements: {
        "process.env.NODE_ENV": `"production"`
      }
    }),
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.build.json",
      exclude: [
        "vite.config.mts", //
        "src/lib/xstate",
        ...Object.keys(EXCLUDE)
      ]
    })
  ]
});
