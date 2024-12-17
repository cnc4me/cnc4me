export type MacroValueArray = [register: number, value: number][];

export interface WorkCoordinateRecord {
  X: number;
  Y: number;
  Z: number;
  B: number;
}

export type WorkCoordinateArray = [X: number, Y: number, Z: number, B: number];

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
