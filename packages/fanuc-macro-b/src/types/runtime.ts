import { ILexingError, IRecognitionException } from "chevrotain";

import type { MacroInterpreter } from "../lib";

export interface ProgramLoadOptions {
  setActive: boolean;
}
export type RuntimeErrors = string | ILexingError | IRecognitionException;

export interface RuntimeOutput {
  beginExec: Date;
  // errors: RuntimeErrors[];
  result: ReturnType<MacroInterpreter["program"]>;
}

export interface RuntimeEvents {
  close: undefined; // No arg event
  error: RuntimeErrors;
}
