/* eslint-disable no-useless-escape */
import { MonacoLangDef } from "../chrysalis";

export const gcodeLanguage: MonacoLangDef = {
  tokenizer: {
    root: [
      [/#\d/, "macro-var"],
      [/\(.+\)/, "comment"],
      [/[\=\+\-\*\/]/, "operators"],
      [/(\d+(?:\.\d+)?)/, "number"]
      // [/\[[a-zA-Z 0-9:]+\]/, "custom-date"]
    ]
  }
};
