interface G10LineBase {
  readonly L: number;
  readonly P: number;
  readonly MODE?: number;
}

export interface G10WorkOffsets extends G10LineBase {
  readonly L: 2 | 20;
  // readonly L: number;
  readonly X?: number;
  readonly Y?: number;
  readonly Z?: number;
  readonly B?: number;
}

export interface G10ToolOffsets extends G10LineBase {
  readonly L: 10 | 11 | 12 | 13;
  // readonly L: number;
  readonly R?: number;
}

export type PossibleG10LineValues = G10ToolOffsets | G10WorkOffsets;

interface G10ParseResultError {
  error: string;
  result: null;
}

interface G10ParseResultSuccess {
  error: null;
  result: PossibleG10LineValues;
}

export type G10ParseResult = G10ParseResultSuccess | G10ParseResultError;
