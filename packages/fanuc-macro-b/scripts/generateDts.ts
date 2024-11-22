import { ChevrotainGenerator, MacroParser } from "../src";
import { joinCwd, writeFile } from "./_helpers";

const parser = new MacroParser();
const generator = new ChevrotainGenerator(parser);

const outfile = joinCwd("src", "types", "fanuc.d.ts");
const types = generator.getCstDts({ convertExportToDeclare: true });

writeFile(outfile, types);
