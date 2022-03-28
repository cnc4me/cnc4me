export interface AxisLocations {
  X: number;
  Y: number;
  Z: number;
  B: number;
}

export interface UpdatedValue {
  prev: number;
  curr: number;
}

export type PositioningMode = "G90" | "G91";
