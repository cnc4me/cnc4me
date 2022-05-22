import * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

export type { Monaco };

export type MonacoLangDef = Monaco.languages.IMonarchLanguage;
export type MonacoThemeDef = Monaco.editor.IStandaloneThemeData;
export type MonacoCodeEditor = Monaco.editor.IStandaloneCodeEditor;
export type MonacoDiffEditor = Monaco.editor.IStandaloneDiffEditor;
export type MonarchTokenizerRule = [match: RegExp, token: string];
export type MonarchBracketTuple = [open: string, close: string, token: string];
export type MonarchLangugageBracket =
  | Monaco.languages.IMonarchLanguageBracket
  | MonarchBracketTuple;
