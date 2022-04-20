export type MacroValueArray = [register: number, value: number][];

export interface AxisLocations {
  X: number;
  Y: number;
  Z: number;
  B: number;
}

export type WorkCoordinatesArray = [X: number, Y: number, Z: number, B: number];

export interface UpdatedValue {
  prev: number;
  curr: number;
}

export interface WatcherValuePayload extends UpdatedValue {
  register: number;
}

export type ToolOffsetArray = [
  toolNumber: number,
  lengthGeom: number,
  lengthWear: number,
  diamGeom: number,
  diamWear: number
];

export interface ToolOffsetDict {
  length: number;
  lengthComp: number;
  diameter: number;
  diameterComp: number;
}
