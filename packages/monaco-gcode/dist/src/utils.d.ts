import type { MonacoLanguageBracket, MonacoTokenizerRule, MonarchLanguage, MonarchLanguageBracket, NamedTokenThemeRule, ThemeData, TokenizerRules, TokenThemeRule } from "./types";
import type { BaseParser, TokenType } from "chevrotain";
export declare function createMonarchLanguage<T extends string>(brackets: MonarchLanguageBracket[], rules: TokenizerRules<T>): MonarchLanguage;
export declare function createTheme<T extends string>(theme: ThemeData & {
    rules: NamedTokenThemeRule<T>[];
}): import("monaco-editor").editor.IStandaloneThemeData & {
    rules: NamedTokenThemeRule<T>[];
};
export declare function createThemeRule<T extends string>(rule: TokenThemeRule): import("monaco-editor").editor.ITokenThemeRule & {
    token: T;
};
export declare function createThemeRules<T extends string>(rules: TokenThemeRule[]): (import("monaco-editor").editor.ITokenThemeRule & {
    token: T;
})[];
export declare function createLanguageRule<T extends string>(regex: RegExp, token: T): [RegExp, T];
export declare function createLanguageRules<T extends string>(rules: TokenizerRules<T>): [RegExp, T][];
export declare function createBracketRule<T extends string>(bracket: MonacoLanguageBracket<T>): {
    open: string;
    close: string;
    token: T;
};
export declare function createBracketRules<T extends string>(brackets: MonacoLanguageBracket<T>[]): {
    open: string;
    close: string;
    token: T;
}[];
/**
 * Given a Chevrotain parser, generate a Monarch language definition
 *
 * @TODO look into this, and actually generate it
 */
export declare function generateMonarchLanguageFromChevrotainTokens(tokens: TokenType[], brackets: MonarchLanguageBracket[], rules: MonacoTokenizerRule[]): MonarchLanguage;
/**
 * Given a Chevrotain parser, generate a Monarch language definition
 *
 * @TODO look into this, and actually generate it
 */
export declare function generateMonarchLanguageFromChevrotainParser<T extends BaseParser>(parser: T, brackets: MonarchLanguageBracket[], rules: MonacoTokenizerRule[]): MonarchLanguage;
