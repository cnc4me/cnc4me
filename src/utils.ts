import { ILexingResult, IToken, tokenMatcher } from "chevrotain";

import { interpreter } from "./MacroInterpreter";
import MacroLexer from "./MacroLexer";
import { parser } from "./MacroParser";
import { Comment } from "./tokens/tokens";

export function unwrapComment(token: IToken) {
  if (tokenMatcher(token, Comment)) {
    //
  }
}

export function lex(inputText: string): ILexingResult {
  const lexingResult = MacroLexer.tokenize(inputText);

  if (lexingResult.errors.length > 0) {
    throw Error("Sad Sad Panda, lexing errors detected");
  }

  return lexingResult;
}

export function interpret(text: string) {
  // 1. Tokenize the input.
  const lexResult = MacroLexer.tokenize(text);

  // 2. Parse the Tokens vector.
  parser.input = lexResult.tokens;
  const cst = parser.Program();

  // 3. Perform semantics using a CstVisitor.
  // Note that separation of concerns between the syntactic analysis (parsing) and the semantics.
  const value = interpreter.visit(cst);

  return {
    value,
    lexResult,
    parseErrors: parser.errors
  };
}
