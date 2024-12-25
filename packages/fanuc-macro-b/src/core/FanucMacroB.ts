import { range } from "../utils/common";
import { Debuggers } from "../utils/debug";
import { extractOffsets } from "../utils/extractOffsets";
import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroParser } from "./MacroParser";

import type { MacroLexerError } from "../errors/lexer";
import type { MacroParserError } from "../errors/parser";
import type { ErrorProducer, IParsedLineData, MacroValueArray } from "../types";

export class FanucMacroB
  implements ErrorProducer<MacroLexerError | MacroParserError>
{
  lexer: MacroLexer;
  parser: MacroParser;
  interpreter: MacroInterpreter;

  options = {
    debug: false
  };

  #debug = Debuggers.Main;

  /**
   * @TODO fix this flag here, move it global?
   */
  constructor(options?: Partial<{ debug: boolean }>) {
    this.lexer = new MacroLexer();
    this.parser = new MacroParser();
    this.interpreter = new MacroInterpreter();
    if (options?.debug) {
      this.options.debug = true;
    }
  }

  get memory() {
    return this.interpreter.memory;
  }

  /**
   * If either the {@link MacroLexer} or {@link MacroParser} encountered errors
   * then this property will be `true`
   */
  get hasErrors() {
    return this.lexer.hasErrors || this.parser.hasErrors;
  }

  /**
   * Clear internal token list, reset the Lexer and Parser, and clear the Interpreter memory
   */
  reset() {
    this.#debug("resetting");
    this.lexer.reset();
    this.parser.reset();
    this.interpreter.reset();
  }

  /**
   * Retrieve the internal token list
   */
  getTokens() {
    return this.parser.input;
  }

  getErrors() {
    return [
      ...this.lexer.getErrors(), //
      ...this.parser.getErrors() //
    ];
  }

  /**
   * Returns an object where the keys are variable register numbers
   * and the value is it's currently set value.
   */
  getSetMemoryRegisters(
    opts?: Partial<GetMemoryOptions>
  ): Record<number, number> {
    if (opts?.range) {
      const entries: MacroValueArray = [];
      range(...opts.range).forEach(register => {
        entries.push([register, this.memory.read(register)]);
      });
      return Object.fromEntries(entries);
    }
    return this.memory.toObject();
  }

  /**
   * Invoke the {@link MacroInterpreter} starting from `lines()`
   */
  eval(input: string): EvalResult {
    this.tokenizeAndLoadParser(input);
    const cst = this.parser.Lines();
    const result = this.interpreter.Lines(cst?.children);
    return { error: null, result };
  }

  /**
   * Run {@link extractOffsets} on the results from #eval()
   */
  evalG10(input: string) {
    const { error, result } = this.eval(input);
    // this.#debug(result);
    return {
      error,
      result: extractOffsets(result[0])
    };
  }

  /**
   * Invoke the {@link MacroInterpreter} starting from `expression()`
   */
  evalExpr(input: string) {
    this.tokenizeAndLoadParser(input);
    const cst = this.parser.Expression();
    return {
      error: null,
      // @ts-expect-error additionExpression is missing?
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      result: this.interpreter.Expression(cst?.children) // @todo fix this type error
    };
  }

  /**
   * Invoke the {@link MacroInterpreter} starting from `expression()`
   */
  evalFunctionExpr(input: string) {
    this.tokenizeAndLoadParser(input);
    const cst = this.parser.FunctionExpression();
    return {
      error: null,
      // @ts-expect-error additionExpression is missing?
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      result: this.interpreter.FunctionExpression(cst?.children) // @todo fix this type error
    };
  }

  /**
   * Invoke the {@link MacroInterpreter} starting from `program()`
   */
  evalProgram(input: string) {
    this.tokenizeAndLoadParser(input);
    const cst = this.parser.Program();
    return {
      error: null,
      // @ts-expect-error program type is wonky
      result: this.interpreter.Program(cst?.children) // @todo fix this type error
    };
  }

  tokenizeAndLoadParser(input: string) {
    const tokens = this.lexer.tokenize(input);
    this.parser.setInput(tokens);
    if (this.options.debug) {
      //@TODO this is hacky to find a bug, log better
      console.log("=============== MacroInterpreter.#tokens ===============");
      console.log(tokens.map(t => `<${t.tokenType.name} image="${t.image}">`));
    }
  }
}

type EvalResult = {
  error: Error[] | null;
  result: IParsedLineData[];
};

type GetMemoryOptions = {
  range: [start: number, end: number];
};
