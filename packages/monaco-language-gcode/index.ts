/* eslint-disable no-useless-escape */
import { MacroParser } from "../MacroParser";
import { generateMonarchLanguage } from "./monaco.utils";

export const gcodeLanguage = generateMonarchLanguage(
  new MacroParser(),
  [
    {
      open: "{",
      close: "}",
      token: "delimiter.curly",
    },
    {
      open: "[",
      close: "]",
      token: "delimiter.bracket",
    },
  ],
  [
    [/#\d/, "macro-var"],
    [/\(.+\)/, "comment"],
    [/[\=\+\-\*\/]/, "operators"],
    [/(\d+(?:\.\d+)?)/, "number"],
    // [/\[[a-zA-Z 0-9:]+\]/, "custom-date"]
  ]
);
