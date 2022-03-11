import { generateTypes } from "@cnc4me/chevrotain-types-generator";
import { writeFileSync } from "fs";
import { join } from "path";

import { parser } from "../src/lib/MacroParser";

const out = join(__dirname, "..", "src", "types", "fanuc.d.ts");
const types = generateTypes(parser);

writeFileSync(out, types);
