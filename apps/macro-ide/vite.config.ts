// import { resolve } from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // resolve: {
  //   alias: {
  //     "@cnc4me/monaco-gcode": resolve(
  //       import.meta.dirname,
  //       "../../packages/monaco-gcode/index.ts",
  //     ),
  //   },
  // },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
