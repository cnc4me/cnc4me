import MacroLexer from "../lexer/MacroLexer";
import { parser } from "../parser/MacroParser";
import { interpreter } from "./MacroInterpreter";

export default function interpret(text: string) {
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
