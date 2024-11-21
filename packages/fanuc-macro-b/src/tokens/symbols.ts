import { createToken } from "chevrotain";

import { ControlFlowKeyword } from "./common";

const SHARED_CONFIG = {
  categories: ControlFlowKeyword
};

/**
 * @todo this should be more complex and handle the variable number capture?
 * @todo have it evaluate expressions into var numbers?
 */
export const Var = createToken({
  name: "Var",
  pattern: "#",
  ...SHARED_CONFIG
});

export const Dot = createToken({
  name: "Dot",
  pattern: ".",
  ...SHARED_CONFIG
});

// export const Comma = createToken({
//   name: "Comma",
//   pattern: ",",
//   ...SHARED_CONFIG
// });

export const Equals = createToken({
  name: "Equals",
  pattern: "=",
  ...SHARED_CONFIG
});

export const Percent = createToken({
  name: "Percent",
  pattern: "%",
  ...SHARED_CONFIG
});

export const Newline = createToken({
  name: "Newline",
  pattern: "\n",
  ...SHARED_CONFIG
});

export const SemiColon = createToken({
  name: "SemiColon",
  pattern: ";",
  ...SHARED_CONFIG
});
