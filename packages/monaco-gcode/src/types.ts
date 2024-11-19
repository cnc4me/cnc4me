import type { Themes } from "./themes";
import type { createBracketRules, createLanguageRules } from "./utils";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

export { Monaco };

export type GcodeThemeName = keyof typeof Themes;

export type TokenizerRules<T> = [RegExp, T][];

export type MonarchLanguage = Monaco.languages.IMonarchLanguage;

export type MonarchLanguageBracket = Monaco.languages.IMonarchLanguageBracket;

export type TokenThemeRule = Monaco.editor.ITokenThemeRule;

export type ThemeData = Monaco.editor.IStandaloneThemeData;

export interface NamedTokenThemeRule<T extends string>
  extends Monaco.editor.ITokenThemeRule {
  token: T;
}

export type MonacoTokenizerRule = [match: RegExp, token: string];

export type MonacoLanguageBracket<T extends string> = [
  open: string,
  close: string,
  token: T
];

export type ExtractBracketRuleTokens<
  T extends ReturnType<typeof createBracketRules>
> = T[number]["token"];

export type ExtractLanguageRuleTokens<
  T extends ReturnType<typeof createLanguageRules>
> = T[number][1];
