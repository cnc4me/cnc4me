import { ChevrotainGenerator, MacroParser } from "../src";
import { joinCwd, writeFile } from "./common";

const parser = new MacroParser();
const generator = new ChevrotainGenerator(parser);

const outfile = joinCwd("diagrams", "FanucMacroB.html");
const htmlText = generator.getHtml();

writeFile(outfile, htmlText);
