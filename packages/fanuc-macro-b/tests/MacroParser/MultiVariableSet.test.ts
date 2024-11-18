import { describe, expect, it } from "vitest";

import { MacroRuntime } from "../../src";

const lines = [
  "#1=100*[5/25]",
  "#2=10/2+3",
  "#3=10/[2+3]",
  "#4=1+2+3+4+5",
  "#5=[20-5]*2",
  "#6=20-[5*2]",
  "#7=2*3+5*2",
  "#8=2*[3+5]*2",
  "#9=[[1+2]*3]/[[6*2]+2]]",
  // "#10=[5+2]-[3+[5*2+2]/[2+3]]",
  ""
];

const code = lines.join("\n");

const runtime = new MacroRuntime();

describe.skip("evaluating many expressions into multiple variables", () => {
  it("parses many lines all at once", () => {
    runtime.evalLines(code);
    const mem = runtime.Memory;
    const errors = runtime.getErrors();
    const errorMsgs = runtime.getErrorMessages();

    // The second param provides the actual runtime error in the failure message
    expect(errors[0], errorMsgs[0]).toBeUndefined();

    expect(mem.read(2)).toBe(8);
    expect(mem.read(1)).toBe(20);
    expect(mem.read(3)).toBe(2);
    expect(mem.read(4)).toBe(15);
    expect(mem.read(5)).toBe(30);
    expect(mem.read(6)).toBe(10);
    expect(mem.read(7)).toBe(16);
    expect(mem.read(8)).toBe(32);
    expect(mem.read(9)).toMatchWithPrecision(0.642857, 5);
    // expect(mem.read(10)).toMatchWithinTolerance(1.6);
  });
});
