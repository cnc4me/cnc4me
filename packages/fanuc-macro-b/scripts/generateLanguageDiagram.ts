import { ChevrotainGenerator, MacroParser } from "../src";
import { joinCwd, writeFile } from "./_helpers";

const parser = new MacroParser();
const generator = new ChevrotainGenerator(parser);

const outfile = joinCwd("diagrams", "FanucMacroB.html");
const htmlText = generator.getHtml();

writeFile(outfile, htmlText);
