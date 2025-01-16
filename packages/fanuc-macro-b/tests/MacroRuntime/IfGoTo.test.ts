import { beforeEach, describe, expect, it } from "vitest";

import { MacroRuntime } from "../../src";

describe("Evaluating an IF [] GOTO n", () => {
  const runtime = new MacroRuntime();

  beforeEach(() => runtime.reset());

  it(`will goto line if the condition is true`, () => {
    runtime
      .mdi(
        `
#1 = 1
#2 = 2
IF [#1 LT #2] GOTO4
#1 = 0
#2 = 0
N4 #3 = 3
#4 = 4`
      )
      .run();

    expect(runtime.readRegister(1)).toBe(1);
    expect(runtime.readRegister(2)).toBe(2);
    expect(runtime.readRegister(3)).toBe(3);
    expect(runtime.readRegister(4)).toBe(4);
  });

  it(`execute in sequence if the condition is false`, () => {
    runtime
      .mdi(
        `
#1 = 1
#2 = 2
IF [#1 GT #2] GOTO4
#1 = 0
#2 = 0
N4 #3 = 3
#4 = 4`
      )
      .run();

    expect(runtime.readRegister(1)).toBe(0);
    expect(runtime.readRegister(2)).toBe(0);
    expect(runtime.readRegister(3)).toBe(3);
    expect(runtime.readRegister(4)).toBe(4);
  });
});
