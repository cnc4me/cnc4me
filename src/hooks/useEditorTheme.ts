import { useState } from "react";

interface EditorThemeSetters {
  setEditorThemeDark(): void;
  setEditorThemeLight(): void;
}

type UseEditorThemeHookResult = [editorTheme: string, themeSetters: EditorThemeSetters];

export function useEditorTheme(defaultVal: string): UseEditorThemeHookResult {
  const [editorTheme, setEditorTheme] = useState(defaultVal);
  const setEditorThemeDark = () => setEditorTheme("gcode-dark");
  const setEditorThemeLight = () => setEditorTheme("gcode-light");

  return [editorTheme, { setEditorThemeDark, setEditorThemeLight }];
}
