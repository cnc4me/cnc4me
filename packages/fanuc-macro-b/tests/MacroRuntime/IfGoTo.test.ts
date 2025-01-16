import { beforeEach, describe, expect, it } from "vitest";

import { MacroRuntime } from "../../src";

const PROGRAM1 = `
#1 = 1
#2 = 2
IF [#1 LT #2] GOTO4
#1 = 0
#2 = 0
N4 #3 = 3`;

const runtime = new MacroRuntime();

describe("Evaluating a GOTO", () => {
  beforeEach(() => runtime.reset());

  it(`jumps execution to the specified block number`, () => {
    runtime.mdi(PROGRAM1).run();
    // console.log(runtime.Lexer.getTokens());
    expect(runtime.readRegister(1)).toBe(1);
    expect(runtime.readRegister(2)).toBe(2);
    expect(runtime.readRegister(3)).toBe(3);
  });
});
