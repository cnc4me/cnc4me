import type { MacroCombinedError } from "./runtime";

export type ValidG10WorkOffsetGroup = 2 | 20;

export type ValidG10ToolOffsetGroup = 10 | 11 | 12 | 13;

export type ValidG10OffsetGroups =
  | ValidG10WorkOffsetGroup
  | ValidG10ToolOffsetGroup;

interface G10LineBase {
  L: number;
  P: number;
  // MODE?: number; // @TODO what is this for?
}

export interface G10WorkOffsets extends G10LineBase {
  L: ValidG10WorkOffsetGroup;
  X?: number;
  Y?: number;
  Z?: number;
  B?: number;
}

export interface G10ToolOffsets extends G10LineBase {
  L: ValidG10ToolOffsetGroup;
  R?: number;
}

export type PossibleG10LineValues = G10ToolOffsets | G10WorkOffsets;

export interface G10ParseResult {
  error: MacroCombinedError[];
  result: PossibleG10LineValues;
}
