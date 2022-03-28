import { program } from "../src/utils";

const code = `%
O1234 (example)
G10 L2 P1 X1.23 Y4.56 Z7.89 B0.
G10 L20 P1 X5.1234 Y25.3252 Z1.2153 B270.
G10 L11 P9 R.0031
M30
%`;

const { parseErrors, result, insights } = program(code);

if (parseErrors.length > 0) {
  console.error(parseErrors);
}

console.log("\n\n================== Analysis =====================");
console.log(result.lines[1]);

// console.log("\n\n================== Insights =====================");
// console.log(insights["G10"]);
