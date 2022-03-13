import { analyze } from "../src/utils/analyze";

const PROGRAM = `%
O1234 (example)
(header)

M107
T43 M6
G0 G90 G55
M30
%`;

analyze(PROGRAM, (err, result) => {
  if (err) {
    console.log(err);
  }

  console.log("================== ANALYSIS =====================");
  console.log(result);
});
