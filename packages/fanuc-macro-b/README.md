# Fanuc Macro B

A Lexer, Parser, and Interpreter for Fanuc Macro B NC files

![Typescript Logo](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Eslint Logo](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier Logo](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
[![Netlify Status](https://api.netlify.com/api/v1/badges/29c5c88a-09da-42ae-96a6-e0a9592844a2/deploy-status)](https://app.netlify.com/sites/fanuc-macro-b/deploys)
![Jest Status](https://github.com/cnc4me/fanuc-macro-b/actions/workflows/main.yml/badge.svg)

## Example

```javascript
import { lines } from "fanuc-macro-b";

const G_CODE = `
#1=100*[5/25]
#2=10/2+3
#3=10/[2+3]
#4=1+2+3+4+5
#5=[20-5]*2
#6=20-[5*2]
#7=2*3+5*2
#8=2*[3+5]*2
#9=[1+[2*[3]]]+[[6*2]+2]
#10=5+2*3+5*[2+2]*2+4
`;

const { interpreter } = lines(G_CODE);

console.log(interpreter.Memory.toArray());
// returns:
//
// [
//   [1, 20],
//   [2, 8],
//   [3, 2],
//   [4, 15],
//   [5, 30],
//   [6, 10],
//   [7, 16],
//   [8, 32],
//   [9, 21],
//   [10, 55]
// ]
```
