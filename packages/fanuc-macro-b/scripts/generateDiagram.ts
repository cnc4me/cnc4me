import { createSyntaxDiagramsCode } from "chevrotain";
import { writeFileSync } from "fs";
import { join } from "path";

import { parser } from "../src/lib/MacroParser";

const serializedGrammar = parser.getSerializedGastProductions();
const htmlText = createSyntaxDiagramsCode(serializedGrammar);
const out = join(__dirname, "..", "diagram", "index.html");

writeFileSync(out, htmlText);
