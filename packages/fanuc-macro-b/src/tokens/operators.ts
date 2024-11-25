import { Decimal } from "./numbers";
import { AdditionOperator, MultiplicationOperator } from "./token.categories";
import { createToken } from "./token.utils";

export const Plus = createToken({
  name: "Plus",
  pattern: "+",
  categories: AdditionOperator
});

export const Minus = createToken({
  name: "Minus",
  pattern: "-",
  longer_alt: [Decimal],
  // This will make the AdditionExpression handle subtraction too
  categories: AdditionOperator
});

export const Product = createToken({
  name: "Product",
  pattern: "*",
  categories: MultiplicationOperator
});

export const Divide = createToken({
  name: "Divide",
  pattern: "/",
  // This will make the MultiplicationExpression handle division too
  categories: MultiplicationOperator
});

export const Modulus = createToken({
  name: "Modulus",
  pattern: /MOD/,
  // This will make the MultiplicationExpression handle modulus too
  categories: MultiplicationOperator
});
