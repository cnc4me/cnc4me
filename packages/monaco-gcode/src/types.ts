import type { Themes } from "./themes";
import type { createBracketRules, createLanguageRules } from "./utils";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

export type { Monaco };

export type GcodeThemeName = keyof typeof Themes;
export type MonacoTokenizerRule = [match: RegExp, token: string];

/**
 * Aliased Types
 */
export type ThemeData = Monaco.editor.IStandaloneThemeData;
export type TokenThemeRule = Monaco.editor.ITokenThemeRule;
export type MonarchLanguage = Monaco.languages.IMonarchLanguage;
export type MonarchLanguageBracket = Monaco.languages.IMonarchLanguageBracket;

/**
 * Generic Types
 */
export type TokenizerRules<T> = [RegExp, T][];

export interface NamedTokenThemeRule<T extends string>
  extends Monaco.editor.ITokenThemeRule {
  token: T;
}

export type MonacoLanguageBracket<T extends string> = [
  open: string,
  close: string,
  token: T
];

/**
 * Type Utils
 */
export type ExtractBracketRuleTokens<
  T extends ReturnType<typeof createBracketRules>
> = T[number]["token"];

export type ExtractLanguageRuleTokens<
  T extends ReturnType<typeof createLanguageRules>
> = T[number][1];
