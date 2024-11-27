const LN = (x: number) => Math.log(x);
const ABS = (x: number) => Math.abs(x);
const FUP = (x: number) => Math.ceil(x);
const SQRT = (x: number) => Math.sqrt(x);
const FIX = (x: number) => Math.floor(x);
const ROUND = (x: number) => Math.round(x);
const BCD = (x: number) => decimalToBCD(x);
const BIN = (x: number) => decimalToBin(x);
const EXP = (x: number) => Math.pow(Math.E, x);
const SIN = (x: number) => Math.sin(degreeToRadian(x));
const COS = (x: number) => Math.cos(degreeToRadian(x));
const TAN = (x: number) => Math.tan(degreeToRadian(x));
const ASIN = (x: number) => radianToDegree(Math.asin(x));
const ACOS = (x: number) => radianToDegree(Math.acos(x));
const ATAN = (x: number) => radianToDegree(Math.atan(x));

/**
 * These are built in language functions for Fanuc Macro B
 */
export const STDLIB = {
  ABS,
  ACOS,
  ASIN,
  ATAN,
  BCD,
  BIN,
  COS,
  EXP,
  FIX,
  FUP,
  LN,
  ROUND,
  SIN,
  SQRT,
  TAN
} as const;

function degreeToRadian(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function radianToDegree(radians: number): number {
  return (180 / Math.PI) * radians;
}

function decimalToBCD(value: number): number {
  const digits = value.toString().split("");
  const binary = digits.map(digit =>
    parseInt(digit, 10).toString(2).padStart(4, "0")
  );
  return parseInt(binary.join(""));
}

function decimalToBin(value: number): number {
  return Number(value.toString(2));
}
