/* eslint-disable @typescript-eslint/no-unsafe-call */
import { interpreter } from "../lib/MacroInterpreter";
import { parse } from "./parse";

/**
 * Run the full interpreter and generate CST
 */
export function interpret<T>(text: string, rule: string) {
  const { parser, lexResult } = parse(text);

  // @ts-expect-error blah
  const cst = parser[rule]();

  const result: T = interpreter.visit(cst);

  return {
    result,
    parser,
    lexResult,
    interpreter,
    parseErrors: parser.errors,
    macros: interpreter.getMacros()
  };
}
