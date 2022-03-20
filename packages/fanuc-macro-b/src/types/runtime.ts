import type { MacroInterpreter } from "../lib";
import { LexingErrors, OneOrMany, ParseErrors } from ".";

export interface ProgramLoadOptions {
  setActive: boolean;
}

export type RuntimeErrors = OneOrMany<LexingErrors | ParseErrors | string>;

export interface RuntimeOutput {
  beginExec: Date;
  result: ReturnType<MacroInterpreter["program"]>;
}

export interface RuntimeEvents {
  close: undefined; // No arg event
  error: RuntimeErrors;
}
