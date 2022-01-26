import { interpret, validate } from "../src/utils";
import { LineCstNode } from "../types/fanuc";

const { result, parseErrors } = validate(`%
O1234 (VARS)

#2=14
#1=0.005
#26=-.2
#9=100.

IF[#142 GT #3] GOTO914

G65 P9810 X[#24 + #21] F#9 M1.
N914
#500 = 12.432
M30
%`);

if (parseErrors.length > 0) {
  parseErrors.forEach(e => console.log(e));
}

const lines = Array.from<LineCstNode>(result.lines[0].children.line);
console.log(lines);

for (const line of lines) {
  if (line.children?.variableAssignment) {
    const va = line.children.variableAssignment[0];
    const left = va.children.lhs;
    const right = va.children.rhs;

    const macroVar = left[0].children.Integer[0].image;

    if (right) {
      const { children } = right[0];
      if (children) {
        const value = children["NumericLiteral"][0].children?.NumericValue;
        const num = parseFloat(value[0].image);

        console.log("#", macroVar, "=", num);
      }
    }
  }
}
