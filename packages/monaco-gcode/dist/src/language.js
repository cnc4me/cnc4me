/* eslint-disable no-useless-escape */
import { createBracketRules, createLanguageRules, createMonarchLanguage } from "./utils";
const brackets = createBracketRules([
    ["(", ")", "delimiter.paren"],
    ["{", "}", "delimiter.curly"],
    ["[", "]", "delimiter.brace"]
]);
const rules = createLanguageRules([
    [/M\d+(\.\d+)?/, "m-code"],
    [/G\d+(\.\d+)?/, "g-code"],
    [/Z/, "z-move"],
    [/[A-Z]-?\d+(\.\d+)?/, "address"],
    [/#\d+/, "macro-var"],
    [/\(.+\)|;.+/, "comment"],
    [/[\=\+\-\*\/]/, "operators"],
    [/(\d+(?:\.\d+)?)/, "number"],
    [/(WHILE|DO|IF|GOTO|END)/, "keyword"]
    // [/\[[a-zA-Z 0-9:]+\]/, "custom-date"]
]);
export const MonarchTokens = { brackets, rules };
export const gcodeLanguage = createMonarchLanguage(brackets, rules);
