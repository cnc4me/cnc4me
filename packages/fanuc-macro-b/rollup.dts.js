/* eslint-disable @typescript-eslint/no-unsafe-call */
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import { externals } from "rollup-plugin-node-externals";
import ts from "rollup-plugin-typescript2";

const NAME = "fanuc-macro-b";

export default defineConfig({
  input: "src/index.ts",
  plugins: [
    ts({
      tsconfig: "./tsconfig.json",
      sourceMaps: true
    }),
    externals(),
    dts()
  ],
  output: {
    file: `dist/dts/${NAME}.d.ts`,
    format: "es"
  }
});
