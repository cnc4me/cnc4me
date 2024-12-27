import type { ExtractBracketRuleTokens, ExtractLanguageRuleTokens } from "./types";
declare const brackets: {
    open: string;
    close: string;
    token: "delimiter.paren" | "delimiter.curly" | "delimiter.brace";
}[];
declare const rules: [RegExp, "number" | "m-code" | "g-code" | "z-move" | "address" | "macro-var" | "comment" | "operators" | "keyword"][];
export declare const MonarchTokens: {
    brackets: {
        open: string;
        close: string;
        token: "delimiter.paren" | "delimiter.curly" | "delimiter.brace";
    }[];
    rules: [RegExp, "number" | "m-code" | "g-code" | "z-move" | "address" | "macro-var" | "comment" | "operators" | "keyword"][];
};
export declare const gcodeLanguage: import("monaco-editor").languages.IMonarchLanguage;
type GcodeBracketRuleTokens = ExtractBracketRuleTokens<typeof brackets>;
type GcodeLanguageRuleTokens = ExtractLanguageRuleTokens<typeof rules>;
export type GcodeRuleTokens = GcodeBracketRuleTokens | GcodeLanguageRuleTokens;
export {};
