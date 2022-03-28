import { AddressInsight } from "../lib";
import { InterpretedProgram, LexingErrors, ParsingErrors } from "../types";
import { createToolchain } from "./createToolchain";

interface ProgramAnalisys {
  result: InterpretedProgram;
  insights: Record<string, AddressInsight>;
  parseErrors: ParsingErrors;
  lexingErrors: LexingErrors;
}

/**
 * Analyze a text in the context of being a valid NC program
 */
export function program(input: string): ProgramAnalisys {
  const { parser, lexer, interpreter } = createToolchain();

  const { tokens, errors } = lexer.tokenize(input);

  parser.input = tokens;

  const cst = parser.program();

  const result = interpreter.visit(cst) as InterpretedProgram;

  return {
    result,
    insights: interpreter.Insights,
    lexingErrors: errors,
    parseErrors: parser.errors
  };
}
