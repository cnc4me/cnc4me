import { describe, expect, it } from "vitest";

import { MacroRuntime } from "../../../src";

const code = `
#1=LN[5]
#2=LN[10]
#3=LN[49]
#4=LN[144]`;

describe("function: LN[]", () => {
  const runtime = new MacroRuntime();
  const { Memory } = runtime;

  runtime.evalLines(code);

  it("parses with no errors", () => {
    expect(runtime.hasErrors).toBeFalsy();
  });

  it("can calculate LN[5]", () => {
    expect(Memory.read(1)).toMatchWithinTolerance(1.60944, 1e-5);
  });

  it("can calculate LN[36]", () => {
    expect(Memory.read(2)).toMatchWithinTolerance(2.30259, 1e-5);
  });

  it("can calculate LN[49]", () => {
    expect(Memory.read(3)).toMatchWithinTolerance(3.891825, 1e-5);
  });

  it("can calculate LN[144]", () => {
    expect(Memory.read(4)).toMatchWithinTolerance(4.96981, 1e-5);
  });
});
