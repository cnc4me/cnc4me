import { MonacoGcode } from "@cnc4me/monaco-gcode";
import Editor from "@monaco-editor/react";
import React from "react";

import type { GcodeThemeName } from "@cnc4me/monaco-gcode";
import type { EditorProps, OnChange, OnMount } from "@monaco-editor/react";

const DEFAULT_EDITOR_OPTIONS = {
  minimap: {
    enabled: false
  },
  lineNumbers: (currLine: number) => String(currLine).padStart(4, "0")
} as const;

export const MacroEditor: React.FC<{
  contents?: string;
  theme?: GcodeThemeName;
  options?: EditorProps["options"];
  onMount: OnMount;
  onChange: OnChange;
}> = ({ onMount, onChange, options, contents, theme }) => {
  return (
    <Editor
      theme={theme ?? "gcode-dark"}
      onMount={onMount}
      onChange={onChange}
      defaultLanguage="gcode"
      defaultValue={contents ?? ""}
      options={{
        ...DEFAULT_EDITOR_OPTIONS,
        ...options
      }}
      beforeMount={MonacoGcode.register}
    />
  );
};
