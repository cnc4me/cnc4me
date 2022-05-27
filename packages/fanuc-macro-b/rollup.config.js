/* eslint-disable @typescript-eslint/no-unsafe-call */
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import { swc } from "rollup-plugin-swc3";

const NAME = "fanuc-macro-b";
const input = "src/index.ts";

const compiler = () =>
  swc({
    sourceMaps: true,
    tsconfig: "./tsconfig.lib.json"
  });

const plugins = [nodeResolve(), commonjs(), compiler()];

export default defineConfig({
  input,
  plugins,
  output: [
    {
      file: `dist/cjs/${NAME}.js`,
      format: "cjs",
      sourcemap: true
    },
    {
      file: `dist/esm/${NAME}.mjs`,
      format: "es",
      sourcemap: true
    }
  ]
});
