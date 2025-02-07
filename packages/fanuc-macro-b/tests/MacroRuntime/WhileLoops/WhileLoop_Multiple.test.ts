import { describe, expect, it } from "vitest";

import { MacroRuntime } from "../../../src";

const PROGRAM = `%
O0003 (Big Test)
#1 = 1
#2 = 7
#3 = 1
WHILE [#1 LE 5] DO1
#1 = #1 + 1
END1
WHILE [#2 GT 1] DO2
#2 = #2 - 1
END2
WHILE [#3 LT 20] DO3
#3 = #3 + #3
END3
%`;

describe("Evaluating a multiple While Loops", () => {
  const runtime = new MacroRuntime();

  it(`loops all blocks`, () => {
    runtime.loadProgram(PROGRAM, { setActive: true }).run();

    expect(runtime.readRegister(1)).toBe(6);
    expect(runtime.readRegister(2)).toBe(1);
    expect(runtime.readRegister(3)).toBe(32);
  });
});
