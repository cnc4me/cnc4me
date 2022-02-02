import { interpreter } from "../src/MacroInterpreter";
import { evaluate } from "../src/utils";

interpreter.setMacroVar(7, 3);
interpreter.setMacroVar(8, 3);

const code = `
#1=1
#2=2
#3=3
#4=#2+#2
#5=[#2*3]-#1
#6=#1+#2+#3
#9=#7*#8`;

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
