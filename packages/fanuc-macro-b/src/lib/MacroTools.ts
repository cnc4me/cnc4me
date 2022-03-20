import type { MacroTools } from "../types";
import { MacroInterpreter, MacroLexer, MacroParser } from ".";

export function MacroTools(): MacroTools {
  const lexer = new MacroLexer();
  const parser = new MacroParser();
  const interpreter = new MacroInterpreter();

  return {
    lexer,
    parser,
    interpreter
  };
}
