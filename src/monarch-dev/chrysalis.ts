import * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

export type MonacoThemeDef = Monaco.editor.IStandaloneThemeData;

export type MonacoLangDef =
  | Monaco.languages.IMonarchLanguage
  | Monaco.Thenable<Monaco.languages.IMonarchLanguage>;

/**
 * Given a monaco instance, this method will return two bound functions,
 * wrapping the monarch in its' chrysalis per-se, to enable further customization.
 */
export function chrysalis(monaco: typeof Monaco) {
  return {
    registerCustomLanguage(languageId: string, languageDef: MonacoLangDef) {
      return registerCustomLanguage(monaco, languageId, languageDef);
    },
    registerCustomTheme(themeName: string, themeData: MonacoThemeDef) {
      return registerCustomTheme(monaco, themeName, themeData);
    }
  };
}

/**
 * Register a custom theme with a Monaco Editor instance
 */
export function registerCustomTheme<T extends typeof Monaco>(
  monaco: T,
  themeName: string,
  themeData: MonacoThemeDef
): T {
  monaco.editor.defineTheme(themeName, themeData);
  return monaco;
}

/**
 * Register a custom language with a Monaco Editor instance
 */
export function registerCustomLanguage<T extends typeof Monaco>(
  monaco: T,
  languageId: string,
  languageDef: MonacoLangDef
): T {
  monaco.languages.register({ id: languageId });
  monaco.languages.setMonarchTokensProvider(languageId, languageDef);
  return monaco;
}
