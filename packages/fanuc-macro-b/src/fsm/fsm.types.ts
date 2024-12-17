export type AxisLabel = "X" | "Y" | "Z";

export type MotionType = "G0" | "G1";

export type AxisLimits = Record<"min" | "max", number>;

export type AxisLimitsInput =
  | number
  | [negative: number, positive: number]
  | AxisLimits;

export type Position = Partial<Record<"X" | "Y" | "Z", number>>;

export type StringCallback = GenericCallback<string>;

export type NumberCallback = GenericCallback<number>;

export type GenericCallback<T> = (args: T) => Promise<void>;

export type FsmCallback<T = unknown> =
  | ((arg: T) => Promise<void>)
  | ((arg: T) => void)
  | ((...args: T[]) => Promise<void>)
  | ((...args: T[]) => void)
  | undefined;

export type AxisFsmEvents = {
  FAULT: string;
  RESET: undefined;
  MOTION_COMPLETE: number;
  TRAVELING: Record<"to" | "from", number> & {
    type: MotionType;
  };
};
