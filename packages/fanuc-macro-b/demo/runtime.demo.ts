import { MacroRuntime } from "../src";

const runtime = new MacroRuntime();

runtime.onError(err => {
  console.error("RUNTIME ERROR", err);
});

const demo = `%
O1000
T1 M6
G0 G90 G40 G21 G17 G94 G80
G54 X-75 Y-25 S500 M3  (Start Point)
G43 Z100 H1
Z5
G1 Z-20 F100
X-50 M8               (Position 1)
Y0                    (Position 2)
X0 Y50                (Position 3)
X50 Y0                (Position 4)
X0 Y-50               (Position 5)
X-50 Y0               (Position 6)
Y25                   (Position 7)
X-75                  (Position 8)
G0 Z100
M30
%`;

runtime.loadProgram(demo, { setActive: true });

// console.log(runtime.activeProgram);

// const program = runtime.getActiveProgram();
// console.log(program);

runtime.run(line => {
  console.log(line);
});
