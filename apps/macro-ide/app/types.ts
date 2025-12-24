import type { editor } from "monaco-editor";

export type MonacoCodeEditor = editor.IStandaloneCodeEditor;

/**
 * @deprecated this is tedious to add new tabs...
 */
export type ViewStr =
  | "home"
  | "macros"
  | "offsets"
  | "tools"
  | "debug"
  | "parser";

export interface OffsetRegister {
  index: number;
  lengthGeom: number;
  lengthWear: number;
  diamGeom: number;
  diamWear: number;
}
