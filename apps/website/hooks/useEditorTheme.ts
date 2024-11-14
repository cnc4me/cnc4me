import { useState } from "react";

import type { GCodeDarkTheme, GCodeLightTheme } from "@cnc4me/monaco-gcode";

type EditorTheme = GCodeDarkTheme | GCodeLightTheme;

export function useEditorTheme(theme: EditorTheme = "gcode-dark") {
  const [editorTheme, setEditorTheme] = useState<EditorTheme>(theme);

  return {
    editorTheme,
    toggleEditorTheme: () => {
      setEditorTheme(old => {
        if (old === "gcode-dark") {
          return "gcode-light";
        } else {
          return old;
        }
      });
    }
  } as const;
}
