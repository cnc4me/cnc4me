import { createToken, Lexer } from "chevrotain";

// export const Identifier = createToken({
//   name: "Identifier",
//   pattern: /[A-Z]\w+/
// });

export const Keyword = createCategory("Keyword");
export const Grouping = createCategory("Grouping");
export const NumericValue = createCategory("NumericValue");
export const BooleanOperator = createCategory("BooleanOperator");
export const AdditionOperator = createCategory("AdditionOperator");
export const ControlFlowKeyword = createCategory("ControlFlowKeyword");
export const MultiplicationOperator = createCategory("MultiplicationOperator");

function createCategory(name: string) {
  return createToken({
    name,
    group: "Category",
    pattern: Lexer.NA
  });
}
