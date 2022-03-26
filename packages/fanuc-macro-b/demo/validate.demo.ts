import { program } from "../src/utils";

const code = `%
O1234 (SIMPLE)

N43 ( #14 [.182"] DRILL, CARB, TSC )
T43 M6
M01 ( #14 [.182"] DRILL, CARB, TSC )
G0 G90 G55
X1.75 Y.19 S10495 M3
M50 (TSC COOLANT ON)
G4 X2.
G43 H43 Z1. T44
G98 G81 Z-.5631 R.1 F83.96
X.75
Y1.81
X1.75
G80
M5
G91 G28 Z0.
M98 P1234
M30
%`;

const { parseErrors, result, insights } = program(code);

if (parseErrors.length > 0) {
  console.error(parseErrors);
}

console.log("\n\n================== Analysis =====================");
console.log(result.lines[5].addresses);
console.log("\n\n================== Insights =====================");
console.log(insights);
