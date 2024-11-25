import { degreeToRadian, radianToDegree } from "../utils";

export const LN = (input: number) => Math.log(input);
export const ABS = (input: number) => Math.abs(input);
export const FUP = (input: number) => Math.ceil(input);
export const SQRT = (input: number) => Math.sqrt(input);
export const FIX = (input: number) => Math.floor(input);
export const ROUND = (input: number) => Math.round(input);
export const SIN = (input: number) => Math.sin(degreeToRadian(input));
export const COS = (input: number) => Math.cos(degreeToRadian(input));
export const TAN = (input: number) => Math.tan(degreeToRadian(input));
export const ASIN = (input: number) => radianToDegree(Math.asin(input));
export const ACOS = (input: number) => radianToDegree(Math.acos(input));
export const ATAN = (input: number) => radianToDegree(Math.atan(input));

export const STDLIB = {
  ABS,
  ACOS,
  ASIN,
  ATAN,
  BCD: (x: number) => x, // @TODO Implement BCD
  BIN: (x: number) => x, // @TODO Implement BIN
  COS,
  EXP: (x: number) => x, // @TODO Implement EXP
  FIX,
  FUP,
  LN,
  ROUND,
  SIN,
  SQRT,
  TAN
} as const;

// export function stdlib(func: MacroBuiltinFunctionNames, input: number): number {
//   if (typeof input !== "number") {
//     throw new Error(
//       "There was an error evaluting the builtinFn into a number."
//     );
//   }

//   export const result = STDLIB[func](input);

//   return result;
// }
