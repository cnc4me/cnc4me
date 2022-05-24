import { chrysalis, Monaco } from "@cnc4me/chrysalis";
import { zeroPad } from "@cnc4me/fanuc-macro-b";
import { gcodeLanguage } from "@cnc4me/monaco-language-gcode";
import { gcodeDarkTheme, gcodeLightTheme } from "@cnc4me/monaco-theme-gcode";
import Editor, { EditorProps, OnChange, OnMount } from "@monaco-editor/react";
import React from "react";

import { EditorThemes } from "../../lib/types";

const DEFAULT_EDITOR_OPTIONS = {
  minimap: { enabled: false },
  lineNumbers: (currLine: number) => zeroPad(currLine)
} as const;

function configureMonaco<T extends typeof Monaco>(monaco: T): T {
  const { registerCustomLanguage, registerCustomTheme } = chrysalis(monaco);

  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

  registerCustomLanguage("gcode", gcodeLanguage);
  registerCustomTheme("gcode-dark", gcodeDarkTheme);
  registerCustomTheme("gcode-light", gcodeLightTheme);

  return monaco;
}

export const MacroEditor: React.FC<{
  options?: EditorProps["options"];
  contents?: string;
  theme?: EditorThemes;
  onMount: OnMount;
  onChange: OnChange;
}> = ({ onMount, onChange, options, contents = "", theme = "gcode-dark" }) => {
  return (
    <Editor
      theme={theme}
      onMount={onMount}
      onChange={onChange}
      defaultLanguage="gcode"
      defaultValue={contents}
      options={{ ...DEFAULT_EDITOR_OPTIONS, ...options }}
      beforeMount={configureMonaco}
    />
  );
};
