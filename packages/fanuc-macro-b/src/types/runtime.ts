import type { MacroInterpreter } from "../lib";
import { OneOrMany } from ".";
import { EvalErrors } from "./core";

export interface ProgramLoadOptions {
  setActive: boolean;
}

export type RuntimeErrors = OneOrMany<EvalErrors | string>;

export interface RuntimeOutput {
  beginExec: Date;
  result: ReturnType<MacroInterpreter["program"]>;
}

export interface RuntimeEvents {
  close: undefined; // No arg event
  error: RuntimeErrors;
}
