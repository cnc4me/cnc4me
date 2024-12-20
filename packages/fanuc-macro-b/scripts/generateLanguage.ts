import {
  generateMonarchLanguageFromChevrotainTokens,
  MonarchTokens
} from "@cnc4me/monaco-gcode";

import { FANUC_MACRO_B_GRAMMAR } from "../src/core/FanucMacroB.grammar";
import { MacroParser } from "../src/core/MacroParser";

const parser = new MacroParser(); // @TODO use this

const lang = generateMonarchLanguageFromChevrotainTokens(
  FANUC_MACRO_B_GRAMMAR,
  MonarchTokens.brackets,
  MonarchTokens.rules
);

console.log(lang);
