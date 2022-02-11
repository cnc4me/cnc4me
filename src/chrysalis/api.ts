import { LanguageDefinition, Monaco, ThemeDefinition } from "./types";
import {
  defineTheme,
  registerLanguage,
  setMonarchTokensProvider
} from "./wrappers";

/**
 * Register a custom theme with a Monaco Editor instance
 */
export function registerCustomTheme<T extends typeof Monaco>(
  monaco: T,
  themeName: string,
  themeData: ThemeDefinition
): T {
  return defineTheme(monaco, themeName, themeData);
}

/**
 * Register a custom language with a Monaco Editor instance
 */
export function registerCustomLanguage<T extends typeof Monaco>(
  monaco: T,
  languageId: string,
  languageDef: LanguageDefinition
): T {
  registerLanguage(monaco, languageId);
  setMonarchTokensProvider(monaco, languageId, languageDef);
  return monaco;
}

/**
 * Helper method to create a new language for the Monaco Editor
 */
export function createCustomLanguage<T extends LanguageDefinition>(
  languageDef: T
): T {
  /**
   * @TODO what to do here...
   */
  return languageDef;
}
