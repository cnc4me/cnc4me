import { createToken } from "chevrotain";

import { BooleanOperator } from "./common";

const SHARED_CONFIG = {
  group: "Grouping",
  categories: BooleanOperator
};

export const EqualTo = createToken({
  name: "EqualTo",
  pattern: /EQ/,
  ...SHARED_CONFIG
});

export const NotEqualTo = createToken({
  name: "NotEqualTo",
  pattern: /NE/,
  ...SHARED_CONFIG
});

export const LessThan = createToken({
  name: "LessThan",
  pattern: /LT/,
  ...SHARED_CONFIG
});

export const LessThanOrEq = createToken({
  name: "LessThanOrEq",
  pattern: /LE/,
  ...SHARED_CONFIG
});

export const GreaterThan = createToken({
  name: "GreaterThan",
  pattern: /GT/,
  ...SHARED_CONFIG
});

export const GreaterThanOrEq = createToken({
  name: "GreaterThanOrEq",
  pattern: /GE/,
  ...SHARED_CONFIG
});
