import { useState } from "react";
import type { GcodeThemeName } from "@cnc4me/monaco-gcode";

export function useEditorTheme(theme: GcodeThemeName = "gcode-dark") {
  const [editorTheme, setEditorTheme] = useState<GcodeThemeName>(theme);

  return {
    editorTheme,
    toggleEditorTheme: () => {
      setEditorTheme((old) => {
        if (old === "gcode-dark") {
          return "gcode-light";
        } else {
          return old;
        }
      });
    },
  } as const;
}
