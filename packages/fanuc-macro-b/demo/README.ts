import { FanucMacroB } from "../src";

const fmb = new FanucMacroB();

fmb.eval(`
#1=100*[5/25]
#2=4+10/2
#3=10/[2+3]
#4=1+2+3+4+5
#5=[20-5]*2
#6=20-[5*2]
#7=2*3+5*2
#8=2*[3+5]*2
`);

const register1 = fmb.memory.read(1);
const register2 = fmb.memory.read(2);

console.log(register1); // => 20
console.log(register2); // => 9 [ not 7 :) ]

const vars = fmb.memory.toObject();

console.log(vars);

// {
//   '1': 20,
//   '2': 9,
//   '3': 2,
//   '4': 15,
//   '5': 30,
//   '6': 10,
//   '7': 16,
//   '8': 32
// }
