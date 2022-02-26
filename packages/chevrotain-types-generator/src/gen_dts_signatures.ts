import { resolve } from "path";

import { parser } from "../src/MacroParser";
import generateTypes from "./generateTypes";

const outputFile = "index.d.ts";
const outputPath = resolve(__dirname, "..", "types", outputFile);

generateTypes.sync(parser, outputPath);
