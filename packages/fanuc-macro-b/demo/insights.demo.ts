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
G43 H#518 Z1. T44
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

const { parseErrors, result, insights } = program(code);

if (parseErrors.length > 0) {
  console.error(parseErrors);
}
console.log("\n\n================== Analysis =====================");
console.log(result.lines[2]);
console.log("\n\n================== Insights =====================");
console.log(insights["G10"]);
