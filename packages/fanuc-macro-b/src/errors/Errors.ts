import * as LexerErrors from "./lexer";
import * as ParserErrors from "./parser";
import * as RuntimeErrors from "./runtime";

export const Errors = {
  ...LexerErrors,
  ...ParserErrors,
  ...RuntimeErrors
};
