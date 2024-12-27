import { describe, expect, it } from "vitest";

import { FanucMacroB } from "../../../src";

const E_TO_THE_POWER = (x: number) => Math.pow(Math.E, x);

const TEST_CASES: TestCases = [
  // Absolute Value
  [`ABS[5]`, 5],
  [`ABS[-5]`, 5],
  [`ABS[-1525]`, 1525],

  // Exponents
  [`EXP[2]`, E_TO_THE_POWER(2)],
  [`EXP[3]`, E_TO_THE_POWER(3)],
  [`EXP[21]`, E_TO_THE_POWER(21)],
  [`EXP[100]`, E_TO_THE_POWER(100)],

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

  // Square Root
  [`SQRT[2]`, 1.41421],
  [`SQRT[36]`, 6],
  [`SQRT[49]`, 7],
  [`SQRT[144]`, 12],
  [`SQRT[1580049]`, 1257]
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
