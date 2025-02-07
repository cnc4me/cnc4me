import { beforeEach, describe, expect, test } from "vitest";

import { MacroRuntime } from "../../src";

const runtime = new MacroRuntime();

const testCases = [
  { condition: "2 GT 1", expected: 1, description: "evaluates GT as true" },
  { condition: "1 GT 2", expected: 0, description: "evaluates GT as false" },
  { condition: "1 LT 2", expected: 1, description: "evaluates LT as true" },
  { condition: "2 LT 1", expected: 0, description: "evaluates LT as false" },
  { condition: "2 GE 1", expected: 1, description: "evaluates GE as true" },
  { condition: "1 GE 2", expected: 0, description: "evaluates GE as false" },
  { condition: "1 LE 2", expected: 1, description: "evaluates LE as true" },
  { condition: "2 LE 1", expected: 0, description: "evaluates LE as false" },
  { condition: "1 EQ 1", expected: 1, description: "evaluates EQ as true" },
  { condition: "1 EQ 2", expected: 0, description: "evaluates EQ as false" },
  { condition: "1 NE 2", expected: 1, description: "evaluates NE as true" },
  { condition: "1 NE 1", expected: 0, description: "evaluates NE as false" }
];

describe("conditionally set a register with IF / THEN", () => {
  beforeEach(() => runtime.reset());

  test.each(testCases)("$description", ({ condition, expected }) => {
    runtime.mdi(`
      #1=0
      IF[${condition}] THEN #1=1
    `);
    runtime.run();
    expect(runtime.hasErrors).toBeFalsy();
    expect(runtime.readRegister(1)).toBe(expected);
  });
});
