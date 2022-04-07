import { lines } from "../src";

const code = `
#1=5
#2=#1+#1
#3=#1*#1`;

const { interpreter } = lines(code);
const { Memory } = interpreter;

// console.log(Memory.toMap());
console.log(Memory.toJson());
// console.log(Memory.toArray());
