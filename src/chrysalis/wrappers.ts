import { LanguageDefinition, Monaco } from "./types";

/**
 * Register a new language with the editor
 */
export function registerLanguage<T extends typeof Monaco>(
  monaco: T,
  id: string
): T {
  monaco.languages.register({ id });
  return monaco;
}

/**
 * Register a token provider to a language
 */
export function setMonarchTokensProvider<T extends typeof Monaco>(
  monaco: T,
  languageId: string,
  languageDef: LanguageDefinition
): T {
  monaco.languages.setMonarchTokensProvider(languageId, languageDef);
  return monaco;
}

/**
 * Define a new theme for the editors
 */
export function defineTheme<T extends typeof Monaco>(
  monaco: T,
  themeName: string,
  themeData: Monaco.editor.IStandaloneThemeData
): T {
  monaco.editor.defineTheme(themeName, themeData);
  return monaco;
}
