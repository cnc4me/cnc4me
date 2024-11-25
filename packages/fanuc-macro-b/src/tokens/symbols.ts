import { ControlFlowKeyword } from "./token.categories";
import { createToken } from "./token.utils";

const categories = ControlFlowKeyword;

/**
 * @TODO this should be more complex and handle the variable number capture?
 * @TODO have it evaluate expressions into var numbers?
 */
export const Var = createToken({
  name: "Var",
  pattern: "#",
  categories
});

export const Dot = createToken({
  name: "Dot",
  pattern: ".",
  categories
});

export const Equals = createToken({
  name: "Equals",
  pattern: "=",
  categories
});

export const Percent = createToken({
  name: "Percent",
  pattern: "%",
  categories
});

export const Newline = createToken({
  name: "Newline",
  pattern: "\n",
  categories
});

export const SemiColon = createToken({
  name: "SemiColon",
  pattern: ";",
  categories
});

// export const Comma = createToken({
//   name: "Comma",
//   pattern: ",",
//   categories
// });
