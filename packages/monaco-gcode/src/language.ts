/* eslint-disable no-useless-escape */
import { createMonarchLanguage } from "./utils";

export const gcodeLanguage = createMonarchLanguage(
  [
    ["(", ")", "delimiter.paren"],
    ["{", "}", "delimiter.curly"],
    ["[", "]", "delimiter.brace"]
  ],
  [
    [/#\d/, "macro-var"],
    [/\(.+\)/, "comment"],
    [/[\=\+\-\*\/]/, "operators"],
    [/(\d+(?:\.\d+)?)/, "number"]
    // [/\[[a-zA-Z 0-9:]+\]/, "custom-date"]
  ]
);
