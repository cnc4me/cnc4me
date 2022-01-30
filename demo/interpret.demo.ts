import { interpret } from "../src/utils";

const code = `
#1=5
#2=10
#3=1+2+3+4+5
#4=20-5*2
#5=2*3+5*8
#6=ABS[-2]`;

const { interpreter, parseErrors } = interpret(code, "lines");

if (parseErrors.length > 0) {
  parseErrors.forEach(e => console.log(e));
}

const result = interpreter.getMacros();

console.log(result);
