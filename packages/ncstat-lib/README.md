## [@ncstat/parser](https://github.com/kevinkhill/ncstat/tree/main/packages/ncstat-parser)
[![NPM](https://nodei.co/npm/@ncstat/parser.png)](https://npmjs.org/package/@ncstat/parser)
![NPM License](https://img.shields.io/npm/l/@ncstat/parser) ![Github Stars](https://img.shields.io/github/stars/kevinkhill/ncstat?style=social) ![Github Forks](https://img.shields.io/github/forks/kevinkhill/ncstat?style=social)

A tool lexing and parsing NC files for the purpose of static analysis

## Try it out

`npm i --save @ncstat/parser`

### or

`yarn add @ncstat/parser`

## NcLexer

```javascript
const { NcLexer } = require("@ncstat/parser");

const lexer = new NcLexer();
const sample = `%
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

for (const token of lexer.tokens(sample)) {
  console.log(token);
}

//
// <type: PRG_DELIM, value: "%", text: "%", pos: 0, line: 1, column: 1>
// <type: NEWLINE, value: "\n", text: "\n", pos: 1, line: 1, column: 2>
// <type: PRG_NUMBER, value: 1234, text: "O1234", pos: 2, line: 2, column: 1>
// <type: COMMENT, value: "TEST PROGRAM", text: "(TEST PROGRAM)", pos: 8, line: 2, column: 7>
// <type: NEWLINE, value: "\n", text: "\n", pos: 22, line: 2, column: 21>
// <type: NEWLINE, value: "\n", text: "\n", pos: 23, line: 3, column: 1>
// <type: ADDRESS, value: 43, text: "N43", pos: 24, line: 4, column: 1>
// <type: COMMENT, value: "1/4\" [.250\"] DRILL", text: "( 1/4\" [.250\"] DRILL )", pos: 28, line: 4, column: 5>
// <type: NEWLINE, value: "\n", text: "\n", pos: 50, line: 4, column: 27>
// <type: ADDRESS, value: 43, text: "T43", pos: 51, line: 5, column: 1>
// <type: M_CODE, value: {"prefix":"M","value":6}, text: "M6", pos: 55, line: 5, column: 5>
// ...
```
