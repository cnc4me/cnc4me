import { describe, expect, it } from "vitest";

import { MacroRuntime } from "../../../src";

const PROGRAM = `%
O0003 (Big Test)
#1 = 1
#2 = 5
WHILE [#1 LE 5] DO1
#1 = #1 + 1
WHILE [#2 GE 1] DO2
#2 = #2 - 1
END2
END1
%`;

describe("Evaluating a nested While Loops", { fails: true }, () => {
  const runtime = MacroRuntime.create({ loadAndActivate: PROGRAM });

  it(`loops all blocks`, () => {
    runtime.run();

    expect(runtime.readRegister(1)).toBe(6);
    expect(runtime.readRegister(2)).toBe(0);
  });
});
