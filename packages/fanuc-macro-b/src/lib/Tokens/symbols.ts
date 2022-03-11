import { createToken } from "chevrotain";

import { AdditionOperator, MultiplicationOperator } from "./categories";

export const Plus = createToken({
  name: "Plus",
  pattern: "+",
  categories: AdditionOperator
});

export const Minus = createToken({
  name: "Minus",
  pattern: "-",
  categories: AdditionOperator
});

export const Divide = createToken({
  name: "Divide",
  pattern: "/",
  categories: MultiplicationOperator
});

export const Product = createToken({
  name: "Product",
  pattern: "*",
  categories: MultiplicationOperator
});

export const Var = createToken({
  name: "Var",
  pattern: "#"
});

export const Equals = createToken({
  name: "Equals",
  pattern: "="
});

export const Percent = createToken({
  name: "Percent",
  pattern: "%"
});

export const Dot = createToken({
  name: "Dot",
  pattern: "."
});

export const Comma = createToken({
  name: "Comma",
  pattern: ","
});

export const Newline = createToken({
  name: "Newline",
  pattern: "\n"
});
