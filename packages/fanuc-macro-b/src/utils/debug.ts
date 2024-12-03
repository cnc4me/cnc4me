import Debug from "debug";

const DEBUG_NAMESPACE = "fanuc";

const macroDebugger = Debug(DEBUG_NAMESPACE);

// export { Debug };

export const disableDebugging = () => Debug.disable();

export function enableDebugging(ns?: `${typeof DEBUG_NAMESPACE}:${string}`) {
  Debug.enable(ns ?? `${DEBUG_NAMESPACE}:*`);
}

export const Debuggers = {
  Lexer: macroDebugger.extend("lexer"),
  Memory: macroDebugger.extend("memory"),
  Parser: macroDebugger.extend("parser"),
  Runtime: macroDebugger.extend("runtime"),
  Interpreter: macroDebugger.extend("interpreter")
};
