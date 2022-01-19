import { generateCstDts } from "chevrotain";
import { writeFileSync } from "fs";
import { resolve } from "path";

import { getGAstProductions } from "../src/utils";

const outputFile = "fanuc.d.ts";
const productions = getGAstProductions();
const dtsString = generateCstDts(productions);
const outputPath = resolve(__dirname, "..", "types", outputFile);

console.log(`==> Generating "${outputFile}"`);
writeFileSync(outputPath, dtsString);
