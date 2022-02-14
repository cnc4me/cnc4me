/* eslint-disable no-useless-escape */
import { parser } from "../..";
import { generateMonarchLanguage } from "../chrysalis";

export const gcodeLanguage = generateMonarchLanguage(parser, [
  [/#\d/, "macro-var"],
  [/\(.+\)/, "comment"],
  [/[\=\+\-\*\/]/, "operators"],
  [/(\d+(?:\.\d+)?)/, "number"]
  // [/\[[a-zA-Z 0-9:]+\]/, "custom-date"]
]);
