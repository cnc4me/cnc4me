import { CncMachine, MacroRuntime } from "../src";

// Setup a Machine for simulation
const verticalMill = new CncMachine({
  limits: {
    X: 1200, // Symmetric Min / Max
    Y: { min: -400, max: 500 }, // Object to be explicit
    Z: [-1200, 200] // Min / Max as a tuple
  },
  // Simulate axis movements with a delay in move commands
  axisTravelTimeout: 20 //ms
});

// Pass the machine into the Runtime for simulation
const runtime = new MacroRuntime({ machine: verticalMill });

// Listen for any errors that bubble from the
// Lexer, Parser, Interpreter, and Runtime
runtime.onError(err => {
  console.error(err);
});

const demo = `%
O1000
T1 M6
#1=5
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

runtime.Memory.subscribe(update => {
  console.log(update);
});

// runtime.on("INTERPRETER:LINE", x => {
//    console.log(x);
// });

runtime.run();
