import Debug from "debug";

const DEBUG_NAMESPACE = "FanucMacroB";

const macroDebugger = Debug(DEBUG_NAMESPACE);

export { Debug };

export const disableDebugging = Debug.disable();

export function enableDebugging(ns?: `${typeof DEBUG_NAMESPACE}:${string}`) {
  Debug.enable(ns ?? `${DEBUG_NAMESPACE}:*`);
}

export const Debuggers = {
  Interpreter: macroDebugger.extend("interpreter"),
  Lexer: macroDebugger.extend("lexer"),
  Memory: macroDebugger.extend("memory"),
  Parser: macroDebugger.extend("parser"),
  Runtime: macroDebugger.extend("runtime")
};
