import { describe, expect, it } from "vitest";

import { MacroRuntime } from "../../../src";

const code = `
#1=ATAN[1]
#2=ATAN[${1 / Math.sqrt(3)}]
#3=ATAN[${Math.sqrt(3)}]`;

const runtime = new MacroRuntime();
const { Memory } = runtime;

describe("function: ATAN[]", () => {
  runtime.evalLines(code);

  it("parses with no errors", () => {
    expect(runtime.hasErrors).toBeFalsy();
  });

  it("can calculate ATAN[1]", () => {
    expect(Memory.read(1)).toBe(45);
  });

  it("can calculate ATAN[0.5773502691896258] (1/√3)", () => {
    expect(Memory.read(2)).toMatchWithinTolerance(30, 1e-14);
  });

  it("can calculate ATAN[1.7320508075688772] (√3)", () => {
    expect(Memory.read(3)).toMatchWithinTolerance(60, 1e-14);
  });
});
