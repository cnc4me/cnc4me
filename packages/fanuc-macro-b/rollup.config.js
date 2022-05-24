// import dts from "rollup-plugin-dts";
import swc from "rollup-plugin-swc";

const name = require("./package.json").main.replace(/\.js$/, "");

const bundle = config => ({
  ...config,
  input: "src/index.ts",
  external: id => !/^[./]/.test(id)
});

export default [
  bundle({
    plugins: [
      swc({
        jsc: {
          parser: {
            syntax: "typescript"
          },
          target: "es2018"
        }
      })
    ],
    output: [
      {
        file: `${name}.js`,
        format: "cjs",
        sourcemap: true
      },
      {
        file: `${name}.mjs`,
        format: "es",
        sourcemap: true
      }
    ]
  })
  // bundle({
  //   plugins: [dts()],
  //   output: {
  //     file: `${name}.d.ts`,
  //     format: "es"
  //   }
  // })
];
