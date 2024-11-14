import { zeroPad } from "@cnc4me/fanuc-macro-b";
import { registerMonacoResources } from "@cnc4me/monaco-gcode";
import Editor, { EditorProps, OnChange, OnMount } from "@monaco-editor/react";
import React from "react";

import type { EditorTheme } from "../../lib/types";

const DEFAULT_EDITOR_OPTIONS = {
  minimap: { enabled: false },
  lineNumbers: (currLine: number) => zeroPad(currLine)
} as const;

export const MacroEditor: React.FC<{
  options?: EditorProps["options"];
  contents?: string;
  theme?: EditorTheme;
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
      beforeMount={registerMonacoResources}
    />
  );
};
