import Debug from "debug";

import type { Debugger } from "debug";

const macroDebugger = Debug("macro");

const _extend = (ns: string): Debugger => macroDebugger.extend(ns);

export const enableDebugging = (ns?: string) => Debug.enable(ns ?? "macro:*");

export function createDebugger(label: string) {
  return _extend(label);
}

export const env = _extend("env");
export const lexer = _extend("lexer");
export const parser = _extend("parser");
export const memory = _extend("memory");
export const runtime = _extend("runtime");
export const interpreter = _extend("interpreter");
