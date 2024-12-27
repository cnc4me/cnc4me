import { gcodeLanguage } from "./language";
import { Themes } from "./themes";

import type { MonarchLanguage, ThemeData } from "./types";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

export class MonacoGcode {
  constructor(public monaco: typeof Monaco) {}

  registerTheme(name: string, theme: ThemeData) {
    this.monaco.editor.defineTheme(name, theme);
    return this;
  }

  registerLanguage(languageId: string, languageDef: MonarchLanguage) {
    this.monaco.languages.register({ id: languageId });
    this.monaco.languages.setMonarchTokensProvider(languageId, languageDef);
    return this;
  }

  /**
   * Register the custom gcode language and themes
   */
  static register(monaco: typeof Monaco) {
    const instance = new MonacoGcode(monaco);
    // monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    instance.registerLanguage("gcode", gcodeLanguage);
    Object.entries(Themes).forEach(([name, theme]) => {
      instance.registerTheme(name, theme);
    });
  }
}
