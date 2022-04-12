import type { Debugger } from "debug";
import Debug from "debug";

const macroDebugger = Debug("macro");
const _extend = (ns: string): Debugger => macroDebugger.extend(ns);

export const enableDebugging = (ns?: string) => Debug.enable(ns ?? "macro:*");

export const env = _extend("env");
export const lexer = _extend("lexer");
export const parser = _extend("parser");
export const memory = _extend("memory");
export const runtime = _extend("runtime");
export const interpreter = _extend("interpreter");
