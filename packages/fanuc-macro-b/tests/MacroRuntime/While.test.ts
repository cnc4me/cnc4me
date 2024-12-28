import { beforeEach, describe, expect, it } from "vitest";

import { MacroRuntime } from "../../src";

const PROGRAM = `%
O1000
(Step 1)
#100 = ABS[#18 - #26] (Calculate total travel distance)
#101 = 1 (Counter)
#102 = ROUND[#100/#17] (Number of pecks)
#103 = #100 / #102 (Recalculated depth per peck)
#104 = #18 (Current approach position)
#105 = #18 - #103 (Current peck bottom position)
(Step 2)
N1 IF [#101 GT #102] GOTO 99
(Step 3 No calculations required in this loop)
(Step 4)
G00 Z#104 (Rapid to current approach position)
G01 Z#105 F4.0 (Machine to current peck bottom)
G00 Z#18 (Retract from hole
(Step 5)
#101 = #101 +1 (Step counter)
#104 = #104 - #103 (Step current approach position)
#105 = #105 - #103 (Step current peck bottom position)
(Step 6)
GOTO 1
N99 M30
%`;

describe.skip("looping with WHILE", () => {
  const runtime = new MacroRuntime();

  // beforeEach(() => runtime.reset());

  it(`correctly runs the loop`, () => {
    runtime.loadProgram(PROGRAM, { setActive: true });
    runtime.run();

    // expect(runtime.hasErrors, runtime.getErrors()[0].message).toBeFalsy();
    expect(runtime.Memory.read(100)).toBe(1);
    expect(runtime.Memory.read(101)).toBe(1);
    expect(runtime.Memory.read(102)).toBe(1);
    expect(runtime.Memory.read(103)).toBe(1);
    expect(runtime.Memory.read(104)).toBe(1);
  });
});
