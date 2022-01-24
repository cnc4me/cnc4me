import { generateCstDts } from "chevrotain";
import { writeFileSync } from "fs";
import { resolve } from "path";

import { parser } from "../src/MacroParser";

const outputFile = "fanuc.ts";
const outputPath = resolve(__dirname, "..", "types", outputFile);
const productions = parser.getGAstProductions();
const dtsString = generateCstDts(productions);

writeFileSync(outputPath, dtsString);
