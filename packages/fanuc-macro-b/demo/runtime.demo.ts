import { runtime } from "../src/lib";

runtime.onError(err => console.error(err));

const P1 = `%
O0001 ( Program 1 )
M107
G0 G90 G54
M30
%`;

const P2 = `%
O0002 ( Program 2 )
M107
G0 G90 G55
M30
%`;

const P3 = `%
O0003 ( Program 3 )
M107
G0 G90 G56 ( IN LINE COMMENT )
M30
%`;

runtime.loadProgram(P1, { setActive: true });
runtime.loadProgram(P2);
runtime.loadProgram(P3);

// const program = runtime.getActiveProgram();
// console.log(program.input);

const result = runtime.run();

console.log(result);
