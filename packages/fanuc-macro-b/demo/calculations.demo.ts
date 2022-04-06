import { lines } from "../src";

const code = `
#1=100*[5/25]
#2=10/2+3
#3=10/[2+3]
#4=1+2+3+4+5
#5=[20-5]*2
#6=20-[5*2]
#7=2*3+5*2
#8=2*[3+5]*2
#9=[1+[2*[3]]]+[[6*2]+2]
#10=5+2*3+5*[2+2]*2+4`;

const { interpreter } = lines(code);
const { Memory } = interpreter;

// console.log(Memory.toMap());
console.log(Memory.toJson());
// console.log(Memory.toArray());
