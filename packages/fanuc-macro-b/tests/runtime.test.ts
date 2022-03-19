import { MacroRuntime } from "../src/lib/MacroRuntime";

const SAMPLE_1 = `%
O1234 ( SAMPLE_1 )
( HEADING 1 )

G54
G90
M30
%`;

describe("macro runtime", () => {
  const runtime = new MacroRuntime();

  it("loads a program into memory", () => {
    runtime.loadProgram(SAMPLE_1, { setActive: true });

    expect(runtime.getActiveProgramNumber()).toBe(1234);
  });
});
