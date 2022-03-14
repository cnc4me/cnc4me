import { runtime } from "../src/lib/MacroRuntime";

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
G0 G90 G56
M30
%`;

runtime.loadPrograms([P1, P2, P3]);

const programs = runtime.getPrograms();

console.log(programs);
// runtime.run();
