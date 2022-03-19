import { ILexingError, IRecognitionException, Lexer } from "chevrotain";
import Debug from "debug";
import Emittery from "emittery";

import type { AnalyzedProgram, ProgramRecords, RuntimeOutput } from "../types";
import { analyze } from "../utils";
import { createToolchain } from "../utils/toolchain";
import { MacroInterpreter } from "./MacroInterpreter";
import { MacroLexer } from "./MacroLexer";
import { MacroParser } from "./MacroParser";

function range(x: number, y: number): number[] {
  return x > y ? [] : [x, ...range(x + 1, y)];
}

interface ProgramLoadOptions {
  setActive: boolean;
}

type PotentialError = IRecognitionException | ILexingError | string;

type ErrorHandler = (eventData: PotentialError | PotentialError[]) => void | Promise<void>;

interface RuntimeEvents {
  close: undefined; // No arg event
  error: PotentialError | PotentialError[];
}

/*
 * MacroRuntime Class to hold multiple programs in memory
 */
export class MacroRuntime {
  private _debug = Debug("macro:runtime");

  private _lexer: Lexer;
  private _parser: MacroParser;
  private _interpreter: MacroInterpreter;

  private _activeProgram = NaN;
  private _programs: ProgramRecords = {};
  private _vars = new Map<number, number>();
  private _events = new Emittery<RuntimeEvents>();

  get Lexer(): MacroLexer {
    return this._lexer;
  }

  get Parser(): MacroParser {
    return this._parser;
  }

  get Interpreter(): MacroInterpreter {
    return this._interpreter;
  }

  constructor() {
    // eslint-disable-next-line prettier/prettier
    const registers: number[] = [
      ...range(1, 33),
      ...range(100, 299),
      ...range(500, 699)
    ];

    this._debug(`Initializing registers (${registers.length})`);

    registers.forEach(i => this.initVar(i));

    const { lexer, parser, interpreter } = createToolchain();

    this._lexer = lexer;
    this._parser = parser;
    this._interpreter = interpreter;
  }

  /**
   * Main entry point to the runtime.
   */
  run(): RuntimeOutput {
    const beginExec = new Date();

    const { input } = this.getActiveProgram();
    const { tokens, errors } = this._lexer.tokenize(input);

    if (errors.length > 0) {
      void this._events.emit("error", errors);
    }

    this._parser.input = tokens;
    const cst = this._parser.program();

    if (this._parser.errors.length > 0) {
      void this._events.emit("error", this._parser.errors);
    }

    const result = this._interpreter.visit(cst) as ReturnType<MacroInterpreter["program"]>;

    return { beginExec, result } as RuntimeOutput;
  }

  /**
   * Reset the runtime.
   */
  reset(): void {
    this._activeProgram = NaN;
  }

  /**
   * Register a function to handle errors that occur in the runtime.
   */
  onError(handler: ErrorHandler): void {
    this._events.on("error", handler);
  }

  /**
   * Return a program by number if loaded in memory.
   */
  getProgram(programNumber: number | string): AnalyzedProgram {
    return this._programs[programNumber];
  }

  /**
   * Returns the loaded programs indexed by their program numbers.
   */
  getPrograms(): ProgramRecords {
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
  getActiveProgram(): AnalyzedProgram {
    if (typeof this._activeProgram === "number") {
      return this.getProgram(this._activeProgram);
    } else {
      return {
        input: "",
        programTitle: "",
        programNumber: NaN,
        err: ["No active program selected."]
      };
    }
  }

  /**
   * Get the currently active program number from the runtime.
   */
  getActiveProgramNumber(): number {
    return this._activeProgram;
  }

  /**
   * Set a program number as `active` in the runtime.
   */
  setActiveProgram(programNumber: number): void {
    this._debug(`Setting program #${programNumber} active`);
    this._activeProgram = programNumber;
  }

  /**
   * Create a an {@link AnalyzedProgram} from a string
   */
  analyzeProgram(input: string): AnalyzedProgram {
    const { err, result } = analyze(input);

    return {
      err,
      input,
      ...result
    };
  }

  /**
   * Read the value of a macro variable register
   */
  readVar(key: number): number {
    return this._vars.get(key) as number;
  }

  /**
   * Write a value to a macro variable register
   */
  writeVar(key: number, value: number): this {
    this._vars.set(key, value);
    return this;
  }

  /**
   * Clear a macro variable register
   */
  initVar(key: number): this {
    this.writeVar(key, NaN);
    return this;
  }

  /**
   * Check if a variable has been set
   */
  varIsset(key: number): boolean {
    if (this._vars.has(key)) {
      const value = this._vars.get(key) as number;
      return isNaN(value) === false;
    }
    return false;
  }

  /**
   * Load a AnalyzedProgram into memory
   *
   * This method can create a program if given a string
   */
  loadProgram(input: string, options?: ProgramLoadOptions): AnalyzedProgram {
    const analyzed = this.analyzeProgram(input);

    this._programs[analyzed.programNumber] = analyzed;

    if (options?.setActive) {
      this.setActiveProgram(analyzed.programNumber);
    }

    return analyzed;
  }

  /**
   * Batch load programs into memory
   */
  loadPrograms(programs: string[]): void {
    programs.forEach(program => this.loadProgram(program));
  }
}

export const runtime = new MacroRuntime();
