import { MacroInterpreter, MacroLexer, MacroParser } from "../lib";
import type { MacroToolchain } from "../types";

export function createToolchain(): MacroToolchain {
  const lexer = new MacroLexer();
  const parser = new MacroParser();
  const interpreter = new MacroInterpreter();

  function analyze(text: string) {
    const { tokens } = lexer.tokenize(text);

    parser.input = tokens;

    const cst = parser.program();

    return interpreter.visit(cst) as ReturnType<MacroInterpreter["program"]>;
  }

  return {
    lexer,
    parser,
    interpreter,
    analyze
  };
}
