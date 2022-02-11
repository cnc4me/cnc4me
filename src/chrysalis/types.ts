import * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

export type { Monaco };

export type ThemeDefinition = Monaco.editor.IStandaloneThemeData;

export type LanguageDefinition =
  | Monaco.languages.IMonarchLanguage
  | Monaco.Thenable<Monaco.languages.IMonarchLanguage>;

export type TokenThemeRule = Monaco.editor.ITokenThemeRule;

export type ChrysalisDefineLanguageFn = (
  languageId: string,
  languageDef: LanguageDefinition
) => typeof Monaco;

export type ChrysalisDefineThemeFn = (
  themeName: string,
  themeData: Monaco.editor.IStandaloneThemeData
) => typeof Monaco;

export interface ChrysalisTools {
  registerCustomTheme: ChrysalisDefineThemeFn;
  registerCustomLanguage: ChrysalisDefineLanguageFn;
}
