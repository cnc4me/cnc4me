export type MacroValueArray = [register: number, value: number][];

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

export interface WatcherValuePayload extends UpdatedValue {
  register: number;
}

export interface ToolOffsetValues {
  length: number;
  lengthComp: number;
  diameter: number;
  diameterComp: number;
}
