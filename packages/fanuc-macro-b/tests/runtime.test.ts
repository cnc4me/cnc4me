import { MacroRuntime } from "../src/lib/MacroRuntime";

const SAMPLE_CODE = `%
O1234 (example)
(header)

G10 L2 P1 X1.23 Y4.56 Z7.89 B0.

( DRILL FOR M5 X 0.8 ROLL TAP )
N43 ( #14 [.182"] DRILL, CARB, TSC )
M107
T43 M6
M01 ( #14 [.182"] DRILL, CARB, TSC )
G0 G90 G55
M22
B90.
M21
X1.75 Y.19 S10495 M3
M50 (TSC COOLANT ON)
G4 X2.
G43 H#518 Z1. T162
G98 G81 Z-.5631 R.1 F83.96
X.75
Y1.81
X1.75
G80
M107
G103 M1. ( TOOL BREAK CHECK )
M9
M5
M52 ( THRU TOOL AIR ON )
G4 X6.
M53 ( THRU TOOL AIR OFF )
G91 G28 Z0.
M30
%`;

describe("testing methods of the MacroRuntime class", () => {
  const runtime = new MacroRuntime();

  it("loadProgram() can loads a program into memory", () => {
    runtime.loadProgram(SAMPLE_CODE, { setActive: true });

    expect(runtime.getActiveProgramNumber()).toBe(1234);
  });
});
