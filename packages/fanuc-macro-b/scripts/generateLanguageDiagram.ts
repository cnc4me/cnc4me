import { MacroParser } from "../src";
import { ChevrotainGenerator } from "../src/lib/ChevrotainGenerator";
import { joinCwd, writeFile } from "./common";

const parser = new MacroParser();
const generator = new ChevrotainGenerator(parser);

const outfile = joinCwd("diagrams", "FanucMacroB.html");
const htmlText = generator.getHtml();

writeFile(outfile, htmlText);
