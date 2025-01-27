import { beforeEach, describe, expect, it } from "vitest";

import { MacroRuntime } from "../../src";

const LOOPING = `%
O0001 (True Test)
#100 = 1
WHILE [#100 LE 5] DO1
#100 = #100 + 1
END1
%`;

const NO_LOOP = `%
O0002 (False Test)
#200 = 6
WHILE [#200 LE 5] DO1
#200 = #200 + 1
END1
%`;

const runtime = new MacroRuntime();

describe("Evaluating a While / Do / End", { timeout: 100 }, () => {
  beforeEach(() => runtime.reset());

  it(`skips the loop block when the condition is false`, () => {
    runtime.loadProgram(NO_LOOP, { setActive: true }).run();

    const res = runtime.readRegister(200);
    expect(res).toBe(6);
  });

  it(`loops the correct number of times`, () => {
    runtime.loadProgram(LOOPING, { setActive: true }).run();

    const res = runtime.readRegister(100);
    expect(res, "Should be 5 after looping").toBe(6);
  });
});
