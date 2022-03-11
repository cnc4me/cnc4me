import { generateTypes } from "@cnc4me/chevrotain-types-generator";

import { parser } from "../src/lib/MacroParser";

const types = generateTypes(parser);

console.log(types);
