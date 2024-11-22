import { MacroParser } from "../src";
import { joinCwd, writeFile } from "./helpers";

const parser = new MacroParser();
const types = parser.generateCstDts({ convertExportToDeclare: true });
const out = joinCwd("src", "types", "fanuc.ts");

writeFile(out, types);
