import { describe, expect, it } from "vitest";
import { FanucMacroB } from "../../src";

const MATCH_PRECISION = 6;

const TEST_CASES: [expr: string, answer: number][] = [
  ["100*[5/25]", 20],
  ["10/2+3", 8],
  ["10/[2+3]", 2],
  ["1+2+3+4+5", 15],
  ["[20-5]*2", 30],
  ["20-[5*2]", 10],
  ["2*3+5*2", 16],
  ["2*[3+5]*2", 32],
  ["[[1+2]*3]/[[6*2]+2]", 0.642857],
  // ["[[[5+2]-[3+[5*2+2]/[2+3]]]", 1.6],

  // Errors
  // ["10/0", NaN], // Division by zero should throw an error

  // Generated Tests
  ["-1+2", 1], // Handling negative numbers
  ["2+3*4-5/5", 13], // Operator precedence test (multiplication and division first)
  ["99999+1", 100000], // Large number test
  ["0.1+0.2", 0.3], // Floating point precision test (should be 0.3)
  ["[25*[2+2]]/[[1+1]*2]", 25], // Brackets and nested operations
  ["-5+3", -2], // Negative results
  ["2*[3+5]*2+4", 36], // Mixed operations with multiple brackets
  ["2+[3*2]+[5/2]", 10.5], // Multiple brackets and operations
  ["[5+3]*[[2+1]*[4-1]]", 72], // Complex nested brackets
  ["[5+5]*[5/5]+1", 11], // Nested expressions with integers and floats
  ["2*3+4-[2*5]", 0], // Testing multiple operations with brackets
  ["[5-2]*[3+1]", 12], // Brackets around subexpressions
  ["2*[3+5]*[4-2]", 32], // More complex with multiple brackets
  ["[5*3]+[4*2]", 23], // Addition of products with brackets
  ["[[5+5]*2]/2", 10], // Nested multiplication and division with brackets
  ["2+[3*4-[2*3]]", 8], // Nested brackets with subtraction inside
];

describe("interpreting expressions into a variable", () => {
  it.each(TEST_CASES)(`parsing '%s' should equal '%s'`, (expr, answer) => {
    const fmb = new FanucMacroB();

    const variable = 1;

    fmb.eval(`#${variable}=${expr}`);

    expect(fmb.hasErrors).toBeFalsy();
    expect(fmb.memory.read(1)).toBeCloseTo(answer, MATCH_PRECISION);
  });
});
