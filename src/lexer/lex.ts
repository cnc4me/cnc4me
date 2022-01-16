import { ILexingResult } from "chevrotain";

import MacroLexer from "./MacroLexer";

export default function lex(inputText: string): ILexingResult {
  const lexingResult = MacroLexer.tokenize(inputText);

  // if (lexingResult.errors.length > 0) {
  //   throw Error("Sad Sad Panda, lexing errors detected");
  // }

  return lexingResult;
}
