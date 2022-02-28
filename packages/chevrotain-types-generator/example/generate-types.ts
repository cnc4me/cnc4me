// import { join } from "path";

import { parser } from "./json-parser";

import { generateTypes } from "..";

const result = generateTypes({
  parser
  // outFile: join(__dirname, "out", "types.ts")
});

// eslint-disable-next-line no-console
console.log(result);
