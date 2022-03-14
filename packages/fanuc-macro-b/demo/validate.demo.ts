import { analyze } from "../src/utils/analyze";

const PROGRAM = `%
O9901(example)
(header)

T43 M6
G0 G90 G55
M30
%`;

const { err, result } = analyze(PROGRAM);

if (err) {
  console.log(err);
}

console.log("\n\n================== ANALYSIS =====================");
console.log(result);
