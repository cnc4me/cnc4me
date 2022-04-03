interface G10LineBase {
  readonly L: number;
  readonly P: number;
  readonly MODE?: number;
}

interface G10WorkOffsets extends G10LineBase {
  readonly L: 2 | 20;
  readonly X?: number;
  readonly Y?: number;
  readonly Z?: number;
  readonly B?: number;
}

interface G10ToolOffsets extends G10LineBase {
  readonly L: 10 | 11 | 12 | 13;
  readonly R?: number;
}

export type G10Line = G10ToolOffsets | G10WorkOffsets;
