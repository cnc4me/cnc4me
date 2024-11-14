import { createSyntaxDiagramsCode } from "chevrotain";
import { writeFileSync } from "fs";
import { join } from "path";

import { MacroParser } from "../src/lib/MacroParser";

const parser = new MacroParser();
const serializedGrammar = parser.getSerializedGastProductions();
const htmlText = createSyntaxDiagramsCode(serializedGrammar);
const out = join(process.cwd(), "diagram", "index.html");

writeFileSync(out, htmlText);
