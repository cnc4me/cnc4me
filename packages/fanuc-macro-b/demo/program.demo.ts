import { MacroRuntime } from "../src";

const runtime = new MacroRuntime();

runtime.onError(err => {
  console.error("RUNTIME ERROR", err);
});

const demo = `%
O1000
T1 M6
G0 Z100
M30
%`;

runtime.loadProgram(demo, { setActive: true });

console.log(runtime.activeProgram);

// const program = runtime.getActiveProgram();
// console.log(program);

const result = runtime.run();
console.log(result);
