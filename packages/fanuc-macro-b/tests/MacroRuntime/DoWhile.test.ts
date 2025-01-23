import { beforeEach, describe, expect, it } from "vitest";

import { MacroRuntime } from "../../src";

const PROGRAM = `%
O0001 (test 1)
#100 = 1
WHILE [#100 LE 5] DO1
#100 = #100 + 1
END1
%`;

const runtime = new MacroRuntime();

describe("Evaluating a While / Do / End", { timeout: 100 }, () => {
  beforeEach(() => runtime.reset());

  it(`loops the correct number of times`, () => {
    runtime.loadProgram(PROGRAM, { setActive: true }).run();

    const res = runtime.readRegister(1);
    expect(res).toBe(1);
  });
});
