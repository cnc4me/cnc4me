import type { GCodeDarkTheme, GCodeLightTheme } from "@cnc4me/monaco-gcode";
import type { editor } from "monaco-editor";

export type EditorTheme = GCodeDarkTheme | GCodeLightTheme;

export type MonacoCodeEditor = editor.IStandaloneCodeEditor;

/**
 * @deprecated this is tedious to add new tabs...
 */
export type ViewStr = "home" | "macros" | "offsets" | "tools" | "debug";

export interface OffsetRegister {
  index: number;
  lengthGeom: number;
  lengthWear: number;
  diamGeom: number;
  diamWear: number;
}
