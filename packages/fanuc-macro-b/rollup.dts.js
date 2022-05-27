/* eslint-disable @typescript-eslint/no-unsafe-call */
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import sourcemaps from "rollup-plugin-sourcemaps";
import { swc } from "rollup-plugin-swc3";
import ts from "rollup-plugin-typescript2";
import path from "path";

const USE_SWC = false;

const NAME = "fanuc-macro-b";

const input = "src/index.ts";
const tsconfig = "./tsconfig.lib.json";

const compiler = () =>
  USE_SWC
    ? swc({
        tsconfig,
        sourceMaps: true
      })
    : ts({
        tsconfig,
        sourceMaps: true
      });

export default defineConfig({
  input,
  plugins: [
    nodeResolve({
      rootPath: path.join(__dirname, "src")
    }),
    commonjs(),
    sourcemaps(),
    compiler(),
    dts()
  ],
  output: {
    file: `dist/dts/${NAME}.d.ts`,
    format: "es"
  }
});
