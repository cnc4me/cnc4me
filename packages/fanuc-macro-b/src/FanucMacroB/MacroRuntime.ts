import { IToken } from "chevrotain";
import Emittery from "emittery";

import { InvalidProgramNumber, ProgramNumberNotFound } from "../errors/runtime";
import { InsightCollection } from "../lib/Insights";
import { ProgramNumber } from "../lib/ProgramNumber";
import { isLexingError, isParsingError } from "../utils";
import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroMemory } from "./MacroMemory";
import { MacroParser } from "./MacroParser";

import type {
  ErrorProducer,
  InterpretedProgram,
  MacroCombinedError,
  MacroRuntimeInitOptions,
  ParsedLineData,
  ProgramLoadOptions,
  RuntimeEvents,
  RuntimeOutput
} from "../types";
import type { CST } from "../types/CST";

/*
 * MacroRuntime Class to hold multiple programs in memory
 */
export class MacroRuntime implements ErrorProducer<MacroCombinedError> {
  private _lexer: MacroLexer;
  private _parser: MacroParser;
  private _interpreter: MacroInterpreter;

  private _events = new Emittery<RuntimeEvents>();
  private _programs: Record<number, string> = {};
  private _activeProgram: number | null = null;

  constructor(opts?: Partial<MacroRuntimeInitOptions>) {
    // debug("initializing");
    this._events = new Emittery<RuntimeEvents>();
    this._lexer = new MacroLexer();
    this._parser = new MacroParser();
    this._interpreter = new MacroInterpreter();
  }

  get Lexer(): MacroLexer {
    return this._lexer;
  }

  get Parser(): MacroParser {
    return this._parser;
  }

  get Interpreter(): MacroInterpreter {
    return this._interpreter;
  }

  get Memory(): MacroMemory {
    return this._interpreter.getMemory();
  }

  get hasErrors() {
    return this._lexer.hasErrors || this._parser.hasErrors;
  }

  getInsights(): InsightCollection {
    return this._interpreter.getInsights();
  }

  /**
   * Reset the runtime.
   */
  reset(): void {
    this._programs = {};
    this._activeProgram = NaN;
    this._parser.reset();
    this._interpreter.getMemory().reset();
  }

  /**
   * Main entry point to the runtime.
   */
  run(): RuntimeOutput {
    const beginExec = new Date();

    this._tokenizeActiveProgram();

    const programCst = this._parser.Program() as unknown as CST.ProgramCstNode;

    /**
     * @TODO ERROR HANDLING!!!!
     */
    if (this._parser.errors.length > 0) {
      // void this._events.emit("error", this.Parser.errors);
    }

    const result = this._interpreter.Program(programCst.children);

    return {
      beginExec,
      result
    } as RuntimeOutput;
  }

  /**
   * Register a function to handle errors that occur in the runtime.
   */
  onError(handler: (eventData: MacroCombinedError) => void) {
    return this._events.on("error", handler);
  }

  /**
   * Retrieve Parser and Lexer errors
   * @deprecated use the getErrors method on FanucMacroB when implemented in the class
   */
  getErrors() {
    return [
      ...this._parser.getErrors(), //
      ...this._lexer.getErrors()
    ];
  }

  /**
   * Retrieve a record of errors
   */
  getErrorMessages(): string[] {
    return this.getErrors().map(err => {
      if (isLexingError(err) || isParsingError(err)) {
        return err.message;
      }
      return err;
    });
  }

  /**
   * Run the {@link MacroParser} on the active program.
   */
  evalProgram(code: string): InterpretedProgram {
    this._lexAndLoadParser(code);
    // this._tokenizeActiveProgram();

    const programCst = this._parser.Program() as unknown as CST.ProgramCstNode;

    return this._interpreter.Program(programCst.children);
  }

  /**
   * Analyze a text in the context of being a valid NC program
   * @TODO this can fail and cst.children is undefined
   * @deprecated
   */
  evalLines(code: string): ParsedLineData[] {
    this._lexAndLoadParser(code);

    const cst = this._parser.Lines();

    return this._interpreter.Lines(cst.children);
  }

  /**
   * why?
   */
  // readMemoryRegister(num: number) {
  //   return this._mem.read(num);
  // }

  /**
   * Check if a program has been loaded and exists in the runtime.
   */
  programIsLoaded(programNumber: MacroRuntime["_activeProgram"]): boolean {
    if (programNumber === null) return false;
    return !!this._programs[programNumber];
  }

  /**
   * Set a program number as `active` in the runtime.
   *
   * @TODO add error handling to check if program is loaded
   */
  setActiveProgram(programNumber: number): boolean {
    // debug(`Setting program #${programNumber} active`);
    this._throwIfProgramNotLoaded(programNumber);
    this._activeProgram = programNumber;
    return true;
  }

  /**
   * Load the parser's input
   *
   * @TODO this should take string, not tokens.
   * @deprecated use loadParserTokens
   */
  setParserInput(tokens: IToken[]) {
    this._parser.input = tokens;
  }

  /**
   * Load the parser's input with tokens.
   */
  loadParserTokens(tokens: IToken[]) {
    this._parser.input = tokens;
  }

  /**
   * Sugar method for tokenizing and setting the parser in one step
   */
  loadParser(input: string): boolean {
    this._lexAndLoadParser(input);
    return true;
  }

  /**
   * Load a Program into memory
   *
   * This method can create a program if given a string
   */
  loadProgram(input: string, options?: ProgramLoadOptions): void {
    ProgramNumber.match(input, {
      NOMATCH: err => {
        const error = new Error(err);
        this._emitError(error);
      },
      MATCH: result => {
        const programNumber = Number(result[1]);

        this._programs[programNumber] = input;

        if (options?.setActive) {
          this.setActiveProgram(programNumber);
          this._tokenizeActiveProgram();
        }

        return this._programs[programNumber];
      }
    });
  }

  /**
   * Batch load programs into memory
   */
  loadPrograms(programs: string[]): void {
    programs.forEach(program => this.loadProgram(program));
  }

  /**
   * Return a program by number if loaded in memory.
   */
  getProgram(programNumber: number | string): string {
    if (typeof programNumber === "number") {
      this._throwIfProgramNotLoaded(programNumber);
      return this._programs[programNumber];
    }

    if (!programNumber.startsWith("O")) {
      throw new InvalidProgramNumber(programNumber);
    }

    const parsedProgramNumber = Number(programNumber.replace(/^O/, ""));
    this._throwIfProgramNotLoaded(parsedProgramNumber);
    return this._programs[parsedProgramNumber];
  }

  /**
   * Returns the loaded programs indexed by their program numbers.
   */
  getPrograms() {
    return this._programs;
  }

  /**
   * Count of loaded programs.
   */
  getProgramCount(): number {
    return Object.keys(this._programs).length;
  }

  /**
   * Return the currently active program.
   */
  getActiveProgram(): string {
    if (this._activeProgram === null) {
      this._throwIfProgramNotLoaded(this._activeProgram);
    }
    return this.getProgram(this._activeProgram as number);
  }

  /**
   * Get the currently active program number from the runtime.
   *
   * Returns the program number if exists, otherwise NaN to indicate error
   */
  getActiveProgramNumber(): number {
    if (typeof this._activeProgram === "number") {
      return this._activeProgram;
    } else {
      return NaN;
    }
  }

  /**
   * Check if a program has been loaded and exists in the runtime.
   */
  private _throwIfProgramNotLoaded(num: MacroRuntime["_activeProgram"]) {
    if (!this.programIsLoaded(num)) {
      throw new ProgramNumberNotFound(num);
    }
  }

  /**
   * Helper to emit errors
   */
  private _emitError(error: MacroCombinedError): false {
    void this._events.emit("error", error);
    return false;
  }

  /**
   * Load the {@link MacroParser} with tokens from the active program
   */
  private _tokenizeActiveProgram(): boolean {
    const input = this.getActiveProgram();
    return this._lexAndLoadParser(input);
  }

  /**
   * Generate an array of {@link IToken} from an input string
   * @TODO do we really need this? what about piping?
   * @deprecated
   */
  private _lexAndLoadParser(input: string): boolean {
    this._lexer.tokenize(input);
    if (this._lexer.hasErrors) return false;
    const tokens = this._lexer.getTokens();
    this._parser.setInput(tokens);
    return true;
  }

  /**
   * Parse a program number from a string or number.
   */
  private _parseProgramNumber(programNumber: number | string): number {
    if (typeof programNumber === "string") {
      if (programNumber.startsWith("O")) {
        const num = programNumber.replace(/^O/, "");
        return parseInt(num);
      } else {
        return parseInt(programNumber);
      }
    } else {
      return programNumber;
    }
  }

  /**
   * Run the parser by named rule
   */
  // private _interpret<T>(code: string, rule: TopLevelParserRules): T {
  //   this._lexAndLoadParser(code);

  //   const cst = this.Parser[rule]();

  //   return this.Interpreter.visit(cst) as T;
  // }
}
