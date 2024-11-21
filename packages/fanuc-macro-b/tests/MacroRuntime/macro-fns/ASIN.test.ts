import { describe, expect, it } from "vitest";

import { MacroRuntime } from "../../../src";

const code = `
#1=ASIN[1]
#2=ASIN[${Math.sqrt(2) / 2}]
#3=ASIN[${Math.sqrt(3) / 2}]`;

describe("function: ASIN[]", () => {
  const runtime = new MacroRuntime();
  const { Memory } = runtime;

  runtime.evalLines(code);

  it("parses with no errors", () => {
    expect(runtime.hasErrors).toBeFalsy();
  });

  it("can calculate ASIN[1]", () => {
    expect(Memory.read(1)).toBe(90);
  });

  it("can calculate ASIN[x] (√2 / 2)", () => {
    expect(Memory.read(2)).toMatchWithinTolerance(45, 1e-14);
  });

  it("can calculate ASIN[x] (√3 / 2)", () => {
    expect(Memory.read(3)).toMatchWithinTolerance(60, 1e-14);
  });
});
