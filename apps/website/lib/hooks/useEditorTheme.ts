import { useState } from "react";

export type EditorThemes = "gcode-dark" | "gcode-light";

interface EditorThemeSetters {
  setEditorThemeDark(): void;
  setEditorThemeLight(): void;
}

type UseEditorThemeHookResult = [editorTheme: EditorThemes, themeSetters: EditorThemeSetters];

export function useEditorTheme(defaultVal: EditorThemes): UseEditorThemeHookResult {
  const [editorTheme, setEditorTheme] = useState<EditorThemes>(defaultVal);
  const setEditorThemeDark = () => setEditorTheme("gcode-dark");
  const setEditorThemeLight = () => setEditorTheme("gcode-light");

  return [editorTheme, { setEditorThemeDark, setEditorThemeLight }];
}
