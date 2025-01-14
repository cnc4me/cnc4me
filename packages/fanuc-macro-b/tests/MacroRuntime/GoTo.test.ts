import { describe, expect, it } from "vitest";

import { MacroRuntime } from "../../src";

const PROGRAM = `%
O1234 (test)
N1 #1 = 1
N2 GOTO4
N3 #1 = 0
N4
N5 M30
%`;

const runtime = new MacroRuntime();

describe("Evaluating a GOTO", () => {
  it(`jumps execution to the specified block number`, () => {
    runtime.loadProgram(PROGRAM, { setActive: true });
    runtime.run();

    const res = runtime.getMacroVariable(1);
    expect(res, "GOTO 4 failed to jump over N3").toBe(1);
  });
});
