import { matchProgramNumber } from "../src/utils";

const code = `%
O1234     ( TESTING )
M107
G0 G90 G55
M30
%`;

matchProgramNumber(code, {
  MATCH: result => console.log(result),
  NOMATCH: error => console.error("ERROR", error)
});
