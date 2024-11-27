import { describe, expect, it } from "vitest";

import { FanucMacroB } from "../../src";

const SQUARE_ROOT_TWO = Math.sqrt(2);
const SQUARE_ROOT_THREE = Math.sqrt(3);

const ROOT_TWO__OVER_TWO = SQUARE_ROOT_TWO / 2;
const ROOT_THREE__OVER_TWO = SQUARE_ROOT_THREE / 2;

const E_TO_THE_X_POWER = (x: number) => Math.pow(Math.E, x);

const TRIG_TEST_CASES: TestCases = [];

const TEST_CASES: TestCases = [
  // Absolute Value
  [`ABS[5]`, 5],
  [`ABS[-5]`, 5],
  [`ABS[-1525]`, 1525],

  // Inverse Cosine
  [`ACOS[1]`, 0],
  [`ACOS[-1]`, 180],
  [`ACOS[${ROOT_TWO__OVER_TWO}]`, 45],
  [`ACOS[${ROOT_THREE__OVER_TWO}]`, 30],
  [`ACOS[.5]`, 60],

  // Inverse Sine
  [`ASIN[1]`, 90],
  [`ASIN[${ROOT_TWO__OVER_TWO}]`, 45],
  [`ASIN[${ROOT_THREE__OVER_TWO}]`, 60],

  // Inverse Tangent
  [`ATAN[1]`, 45],
  [`ATAN[${1 / SQUARE_ROOT_THREE}]`, 30],
  [`ATAN[${SQUARE_ROOT_THREE}]`, 60],

  // To Binary
  [`BIN[1]`, 1],
  [`BIN[2]`, 10],
  [`BIN[3]`, 11],
  [`BIN[4]`, 100],
  [`BIN[5]`, 101],
  [`BIN[22]`, 10110],
  [`BIN[121]`, 1111001],
  [`BIN[999]`, 1111100111],

  // To Binary Coded Decimal
  // [`BCD[1]`, 1],
  // [`BCD[2]`, 10],
  // [`BCD[3]`, 11],
  // [`BCD[4]`, 100],
  // [`BCD[5]`, 101],
  // [`BCD[22]`, 10110],
  // [`BCD[121]`, 1111001],
  // [`BCD[999]`, 1111100111],

  // Cosine
  [`COS[5]`, 0.99619],
  [`COS[15]`, 0.965925],
  [`COS[30]`, 0.866025],
  [`COS[45]`, 0.707106],
  [`COS[60]`, 0.5],
  [`COS[90]`, 0],

  // Exponents
  [`EXP[2]`, E_TO_THE_X_POWER(2)],
  [`EXP[3]`, E_TO_THE_X_POWER(3)],
  [`EXP[21]`, E_TO_THE_X_POWER(21)],
  [`EXP[100]`, E_TO_THE_X_POWER(100)],

  // Round Down (Math.floor)
  [`FIX[5.987]`, 5],
  [`FIX[-2.136]`, -3],
  [`FIX[0.001]`, 0],
  [`FIX[101.99999]`, 101],

  // Round Up (Math.ceil)
  [`FUP[5.987]`, 6],
  [`FUP[-2.136]`, -2],
  [`FUP[0.001]`, 1],
  [`FUP[101.99999]`, 102],

  // Natural Log
  [`LN[5]`, 1.609437],
  [`LN[10]`, 2.302585],
  [`LN[49]`, 3.891825],
  [`LN[144]`, 4.969813],

  // Sine
  [`SIN[5]`, 0.08715],
  [`SIN[15]`, 0.258819],
  [`SIN[30]`, 0.5],
  [`SIN[45]`, 0.707106],
  [`SIN[60]`, 0.866025],
  [`SIN[90]`, 1],

  // Square Root
  [`SQRT[2]`, 1.41421],
  [`SQRT[36]`, 6],
  [`SQRT[49]`, 7],
  [`SQRT[144]`, 12],
  [`SQRT[1580049]`, 1257],

  // Tangent
  [`TAN[5]`, 0.087488],
  [`TAN[15]`, 0.267949],
  [`TAN[30]`, 0.57735],
  [`TAN[45]`, 1],
  [`TAN[60]`, 1.73205],
  [`TAN[135]`, -1]
];

describe("Interpreting BuiltinFunctions", () => {
  const fmb = new FanucMacroB();

  it.each(TEST_CASES)("%s = %s", (expr, output) => {
    const { error, result } = fmb.evalFunctionExpr(expr);

    expect(error).toBeFalsy();
    expect(result).toBeCloseTo(output, 4);
  });
});

type TestCases = Array<[expr: string, output: number]>;
