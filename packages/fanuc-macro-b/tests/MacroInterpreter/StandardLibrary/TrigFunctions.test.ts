import { describe, expect, it } from "vitest";
import { FanucMacroB } from "../../../src";

const SQUARE_ROOT_TWO = Math.sqrt(2);
const SQUARE_ROOT_THREE = Math.sqrt(3);

const ROOT_TWO__OVER_TWO = SQUARE_ROOT_TWO / 2;
const ROOT_THREE__OVER_TWO = SQUARE_ROOT_THREE / 2;

const TEST_CASES: TestCases = [
  // Sine
  [`SIN[5]`, 0.08715],
  [`SIN[15]`, 0.258819],
  [`SIN[30]`, 0.5],
  [`SIN[45]`, 0.707106],
  [`SIN[60]`, 0.866025],
  [`SIN[90]`, 1],

  // Inverse Sine
  [`ASIN[1]`, 90],
  [`ASIN[${ROOT_TWO__OVER_TWO}]`, 45],
  [`ASIN[${ROOT_THREE__OVER_TWO}]`, 60],

  // Cosine
  [`COS[5]`, 0.99619],
  [`COS[15]`, 0.965925],
  [`COS[30]`, 0.866025],
  [`COS[45]`, 0.707106],
  [`COS[60]`, 0.5],
  [`COS[90]`, 0],

  // Inverse Cosine
  [`ACOS[1]`, 0],
  [`ACOS[-1]`, 180],
  [`ACOS[${ROOT_TWO__OVER_TWO}]`, 45],
  [`ACOS[${ROOT_THREE__OVER_TWO}]`, 30],
  [`ACOS[.5]`, 60],

  // Tangent
  [`TAN[5]`, 0.087488],
  [`TAN[15]`, 0.267949],
  [`TAN[30]`, 0.57735],
  [`TAN[45]`, 1],
  [`TAN[60]`, 1.73205],
  [`TAN[135]`, -1],

  // Inverse Tangent
  [`ATAN[1]`, 45],
  [`ATAN[${1 / SQUARE_ROOT_THREE}]`, 30],
  [`ATAN[${SQUARE_ROOT_THREE}]`, 60],
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
