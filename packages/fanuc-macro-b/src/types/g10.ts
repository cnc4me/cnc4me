interface G10LineBase {
  L: number;
  P: number;
  MODE?: 90 | 91;
}

type G10WorkOffsets = G10LineBase & {
  L: 2 | 20;
  X?: number;
  Y?: number;
  Z?: number;
  B?: number;
};

type G10ToolOffsets = G10LineBase & {
  L: 10 | 11 | 12 | 13;
  R?: number;
};

export type G10Line = G10ToolOffsets | G10WorkOffsets;
