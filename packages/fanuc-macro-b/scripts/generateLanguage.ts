import { generateMonarchLanguageFromChevrotainTokens } from "@cnc4me/monaco-gcode";

import { FANUC_MACRO_B_GRAMMAR } from "../src";

const lang = generateMonarchLanguageFromChevrotainTokens(FANUC_MACRO_B_GRAMMAR);

console.log(lang);
