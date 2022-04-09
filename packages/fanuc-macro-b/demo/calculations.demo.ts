import { lines } from "../src";

const code = `
G10 L20 P1 X5.2315 Y16.9805 Z4.3611 B0. ( OP1 )
G10 L20 P2 X-2.2231 Y5.5545 Z8.0032 B90. ( OP2 )
G10 L20 P3 X6.3021 Y8.1200 Z6.3512 B180. ( OP3 )
G10 L20 P4 X-5.692 Y11.9856 Z2.3516 B270. ( OP4 )
N10 #1=5
N20 #2=4
N30 #3=3
N40 #4=[#1 + #2] * #3`;

const { interpreter } = lines(code);
const { Memory } = interpreter;

const serialized = Memory.serialize();

console.log(serialized);

console.log(JSON.parse(serialized));
