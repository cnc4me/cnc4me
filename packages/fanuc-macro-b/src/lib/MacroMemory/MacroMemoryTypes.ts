export type CommonOffsetGroups = 53 | 54 | 55 | 56 | 57 | 58 | 59;

export interface AxisLocations {
  X: number;
  Y: number;
  Z: number;
  B: number;
}

export interface ToolOffsetValues {
  length: number;
  lengthComp: number;
  diameter: number;
  diameterComp: number;
}

export interface UpdatedValue {
  prev: number;
  curr: number;
}

export type PositioningMode = "G90" | "G91";
