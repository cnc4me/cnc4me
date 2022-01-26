import { interpret } from "../src/utils";

const code = `#2=14`;

const { result, parseErrors } = interpret(code, "variableAssignment");

if (parseErrors.length > 0) {
  parseErrors.forEach(e => console.log(e));
}

console.log(result);

// for (const line of lines) {
//   if (line.children?.variableAssignment) {
//     const va = line.children.variableAssignment[0];
//     const left = va.children.lhs;
//     const right = va.children.rhs;

//     const macroVar = left[0].children.Integer[0].image;

//     if (right) {
//       const { children } = right[0];
//       if (children) {
//         const value = children["NumericLiteral"][0].children?.NumericValue;
//         const num = parseFloat(value[0].image);

//         console.log("#", macroVar, "=", num);
//       }
//     }
//   }
// }
