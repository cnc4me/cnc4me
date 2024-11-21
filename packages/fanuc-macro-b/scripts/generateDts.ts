/**
 * I don't know why the reference is not working in vscode
 * "@cnc4me/chevrotain-types-generator";
 *
 * but is actually working at runtime...
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { generateTypes } from "@cnc4me/chevrotain-types-generator";
import { writeFileSync } from "fs";
import { join } from "path";

import { MacroParser } from "../src";

const parser = new MacroParser();
const types = generateTypes(parser);
const out = join(process.cwd(), "src", "types", "fanuc.d.ts");

writeFileSync(out, types);
console.log(`Wrote to file \x1b[33m${out.replace(process.cwd(), ".")}`);
