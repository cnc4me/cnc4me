import { createToken } from "./token.utils";

// @TODO this should be more complex and handle the variable number capture?
// @TODO have it evaluate expressions into var numbers?
export const Var = createToken({
  name: "Var",
  pattern: "#"
});

export const Dot = createToken({
  name: "Dot",
  pattern: "."
});

export const Percent = createToken({
  name: "Percent",
  pattern: "%"
});

export const Newline = createToken({
  name: "Newline",
  pattern: "\n"
});

export const SemiColon = createToken({
  name: "SemiColon",
  pattern: ";"
});

// export const Comma = createToken({
//   name: "Comma",
//   pattern: ",",
//   categories
// });
