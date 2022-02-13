import { useState } from "react";

export default function useEditorTheme(defaultVal: string) {
  const [editorTheme, setEditorTheme] = useState(defaultVal);
  const setEditorThemeDark = () => setEditorTheme("gcode-dark");
  const setEditorThemeLight = () => setEditorTheme("gcode-light");

  return { editorTheme, setEditorThemeDark, setEditorThemeLight };
}
