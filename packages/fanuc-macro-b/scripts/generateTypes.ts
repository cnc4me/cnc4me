import { MacroParser } from "../src/core/MacroParser";
import { ChevrotainGenerator } from "../src/lib/ChevrotainGenerator";
import { joinCwd, writeFile } from "./common";

const parser = new MacroParser();
const generator = new ChevrotainGenerator(parser);

const outfile = joinCwd("src", "types", "fanuc.d.ts");
const types = generator.getCstDts();

writeFile(outfile, types);
