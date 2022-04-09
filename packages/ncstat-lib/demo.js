const { NcParser, getDefinition } = require(".");

const parser = new NcParser({ debug: true });

const input = `%
O1234 (TEST PROGRAM)

N43 ( 1/4" [.250"] DRILL )
T43 M6
G00 G90 G54 X.75 Y.19
S2000 M3
G43 H1 Z1.
G98 G81 Z-.5631 R.1 F83.96
X5.
G80
M30
%`;

const program = parser.parse(input);

console.log(`\nIdentifying "G" codes within this sample`);
console.log(`\n${input}\n`);
console.log(`Code | Group          | Description`);
console.log(`-----+----------------+-----------------------`);
program.tokens
  .filter(t => t.prefix === "G")
  .forEach(token => {
    const def = getDefinition(token.text);
    const code = token.text.padStart(3, " ");
    const group = (def.group || "").padEnd(14, " ");

    console.log(` ${code} | ${group} | ${def.desc}`);
  });
