import Debug from "debug";

const rootDebugger = Debug("macro");

const _extend = (ns: string) => rootDebugger.extend(ns, ":");

// rootDebugger.enabled = true;

export const memory = _extend("memory");
export const parser = _extend("parser");
export const runtime = _extend("runtime");
export const interpreter = _extend("interpreter");
