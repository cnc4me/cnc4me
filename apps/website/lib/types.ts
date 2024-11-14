import type { MacroMemory, ParsedLineData } from "@cnc4me/fanuc-macro-b";
import type { editor } from "monaco-editor";

export type MonacoCodeEditor = editor.IStandaloneCodeEditor;

export type ViewStr = "home" | "macros" | "offsets" | "tools" | "debug";

export interface OffsetRegister {
  index: number;
  lengthGeom: number;
  lengthWear: number;
  diamGeom: number;
  diamWear: number;
}

export type {
  MacroMemory as MacroMemoryType,
  ParsedLineData as ParsedLineDataType
};
