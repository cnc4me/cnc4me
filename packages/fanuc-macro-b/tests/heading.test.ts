import { MacroRuntime } from "../src/lib/MacroRuntime";

const SAMPLE_1 = `%
O0003 ( Program 3 )

M107
G0 G90 G56 ( IN LINE COMMENT )
M30
%`;

describe("macro runtime", () => {
  const runtime = new MacroRuntime();

  it("loads a program into memory", () => {
    runtime.loadProgram(SAMPLE_1, { setActive: true });

    expect(runtime.ActiveProgram.number).toBe(3);
  });
});
