import { analyze } from "../src/utils/analyze";

const PROGRAM = `%
O9901(example)
(header)

G10 G90 L2 P1 X0 ( X WAS 4 ) Y0 Z0 B0 ( B WAS 5 )

T43 M6
G0 G90 G55 ( line comment )
M98 P1234
M30
%`;

const { err, result } = analyze(PROGRAM);

if (err) {
  console.log(err);
}

console.log("\n\n================== ANALYSIS =====================");
console.log(result);
