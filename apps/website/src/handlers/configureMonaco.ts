import { chrysalis } from "@cnc4me/chrysalis";
import { gcodeLanguage } from "@cnc4me/monaco-language-gcode";
import { gcodeDarkTheme, gcodeLightTheme } from "@cnc4me/monaco-theme-gcode";
import type * as Monaco from "monaco-editor";

export function configureMonaco<T extends typeof Monaco>(monaco: T): T {
  const { registerCustomLanguage, registerCustomTheme } = chrysalis(monaco);

  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

  registerCustomLanguage("gcode", gcodeLanguage);
  registerCustomTheme("gcode-dark", gcodeDarkTheme);
  registerCustomTheme("gcode-light", gcodeLightTheme);

  return monaco;
}
