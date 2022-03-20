import { analyze } from "../src/utils/analyze";

const PROGRAM = `%
O9901(example)
(header)
G10 G90 L2 P1 X0 ( X WAS 4 ) Y0 Z0 B0 ( B WAS 5 )
N290
T43 M6
G0 G90 G55 ( line comment )
S4000 M3
G43 H#518 Z1.
G1 Z.1 F100.
M8
G83 G98 R.1 Z-1.2341 Q.124 F12.4
X.5
Y.5
X-.5
Y.5
G80
M5
M9
G91 G28 Z0.
M1
M98 P1234
M30
%`;

const { parseErrors, result } = analyze(PROGRAM);

if (parseErrors) {
  console.error(parseErrors);
}

console.log("\n\n================== ANALYSIS =====================");
console.log(result);
// console.log(result.lines);
