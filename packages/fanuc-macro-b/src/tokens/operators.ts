import { createToken } from "./_helpers";
import { AdditionOperator, MultiplicationOperator } from "./common";
import { Decimal } from "./numbers";

export const Plus = createToken({
  name: "Plus",
  pattern: "+",
  categories: AdditionOperator
});

export const Minus = createToken({
  name: "Minus",
  pattern: "-",
  longer_alt: [Decimal],
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
