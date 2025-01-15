import { beforeEach, describe, expect, it } from "vitest";

import { MacroRuntime } from "../../src";

const PROGRAM1 = `%
O0001 (test 1)
N1 #1 = 1
N2 GOTO4
N3 #1 = 0
N4
N5 M30
%`;

const PROGRAM2 = `%
O0002 (test 2)
N1 #2 = 1
N2 GOTO4
N3 #2 = 2
N4 GOTO6
N5 #2 = 3
N6 #2 = 4
M30
%`;

const PROGRAM3 = `%
O0003 (test 3)
N1 #3 = 1
N2 GOTO5
N3 #2 = 2
N4 GOTO7
N5 #2 = 3
N6 GOTO3
N7 #3 = 5
M30
%`;

const runtime = new MacroRuntime();

describe("Evaluating a GOTO", () => {
  beforeEach(() => runtime.reset());

  it(`jumps execution to the specified block number`, () => {
    runtime.loadProgram(PROGRAM1, { setActive: true }).run();

    const res = runtime.getMacroVariable(1);
    expect(res).toBe(1);
  });

  it(`can interpret multiple GOTO`, () => {
    runtime.loadProgram(PROGRAM2, { setActive: true }).run();
    expect(runtime.getMacroVariable(2)).toBe(4);
  });

  it(`can GOTO inner blocks and back out`, () => {
    runtime.loadProgram(PROGRAM3, { setActive: true }).run();
    expect(runtime.getMacroVariable(3)).toBe(5);
  });
});
