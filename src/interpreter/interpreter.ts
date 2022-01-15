import MacroInterpreter from "./MacroInterpreter";
import MacroLexer from "../lexer/MacroLexer";
import { parser } from "../parser/MacroParser";

// We only need a single interpreter instance because our interpreter has no state.
export const interpreter = new MacroInterpreter();

export default function interpret(text: string) {
  // 1. Tokenize the input.
  const lexResult = MacroLexer.tokenize(text);

  // 2. Parse the Tokens vector.
  parser.input = lexResult.tokens;
  const cst = parser.program();

  // 3. Perform semantics using a CstVisitor.
  // Note that separation of concerns between the syntactic analysis (parsing) and the semantics.
  const value = interpreter.visit(cst);

  return {
    value,
    lexResult,
    parseErrors: parser.errors
  };
}
