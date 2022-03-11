import { createToken, Lexer } from "chevrotain";

const createCategory = (name: string) =>
  createToken({
    name,
    pattern: Lexer.NA
  });

export const Brackets = createCategory("Brackets");
export const NumericValue = createCategory("NumericValue");
export const BooleanOperator = createCategory("BooleanOperator");
export const AdditionOperator = createCategory("AdditionOperator");
export const ControlFlowKeyword = createCategory("ControlFlowKeyword");
export const MultiplicationOperator = createCategory("MultiplicationOperator");
