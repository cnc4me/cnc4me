import { FanucMacroB, MacroLexer } from "../src";

const fmb = new FanucMacroB();

const res = fmb.eval(`ABS[-5]`);

// console.log(res);
console.log(fmb.interpreter);
