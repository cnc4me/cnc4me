import { interpret } from "../src/utils";

const code = `
#1=5
#2=10`;

const { interpreter, parseErrors } = interpret(code, "lines");

if (parseErrors.length > 0) {
  parseErrors.forEach(e => console.log(e));
}

const result = interpreter.getMacros();

console.log(result);
