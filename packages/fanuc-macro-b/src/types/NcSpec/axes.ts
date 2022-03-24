export type VmcAxis = "X" | "Y" | "Z";
export type HmcAxis = VmcAxis | "B";

export interface AxisLimits {
  min: number;
  max: number;
}

export type AxesLimits = Record<HmcAxis, AxisLimits>;

export interface NcPosition {
  [K: string]: number;
  X: number;
  Y: number;
  Z: number;
  B: number;
}
