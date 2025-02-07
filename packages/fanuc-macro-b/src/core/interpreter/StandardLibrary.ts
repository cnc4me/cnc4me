import type { MacroBuiltinFunctionNames } from "../../types";

/**
 * These are built in language functions for Fanuc Macro B
 */
export const STDLIB: Record<MacroBuiltinFunctionNames, (x: number) => number> =
  {
    LN: (x: number) => Math.log(x),
    ABS: (x: number) => Math.abs(x),
    FUP: (x: number) => Math.ceil(x),
    SQRT: (x: number) => Math.sqrt(x),
    FIX: (x: number) => Math.floor(x),
    ROUND: (x: number) => Math.round(x),
    BCD: (x: number) => decimalToBCD(x),
    BIN: (x: number) => decimalToBin(x),
    EXP: (x: number) => Math.pow(Math.E, x),
    SIN: (x: number) => Math.sin(degreeToRadian(x)),
    COS: (x: number) => Math.cos(degreeToRadian(x)),
    TAN: (x: number) => Math.tan(degreeToRadian(x)),
    ASIN: (x: number) => radianToDegree(Math.asin(x)),
    ACOS: (x: number) => radianToDegree(Math.acos(x)),
    ATAN: (x: number) => radianToDegree(Math.atan(x))
  };

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
