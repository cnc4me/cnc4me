import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

export { Monaco };

export type GCodeTheme = "gcode-light" | "gcode-dark";

export type MonacoThemeDef = Monaco.editor.IStandaloneThemeData;

export type MonacoLangDef =
  | Monaco.languages.IMonarchLanguage
  | Monaco.Thenable<Monaco.languages.IMonarchLanguage>;

export type MonarchTokenizerRule = [match: RegExp, token: string];

export type MonarchLanguageBracket = [
  open: string,
  close: string,
  token: string
];
