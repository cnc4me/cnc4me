import { LanguageDefinition, Monaco, ThemeDefinition } from "./types";

/**
 * Register a custom theme with a Monaco Editor instance
 */
export function registerCustomTheme<T extends typeof Monaco>(
  monaco: T,
  themeName: string,
  themeData: ThemeDefinition
): T {
  monaco.editor.defineTheme(themeName, themeData);
  return monaco;
}

/**
 * Helper method to create a new language for the Monaco Editor
 */
export function createCustomLanguage(languageDef: LanguageDefinition) {
  /**
   * @TODO what to do here...
   */
  return languageDef;
}

/**
 * Register a custom language with a Monaco Editor instance
 */
export function registerCustomLanguage<T extends typeof Monaco>(
  monaco: T,
  languageId: string,
  languageDef: LanguageDefinition
): T {
  monaco.languages.register({ id: languageId });
  monaco.languages.setMonarchTokensProvider(languageId, languageDef);
  return monaco;
}
