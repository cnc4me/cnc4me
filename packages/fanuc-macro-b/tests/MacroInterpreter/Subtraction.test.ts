import { describe, expect, it } from "vitest";

import { FanucMacroB } from "../../src";

const REGISTER = 1;
const MATCH_PRECISION = 6;

const TEST_CASES: [expr: string, answer: number][] = [
  [`#${REGISTER}=[2-1]`, 1],
  [`#${REGISTER}=[3-2-1]`, 0],
  [`#${REGISTER}=[4-3-2-1]`, -2],
  [`#${REGISTER}=[100 - 50]`, 50],
  [`#${REGISTER}=[54.321 - .321]`, 54],
  [`#${REGISTER}=[0.2 - 0.1]`, 0.1],
  [`#${REGISTER}=[10000000 - .1]`, 9999999.9]
];

describe("Evaluating subtraction with the MacroInterpreter", () => {
  const fmb = new FanucMacroB();

  it.each(TEST_CASES)(`parsing '%s' should equal '%s'`, (expr, answer) => {
    fmb.eval(expr);
    // expect(fmb.hasErrors).toBeFalsy();
    expect(fmb.memory.read(1)).toMatchWithPrecision(answer, MATCH_PRECISION);
  });
});
