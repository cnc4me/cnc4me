export type { EditorThemes } from "./hooks/useEditorTheme";
export type { MonacoCodeEditor as MonacoCodeEditorType } from "@cnc4me/chrysalis";
export type { MacroMemory as MacroMemoryType } from "@cnc4me/fanuc-macro-b";
export type { ParsedLineData as ParsedLineDataType } from "@cnc4me/fanuc-macro-b";

export type ViewStr = "home" | "macros" | "offsets" | "tools" | "debug";

export interface OffsetRegister {
  index: number;
  lengthGeom: number;
  lengthWear: number;
  diamGeom: number;
  diamWear: number;
}
