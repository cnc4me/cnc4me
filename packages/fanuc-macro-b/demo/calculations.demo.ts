import { lines } from "../src";

const code = `
G10L20P1X5.2315Y16.9805Z4.3611B0. ( OP1 )
G10L20P2X-2.2231Y5.5545Z8.0032B90. ( OP2 )
G10L20P3X6.3021Y8.1200Z6.3512B180. ( OP3 )
G10L20P4X-5.692Y11.9856Z2.3516B270. ( OP4 )
N10#1=5
N20#2=4
N30#3=3
N40#4=[#1 + #2] * #3`;

const { interpreter } = lines(code);
const { Memory } = interpreter;

console.log(Memory.toJson());
// console.log(Memory.toArray());
