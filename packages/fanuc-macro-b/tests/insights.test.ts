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
  const { errors, insights } = program(code);

  it("runs without errors", () => {
    expect(errors).toHaveLength(0);
  });

  it.skip("extracts insights about G10 lines", () => {
    expect(insights.get("G10")).toHaveLength(1);
  });

  it("extracts insights about `B` addresses", () => {
    expect(insights.get("B")).toHaveLength(1);
    expect(insights.values("B")).toStrictEqual([90]);
    expect(insights.max("B")).toBe(90);
  });

  it("extracts insights about `T` addresses", () => {
    expect(insights.get("T")).toHaveLength(2);
    expect(insights.values("T")).toStrictEqual([43, 162]);
  });

  it("extracts insights about `X` addresses", () => {
    expect(insights.values("X")).toHaveLength(3);
    expect(insights.uniqValues("X")).toHaveLength(2);
    expect(insights.min("X")).toBe(0.75);
    expect(insights.max("X")).toBe(1.75);
  });

  it("extracts insights about `Y` addresses", () => {
    expect(insights.get("Y")).toHaveLength(2);
    expect(insights.min("Y")).toBe(0.19);
    expect(insights.max("Y")).toBe(1.81);
  });

  it("extracts insights about `Z` addresses", () => {
    expect(insights.get("Z")).toHaveLength(3);
    expect(insights.min("Z")).toBe(-0.5631);
    expect(insights.max("Z")).toBe(1);
  });
});
