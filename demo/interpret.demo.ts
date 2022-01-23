import { interpret } from "../src/utils";

const { lexingResult, parseErrors, value } = interpret(`%
O7999 (MATERIAL VERIFICATION V5)

G10 G90 L2 P1 X1.2 Y3.4 Z5.6 B7.8

N1
T47M6
S5000M3
G0G90G54.1X1.2Y2.3

#2=14
#1=0.005
#26=-.2 ( PROBE DEPTH )
#9=100. ( PROTECTED POSITIONING FEEDRATE )

G65 P9811 Z#18
IF[#142 GT #3] GOTO914

G65 P9810 X[#24 + #21] F#9 M1.
N914
M30
%`);

if (parseErrors.length > 0) {
  parseErrors.forEach(e => console.log(e));
}

console.log(value);
