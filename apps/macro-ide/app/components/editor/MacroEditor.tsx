import { MonacoGcode } from "@cnc4me/monaco-gcode";
import Editor from "@monaco-editor/react";
import type { GcodeThemeName } from "@cnc4me/monaco-gcode";
import type { EditorProps, OnChange, OnMount } from "@monaco-editor/react";

const DEFAULT_EDITOR_OPTIONS = {
  minimap: {
    enabled: false,
  },
  lineNumbers: (currLine: number) => String(currLine).padStart(4, "0"),
} as const;

type Props = {
  contents?: string;
  theme?: GcodeThemeName;
  options?: EditorProps["options"];
  onMount: OnMount;
  onChange: OnChange;
};

export default function MacroEditor({
  onMount,
  onChange,
  options,
  contents,
  theme,
}: Props) {
  if (typeof window === "undefined") {
    return null;
  }
  return (
    <Editor
      theme={theme ?? "gcode-dark"}
      onMount={onMount}
      onChange={onChange}
      defaultLanguage="gcode"
      defaultValue={contents ?? "O0001 (PROGRAM TITLE)"}
      options={{
        ...DEFAULT_EDITOR_OPTIONS,
        ...options,
      }}
      beforeMount={MonacoGcode.register}
    />
  );
}
