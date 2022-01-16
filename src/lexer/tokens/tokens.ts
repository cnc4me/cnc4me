import { createToken, Lexer } from "chevrotain";

import { AltTokenFactory, createCategory } from "../utils";

export const AdditionOperator = createCategory("AdditionOperator");
export const MultiplicationOperator = createCategory("MultiplicationOperator");

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

export const Address = createToken({
  name: "Address",
  pattern: /[A-Z]/
});

export const NumberLiteral = createToken({
  name: "NumberLiteral",
  pattern: /[-]?(?:[0-9]*[.])?[0-9]+/
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

export const Gcode = createToken({
  name: "G_Code",
  pattern: /G\d+/,
  longer_alt: Address,
  group: "gcodes"
});

const AddressToken = AltTokenFactory(Address);

export const Mcode = AddressToken("M_Code", /M\d+(\.)?/);
export const LineNumber = AddressToken("LineNumber", /N\d+/);
export const ProgramNumber = AddressToken("ProgramNumber", /[O|:]\d+/);
export const ExtendedOffset = AddressToken("ExtendedOffset", /G54\.\d/);

export const Goto = AddressToken("Goto", /GOTO/);
export const If = AddressToken("ControlFlow_If", /IF/);
export const Then = AddressToken("ControlFlow_Then", /THEN/);
export const Do = AddressToken("ControlFlow_Do", /DO/);
export const While = AddressToken("ControlFlow_While", /WHILE/);

export const PowerFunc = createToken({
  name: "PowerFunc",
  pattern: /POW/,
  longer_alt: Address
});

export const BuiltinFn = createToken({
  name: "BuiltInFunction",
  pattern: /SIN|ASIN|COS|ACOS|TAN|ATAN|SQRT|ABS|BIN|BCD|ROUND|FIX|FUP|LN|EXP/,
  longer_alt: Address
});

export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /[\s\t\r]+/,
  group: Lexer.SKIPPED
});

export const Comment = createToken({
  name: "Comment",
  pattern: /\(\s*(.+?)\s*\)/,
  group: "comments",
  start_chars_hint: ["("]
});
