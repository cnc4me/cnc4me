import { describe, expect, it } from "vitest";

import { MacroRuntime } from "../../../src";

const code = `
#1=ACOS[1]
#2=ACOS[-1]
#3=ACOS[${Math.sqrt(2) / 2}]
#4=ACOS[${Math.sqrt(3) / 2}]
#5=ACOS[.5]`;

const runtime = new MacroRuntime();
const { Memory } = runtime;

describe("function: ACOS[]", () => {
  runtime.evalLines(code);

  it("parses with no errors", () => {
    expect(runtime.hasErrors).toBeFalsy();
  });

  it("can calculate ACOS[1]", () => {
    expect(Memory.read(1)).toBe(0);
  });

  it("can calculate ACOS[-1]", () => {
    expect(Memory.read(2)).toBe(180);
  });

  it("can calculate ACOS[x] (√2 / 2)", () => {
    expect(Memory.read(3)).toBe(45);
  });

  it("can calculate ACOS[x] (√3 / 2)", () => {
    expect(Memory.read(4)).toMatchWithinTolerance(30, 1e-14);
  });

  it("can calculate ACOS[.5]", () => {
    expect(Memory.read(5)).toMatchWithinTolerance(60, 1e-14);
  });
});
