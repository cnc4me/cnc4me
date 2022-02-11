import * as Api from "./api";
import { ChrysalisTools, LanguageDefinition, Monaco } from "./types";

export { createCustomLanguage } from "./api";

export function chrysalis(monaco: typeof Monaco): ChrysalisTools {
  const registerCustomLanguage = (
    languageId: string,
    languageDef: LanguageDefinition
  ) => {
    return Api.registerCustomLanguage(monaco, languageId, languageDef);
  };

  const registerCustomTheme = (
    themeName: string,
    themeData: Monaco.editor.IStandaloneThemeData
  ) => {
    return Api.registerCustomTheme(monaco, themeName, themeData);
  };

  return { registerCustomLanguage, registerCustomTheme };
}
