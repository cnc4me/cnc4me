import { ChevrotainGenerator, MacroParser } from "../src";
import { joinCwd, writeFile } from "./common";

const parser = new MacroParser();
const generator = new ChevrotainGenerator(parser);

const outfile = joinCwd("src", "types", "fanuc.ts");
const types = generator.getCstDts();

writeFile(outfile, types);
