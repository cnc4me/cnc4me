import { Address } from "./addresses";
import { createCategory, createToken, Keyword } from "./token.utils";

export const BooleanOperator = createCategory("BooleanOperator");

const sharedConfig = {
  longer_alt: Address,
  categories: [BooleanOperator, Keyword],
};

export const EqualTo = createToken({
  name: "EqualTo",
  pattern: /EQ/,
  ...sharedConfig,
});

export const NotEqualTo = createToken({
  name: "NotEqualTo",
  pattern: /NE/,
  ...sharedConfig,
});

export const LessThan = createToken({
  name: "LessThan",
  pattern: /LT/,
  ...sharedConfig,
});

export const LessThanOrEq = createToken({
  name: "LessThanOrEq",
  pattern: /LE/,
  ...sharedConfig,
});

export const GreaterThan = createToken({
  name: "GreaterThan",
  pattern: /GT/,
  ...sharedConfig,
});

export const GreaterThanOrEq = createToken({
  name: "GreaterThanOrEq",
  pattern: /GE/,
  ...sharedConfig,
});

export const Or = createToken({
  name: "Or",
  pattern: /OR/,
  ...sharedConfig,
});

export const And = createToken({
  name: "And",
  pattern: /AND/,
  ...sharedConfig,
});

export const XOr = createToken({
  name: "XOr",
  pattern: /XOR/,
  ...sharedConfig,
});
