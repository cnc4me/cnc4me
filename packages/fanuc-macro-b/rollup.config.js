/* eslint-disable @typescript-eslint/no-unsafe-call */
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import { swc } from "rollup-plugin-swc3";

/** @type import("types-package-json").PackageJson */
const pkg = require("./package.json");

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
      file: pkg.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true
    }
  ]
});
