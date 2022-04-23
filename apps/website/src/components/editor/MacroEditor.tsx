import { chrysalis } from "@cnc4me/chrysalis";
import { gcodeLanguage } from "@cnc4me/monaco-language-gcode";
import { gcodeDarkTheme, gcodeLightTheme } from "@cnc4me/monaco-theme-gcode";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import type * as Monaco from "monaco-editor";
import React, { useState } from "react";

import { EditorOptions } from "./types";
import { EditorThemes } from "./useEditorTheme";

const DEFAULT_EDITOR_OPTIONS = { minimap: { enabled: false } } as const;

export const MacroEditor: React.FC<{
  options?: EditorOptions;
  contents?: string;
  theme?: EditorThemes;
  onMount: OnMount;
  onChange: OnChange;
}> = ({ onMount, onChange, options = DEFAULT_EDITOR_OPTIONS, contents = "", theme = "gcode-dark" }) => {
  function configureMonaco<T extends typeof Monaco>(monaco: T): T {
    const { registerCustomLanguage, registerCustomTheme } = chrysalis(monaco);

    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

    registerCustomLanguage("gcode", gcodeLanguage);
    registerCustomTheme("gcode-dark", gcodeDarkTheme);
    registerCustomTheme("gcode-light", gcodeLightTheme);

    return monaco;
  }

  const [editorOptions] = useState<EditorOptions>(options ?? DEFAULT_EDITOR_OPTIONS);

  return (
    <Editor
      theme={theme}
      defaultLanguage="gcode"
      options={editorOptions}
      defaultValue={contents}
      onMount={onMount}
      onChange={onChange}
      beforeMount={configureMonaco}
    />
  );
};
