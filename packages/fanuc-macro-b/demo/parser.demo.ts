import { parse } from "../src/utils";

const PROGRAM = `%
O1234 (example)
(header)

G10 L2 P1 X1.23 Y4.56 Z7.89 B0.

( DRILL FOR M5 X 0.8 ROLL TAP )
M107
T43 M6
M01 ( #14 [.182"] DRILL, CARB, TSC )
G0 G90 G55
M22
B90.
M21
M52 ( THRU TOOL AIR ON )
G4 X6.
M53 ( THRU TOOL AIR OFF )
M30
%`;

const { parser, lexResult } = parse(PROGRAM);

const ProgramNumberLine = parser.ProgramNumberLine();

console.log({ ProgramNumberLine, lexResult });
