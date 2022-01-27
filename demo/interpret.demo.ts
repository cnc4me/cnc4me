import { interpret } from "../src/utils";

const code = `
#1=10
#2=0.0025
#3=4.2345
#4=-7.349
#5=#3
#6=#4+#3
#7=#1-#2
#8=#1+#1
#9=#1*#5
#10=#3/#2
`;

const { interpreter, parseErrors } = interpret(code, "lines");

if (parseErrors.length > 0) {
  parseErrors.forEach(e => console.log(e));
}

const result = interpreter.getMacros();

console.log(result);
