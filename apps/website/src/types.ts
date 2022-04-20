import type { EditorProps } from "@monaco-editor/react";
import type * as Monaco from "monaco-editor";

export type EditorOptions = EditorProps["options"];
export type MonacoEditor = Monaco.editor.IStandaloneCodeEditor;

export type TabStr = "macros" | "offsets" | "tools" | "debug";

export interface OffsetRegister {
  index: number;
  lengthGeom: number;
  lengthWear: number;
  diamGeom: number;
  diamWear: number;
}
