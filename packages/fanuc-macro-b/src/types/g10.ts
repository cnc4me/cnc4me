import type { MacroRuntime } from "../lib";
import type { RuntimeError } from "./runtime";

export type ValidG10WorkOffsetGroup = 2 | 20;

export type ValidG10ToolOffsetGroup = 10 | 11 | 12 | 13;

export type ValidG10OffsetGroups =
  | ValidG10WorkOffsetGroup
  | ValidG10ToolOffsetGroup;

interface G10LineBase {
  readonly L: number;
  readonly P: number;
  readonly MODE?: number;
}

export interface G10WorkOffsets extends G10LineBase {
  readonly L: ValidG10WorkOffsetGroup;
  // readonly L: number;
  readonly X?: number;
  readonly Y?: number;
  readonly Z?: number;
  readonly B?: number;
}

export interface G10ToolOffsets extends G10LineBase {
  readonly L: ValidG10ToolOffsetGroup;
  // readonly L: number;
  readonly R?: number;
}

export type PossibleG10LineValues = G10ToolOffsets | G10WorkOffsets;

export interface G10ParseResult {
  runtime: MacroRuntime;
  error: RuntimeError[];
  result: PossibleG10LineValues;
}
