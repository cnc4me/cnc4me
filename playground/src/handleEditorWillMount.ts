import type * as Monaco from "monaco-editor";

import { chrysalis, createCustomLanguage } from "../../src/chrysalis";

const gcodeLangDef = createCustomLanguage({
  tokenizer: {
    root: [
      [/\[error.*/, "custom-error"],
      [/\[notice.*/, "custom-notice"],
      [/\[info.*/, "custom-info"],
      [/\[[a-zA-Z 0-9:]+\]/, "custom-date"]
    ]
  }
});

/**
 * Handler for Monaco to modify the editor before creating an instance.
 *
 * Do customization stuff here before the editor is mounted.
 */
export function handleEditorWillMount(monaco: typeof Monaco) {
  const { registerCustomLanguage, registerCustomTheme } = chrysalis(monaco);

  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

  registerCustomLanguage("gcode", gcodeLangDef);

  registerCustomTheme("gcode-light", {
    base: "vs",
    inherit: false,
    rules: [
      { token: "custom-info", foreground: "808080" },
      { token: "custom-error", foreground: "ff0000", fontStyle: "bold" },
      { token: "custom-notice", foreground: "FFA500" },
      { token: "custom-date", foreground: "008800" }
    ],
    colors: {
      "editor.foreground": "#000000"
    }
  });

  registerCustomTheme("gcode-dark", {
    base: "vs-dark",
    inherit: false,
    rules: [
      { token: "custom-info", foreground: "808080" },
      { token: "custom-error", foreground: "ff0000", fontStyle: "bold" },
      { token: "custom-notice", foreground: "FFA500" },
      { token: "custom-date", foreground: "008800" }
    ],
    colors: {
      "editor.foreground": "#00ff00"
    }
  });
}
