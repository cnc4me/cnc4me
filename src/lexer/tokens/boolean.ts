import * as chevrotain from "chevrotain";

const { Lexer, createToken } = chevrotain;

export const BooleanOperator = createToken({
  name: "BooleanOperator",
  pattern: Lexer.NA
});

export const Equal = createToken({
  name: "Equal",
  pattern: /EQ/,
  categories: BooleanOperator
});

export const NotEqual = createToken({
  name: "NotEqual",
  pattern: /NE/,
  categories: BooleanOperator
});

export const LessThan = createToken({
  name: "LessThan",
  pattern: /LT/,
  categories: BooleanOperator
});

export const LessThanOrEq = createToken({
  name: "LessThanOrEq",
  pattern: /LE/,
  categories: BooleanOperator
});

export const GreaterThan = createToken({
  name: "GreaterThan",
  pattern: /GT/,
  categories: BooleanOperator
});

export const GreaterThanOrEq = createToken({
  name: "GreaterThanOrEq",
  pattern: /GE/,
  categories: BooleanOperator
});
