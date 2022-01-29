import { interpret } from "../src/utils";

const code = `
#1=5
#2=10
#3=SIN[30]
#4=COS[60]
#5=TAN[45]
`;
//#5=[#1+#2]*#3

const { interpreter, parseErrors } = interpret(code, "lines");

if (parseErrors.length > 0) {
  parseErrors.forEach(e => console.log(e));
}

const result = interpreter.getMacros();

console.log(Math.sin(30));
console.log(result);
