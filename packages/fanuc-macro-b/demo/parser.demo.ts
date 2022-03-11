import { validate } from "../src/utils";

const PROGRAM = `%
O1234 (example)
(header)

M107
T43 M6
G0 G90 G55
M30
%`;

const { result, parseErrors } = validate(PROGRAM);

console.log(result, parseErrors);
