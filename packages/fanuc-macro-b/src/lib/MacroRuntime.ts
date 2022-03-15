import { AnalyzedProgram, ProgramRecords } from "../types";
import { analyze, zeroPad } from "../utils";

function range(x: number, y: number): number[] {
  return x > y ? [] : [x, ...range(x + 1, y)];
}

interface ProgramLoadOptions {
  activateOnLoad: boolean;
}

/**
 * MacroRuntime Class to hold multiple programs in memory
 */
export class MacroRuntime {
  private _activeProgram!: number;
  private _programs: ProgramRecords = {};
  private _vars = new Map<number, number>();
  private _errorHandler: (err: string) => void;

  constructor() {
    // eslint-disable-next-line prettier/prettier
    const registers: number[] = [
      ...range(1, 33),
      ...range(100, 299),
      ...range(500, 699)
    ];

    registers.forEach(i => this.initVar(i));

    this._errorHandler = () => {};
  }

  /**
   * Main entry point to the runtime.
   */
  run(): void {
    throw Error("Not Yet Implemented.");
  }

  /**
   * Reset the runtime.
   */
  reset(): void {
    throw Error("Not Yet Implemented.");
  }

  /**
   * Register a function to handle errors that occur in the runtime.
   */
  onError(handler: (err: string) => void) {
    this._errorHandler = handler;
  }

  /**
   * Return a program by number if loaded in memory.
   */
  getProgram(programNumber: number | string): AnalyzedProgram {
    return this._programs[programNumber];
  }

  /**
   * Return the currently active program.
   */
  getActiveProgram(): AnalyzedProgram {
    return this.getProgram(this._activeProgram);
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
   * Get the currently active program number from the runtime.
   */
  getActiveProgramNumber(): string {
    return zeroPad(this._activeProgram);
  }

  /**
   * Set a program number as `active` in the runtime.
   */
  setActiveProgram(programNumber: number): void {
    this._activeProgram = programNumber;
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
   * Load a AnalyzedProgram into memory
   *
   * This method can create a program if given a string
   */
  loadProgram(input: string, options?: ProgramLoadOptions): AnalyzedProgram {
    const analyzed = this.analyzeProgram(input);

    this._programs[analyzed.programNumber] = analyzed;

    if (options?.activateOnLoad) {
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
