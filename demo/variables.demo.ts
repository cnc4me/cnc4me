import { interpreter } from "../src/MacroInterpreter";
import { evaluate } from "../src/utils";

interpreter.setMacroVars([
  [7, 3],
  [8, 8]
]);

const code = `
#1=1
#2=2
#3=3
#4=#2+#2
#5=[#2*3]-#1
#6=#1+#2+#3
#9=#7*#8
#10=[48/#9]+[8*#2]]/[#2+[#4/.5]`;

const { macros } = evaluate(code);

console.log(macros);

// Map(10) {
//   1 => 1,
//   2 => 2,
//   3 => 3,
//   4 => 4,
//   5 => 5,
//   6 => 6,
//   7 => 3,
//   8 => 4,
//   9 => 12,
//   10 => 20
// }
