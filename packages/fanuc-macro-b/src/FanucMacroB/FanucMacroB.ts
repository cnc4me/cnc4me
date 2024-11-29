import { extractOffsets } from "../memory";
import { range } from "../utils";
import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroParser } from "./MacroParser";

import type { MacroLexerError } from "../errors/lexer";
import type { MacroParserError } from "../errors/parser";
import type { ErrorProducer, MacroValueArray, ParsedLineData } from "../types";
import type { IToken } from "chevrotain";

/**
 * This class wraps the functionality for:
 * tokenizing -> parsing -> interpreting
 * @todo use this instead of loading the MacroRuntime with the individual pieces
 */
export class FanucMacroB
  implements ErrorProducer<MacroLexerError | MacroParserError>
{
  #tokens: IToken[];

  lexer: MacroLexer;
  parser: MacroParser;
  interpreter: MacroInterpreter;

  options = {
    debug: false
  };

  /**
   * @TODO fix this flag here, move it global?
   */
  constructor(options?: Partial<{ debug: boolean }>) {
    this.#tokens = [];
    this.lexer = new MacroLexer();
    this.parser = new MacroParser();
    this.interpreter = new MacroInterpreter();
    if (options?.debug) {
      this.options.debug = true;
    }
  }

  get memory() {
    return this.interpreter.getMemory();
  }

  /**
   * If either the {@link MacroLexer} or {@link MacroParser} encountered errors
   * then this property will be `true`
   */
  get hasErrors() {
    return this.lexer.hasErrors || this.parser.hasErrors;
  }

  getTokens() {
    return this.#tokens;
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
  getCurrentMemory(opts?: Partial<GetMemoryOptions>): Record<number, number> {
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
   * Tokenize a string of gcode
   */
  tokenize(input: string): IToken[] {
    return this.lexer.tokenize(input);
  }

  /**
   * Invoke the {@link MacroInterpreter} starting from `lines()`
   */
  eval(input: string): EvalResult {
    this._tokenizeAndLoadParser(input);
    const cst = this.parser.Lines();
    return {
      error: null,
      result: this.interpreter.Lines(cst?.children)
    };
  }

  /**
   * Run {@link extractOffsets} on the results from #eval()
   */
  evalG10(input: string) {
    const { error, result } = this.eval(input);
    return {
      error,
      result: extractOffsets(result[0])
    };
  }

  /**
   * Invoke the {@link MacroInterpreter} starting from `expression()`
   */
  evalExpr(input: string) {
    this._tokenizeAndLoadParser(input);
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
    this._tokenizeAndLoadParser(input);
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
    this._tokenizeAndLoadParser(input);
    const cst = this.parser.Program();
    return {
      error: null,
      // @ts-expect-error program type is wonky
      result: this.interpreter.Program(cst?.children) // @todo fix this type error
    };
  }

  /**
   * Invoke the {@link MacroInterpreter} starting from `VariableAssignment()`
   */
  evalVariableAssignment(input: string) {
    this._tokenizeAndLoadParser(input);
    const cst = this.parser.VariableAssignment();
    return {
      error: null,
      // @ts-expect-error additionExpression is missing?
      result: this.interpreter.VariableAssignment(cst?.children) // @todo fix this type error
    };
  }

  private _tokenizeAndLoadParser(input: string) {
    this.#tokens = this.tokenize(input);
    if (this.options.debug) {
      //@TODO this is hacky to find a bug, log better
      console.log("=============== MacroInterpreter.#tokens ===============");
      console.log(
        this.#tokens.map(t => `<${t.tokenType.name} image="${t.image}">`)
      );
    }
    this.parser.setInput(this.#tokens);
  }
}

type EvalResult = {
  error: Error[] | null;
  result: ParsedLineData[];
};

type GetMemoryOptions = {
  range: [start: number, end: number];
};
