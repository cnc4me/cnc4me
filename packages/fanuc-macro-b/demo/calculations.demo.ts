import { FanucMacroB, lines, MacroLexer } from "../src";

const fmb = new FanucMacroB();

const res = `ABS[-5]`;

// console.log(res);
console.log(fmb.interpreter);

const code = `
N10 #1=5
N20 #2=4
N30 #3=3
N40 #4=[#1 + #2] * #3`;

fmb.eval(code);

const mem = fmb.memory.toObject();

console.log(mem);

// console.log(serialized);

// console.log(JSON.parse(serialized));
