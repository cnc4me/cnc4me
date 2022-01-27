import { interpret } from "../src/utils";

const code = `
#1=5
#2=0.0025
#3=4.2345
#4=-27.12349
#1=#3`;

const { interpreter, parseErrors } = interpret(code, "lines");

if (parseErrors.length > 0) {
  parseErrors.forEach(e => console.log(e));
}

const { vars } = interpreter;

console.log("#1 = ", vars.read(1));
console.log("#2 = ", vars.read(2));
console.log("#3 = ", vars.read(3));
console.log("#4 = ", vars.read(4));
console.log("#1 = ", vars.read(1));
