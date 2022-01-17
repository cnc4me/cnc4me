import { createToken, Lexer } from "chevrotain";

export const NumericValue = createToken({
  name: "NumericValue",
  pattern: Lexer.NA
});

export const AdditionOperator = createToken({
  name: "AdditionOperator",
  pattern: Lexer.NA
});

export const MultiplicationOperator = createToken({
  name: "MultiplicationOperator",
  pattern: Lexer.NA
});
