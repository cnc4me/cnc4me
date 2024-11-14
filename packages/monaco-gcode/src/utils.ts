import type { BaseParser } from "chevrotain";

import { gcodeDarkTheme } from "./gcode-dark";
import { gcodeLightTheme } from "./gcode-light";
import { gcodeLanguage } from "./language";
import type {
  Monaco,
  MonacoLangDef,
  MonacoThemeDef,
  MonarchLanguageBracket,
  MonarchTokenizerRule
} from "./types";

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

/**
 * Register the custom gcode language and themes
 */
export function registerMonacoResources(monaco: typeof Monaco) {
  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  registerCustomLanguage(monaco, "gcode", gcodeLanguage);
  registerCustomTheme(monaco, "gcode-dark", gcodeDarkTheme);
  registerCustomTheme(monaco, "gcode-light", gcodeLightTheme);
}

/**
 * Generate a Monarch language definition
 *
 * @todo look into this, and actually generate it
 */
export function createMonarchLanguage(
  brackets: MonarchLanguageBracket[],
  rules: MonarchTokenizerRule[]
): Monaco.languages.IMonarchLanguage {
  return {
    brackets: brackets.map(
      x =>
        ({
          open: x[0],
          close: x[1],
          token: x[2]
        } as Monaco.languages.IMonarchLanguageBracket)
    ),
    tokenizer: {
      root: rules
    }
  };
}

/**
 * Given a Chevrotain parser, generate a Monarch language definition
 *
 * @todo look into this, and actually generate it
 */
export function generateMonarchLanguageFromChevrotainParser<
  T extends BaseParser
>(
  parser: T,
  brackets: Monaco.languages.IMonarchLanguageBracket[],
  rules: MonarchTokenizerRule[]
): Monaco.languages.IMonarchLanguage {
  // console.log(parser);

  return {
    brackets,
    tokenizer: {
      root: rules
    }
  };
}
