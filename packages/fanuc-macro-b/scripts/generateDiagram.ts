/**
 * I don't know why the reference is not working in vscode
 * "@cnc4me/chevrotain-types-generator";
 *
 * but is actually working at runtime...
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { generateHtml } from "@cnc4me/chevrotain-types-generator";

import { MacroParser } from "../src";
import { joinCwd, writeFile } from "./helpers";

const htmlText = generateHtml(new MacroParser());
const out = joinCwd("diagrams", "FanucMacroB.html");

writeFile(out, htmlText);
