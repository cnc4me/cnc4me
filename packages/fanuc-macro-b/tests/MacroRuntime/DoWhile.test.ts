import { beforeEach, describe, expect, it } from "vitest";

import { MacroRuntime } from "../../src";

const PROGRAM = `%
O0001 (test 1)
N1 #1 = 1
N2 GOTO4
N3 #1 = 0
N4
N5 M30
%`;

const runtime = new MacroRuntime();

describe("Evaluating a GOTO", () => {
  beforeEach(() => runtime.reset());

  it(`jumps execution to the specified block number`, () => {
    runtime.loadProgram(PROGRAM, { setActive: true }).run();

    const res = runtime.readRegister(1);
    expect(res).toBe(1);
  });
});
