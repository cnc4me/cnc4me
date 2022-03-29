import { program } from "../src/utils";

const code = `%
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

describe("address Insights", () => {
  const { parseErrors, insights } = program(code);

  it("analyzes without errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("extracts insights about G10 lines", () => {
    expect(insights["G10"]).toHaveLength(1);
  });

  it("extracts insights about `B`", () => {
    expect(insights["B"].toArray()).toHaveLength(2);
    expect(insights["B"].min).toBe(0);
    expect(insights["B"].max).toBe(90);
  });

  it("extracts insights about `T`", () => {
    expect(insights["T"].toArray()).toHaveLength(2);
  });

  it("extracts insights about `X`", () => {
    expect(insights["X"].toArray()).toHaveLength(2);
    expect(insights["X"].min).toBe(0.75);
    expect(insights["X"].max).toBe(1.75);
  });

  it("extracts insights about `Y`", () => {
    expect(insights["Y"].toArray()).toHaveLength(2);
    expect(insights["Y"].min).toBe(0.19);
    expect(insights["Y"].max).toBe(1.81);
  });

  it("extracts insights about `Z`", () => {
    expect(insights["Z"].toArray()).toHaveLength(4);
    expect(insights["Z"].min).toBe(-0.5631);
    expect(insights["Z"].max).toBe(7.89);
  });
});
