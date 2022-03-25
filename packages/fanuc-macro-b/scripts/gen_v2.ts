import { writeFileSync } from "fs";
import { join } from "path";

import { generateCstDts } from "../../../../../chevrotain/packages/cst-dts-gen/src/api";
import { parser } from "../src/lib/MacroParser";

const out = join(__dirname, "..", "src", "types", "fanuc_v2.d.ts");
const types = generateCstDts(parser.getGAstProductions());

writeFileSync(out, types);
