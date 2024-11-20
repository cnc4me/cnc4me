import { expect, it } from "vitest";

import { MacroRuntime } from "../../../src";

const MATCH_PRECISION = 6;

const TEST_CASES: [expr: string, answer: number][] = [
  ["1+2", 3],
  ["1+2+3", 6],
  ["1+2+3+4", 10],
  ["1+2+3+4+5", 15],
  ["1 + 2 + 3 + 4 + 5", 15],
  ["2      +      2", 4],
  ["    5+   5  ", 10],
  ["321+0.123", 321.123],
  [".1+.2", 0.3]
];

const runtime = new MacroRuntime();

it.each(TEST_CASES)(`parsing '%s' should equal '%s'`, (expr, answer) => {
  const variable = 1;
  runtime.reset();
  runtime.evalLines(`#${variable}=${expr}`);

  // const errors = runtime.getErrors();

  expect(runtime.hasErrors).toBeFalsy();

  // The second param provides the actual runtime error in the failure message
  // expect(errors[0], runtime.getErrorMessages()[0]).toBeUndefined();
  // if (errors.length > 0) {
  //   expect(runtime.Memory.read(1)).toBe(NaN);
  // } else {
  expect(runtime.Memory.read(1)).toMatchWithPrecision(answer, MATCH_PRECISION);
  // }
});
