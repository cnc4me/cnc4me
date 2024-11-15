import { describe, expect, it } from "vitest";

import { lines as parseLines } from "../../src";

const testData: [expr: string, answer: number][] = [
  ["100*[5/25]", 20],
  ["10/2+3", 8],
  ["10/[2+3]", 2],
  ["1+2+3+4+5", 15],
  ["[20-5]*2", 30],
  ["20-[5*2]", 10],
  ["2*3+5*2", 16],
  ["2*[3+5]*2", 32],
  ["[[1+2]*3]/[[6*2]+2]]", 0.642857],
  ["[[[5+2]-[3+[5*2+2]/[2+3]]]]", 1.6]
];

describe("evaluating simple expressions", () => {
  it.each(testData)(`evaluates '%s' = %s`, (expr, answer) => {
    const variable = 1;
    const { runtime } = parseLines(`#${variable}=${expr}`);
    const errors = runtime.getErrors();

    // The second param provides the actual runtime error in the failure message
    expect(errors[0], errors[0]).toBeUndefined();
    expect(runtime.Memory.read(1)).toMatchWithPrecision(answer);
  });
});
