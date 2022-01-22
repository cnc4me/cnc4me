import { createToken, Lexer } from "chevrotain";

export const Brackets = createToken({
  name: "Brackets",
  pattern: Lexer.NA
});

export const BooleanOperator = createToken({
  name: "BooleanOperator",
  pattern: Lexer.NA
});

export const ControlFlowKeyword = createToken({
  name: "ControlFlowKeyword",
  pattern: Lexer.NA
});

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
