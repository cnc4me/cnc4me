import { evaluate } from "../src/utils";

const code = `
#1=1
#2=2
#3=3
#4=#2+#2
#5=[#2*3]-#1
#6=#1+#2+#3`;

const { macros } = evaluate(code);

console.log(macros);

// Map(6) {
//   1 => 1,
//   2 => 2,
//   3 => 3,
//   4 => 4,
//   5 => 5,
//   6 => 6
// }
