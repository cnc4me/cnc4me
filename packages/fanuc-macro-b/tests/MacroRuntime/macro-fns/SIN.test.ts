import { describe, expect, it } from "vitest";

import { MacroRuntime } from "../../../src";

const code = `
#1=SIN[5]
#2=SIN[15]
#3=SIN[30]
#4=SIN[45]
#5=SIN[60]
#6=SIN[90]`;

describe("function: SIN[]", () => {
  const runtime = new MacroRuntime();
  const { Memory } = runtime;

  runtime.evalLines(code);

  it("parses with no errors", () => {
    expect(runtime.hasErrors).toBeFalsy();
  });

  it("can calculate SIN[5]", () => {
    expect(Memory.read(1)).toMatchWithinTolerance(0.08715, 1e-5);
  });

  it("can calculate SIN[15]", () => {
    expect(Memory.read(2)).toMatchWithinTolerance(0.25882, 1e-5);
  });

  it("can calculate SIN[30]", () => {
    expect(Memory.read(3)).toMatchWithinTolerance(0.5, 1e-14);
  });

  it("can calculate SIN[45]", () => {
    expect(Memory.read(4)).toMatchWithinTolerance(0.70711, 1e-5);
  });

  it("can calculate SIN[60]", () => {
    expect(Memory.read(5)).toMatchWithinTolerance(0.86603, 1e-5);
  });

  it("can calculate SIN[90]", () => {
    expect(Memory.read(6)).toBe(1);
  });
});
