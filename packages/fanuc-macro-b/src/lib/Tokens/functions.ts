import { createToken } from "chevrotain";

import { Keyword } from "./common";

export const FANUC_MACRO_B_FNS = [
  "ABS",
  "ACOS",
  "ASIN",
  "ATAN",
  "BCD",
  "BIN",
  "COS",
  "EXP",
  "FIX",
  "FUP",
  "LN",
  "ROUND",
  "SIN",
  "SQRT",
  "TAN"
] as const;

export const BuiltinFunction = createToken({
  name: "BuiltinFunction",
  pattern: new RegExp(FANUC_MACRO_B_FNS.join("|")),
  categories: Keyword
});

export type FanucMacroFunctionName = (typeof FANUC_MACRO_B_FNS)[number];
