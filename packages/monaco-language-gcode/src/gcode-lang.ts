/* eslint-disable no-useless-escape */
import { createMonarchLanguage } from "@cnc4me/chrysalis";

export const gcodeLanguage = createMonarchLanguage(
  [["[", "]", "delimeter.bracket"]],
  [
    [/#\d/, "macro-var"],
    [/\(.+\)/, "comment"],
    [/[\=\+\-\*\/]/, "operators"],
    [/(\d+(?:\.\d+)?)/, "number"]
    // [/\[[a-zA-Z 0-9:]+\]/, "custom-date"]
  ]
);
