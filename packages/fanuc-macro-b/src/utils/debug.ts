import Debug from "debug";

const DEBUG_NAMESPACE = "fanuc";

let currentNamespaces = "";

const FanucDebugger = Debug(DEBUG_NAMESPACE);

export const Debuggers = {
  enable: Debug.enable,
  disable: Debug.disable,
  Main: FanucDebugger,
  Lexer: FanucDebugger.extend("lexer"),
  Memory: FanucDebugger.extend("memory"),
  Parser: FanucDebugger.extend("parser"),
  Runtime: FanucDebugger.extend("runtime"),
  Interpreter: FanucDebugger.extend("interpreter"),
  pause() {
    currentNamespaces = Debug.disable();
    return {
      disabled: currentNamespaces,
      resumeDebugging: () => Debug.enable(currentNamespaces)
    };
  }
};

export function enableDebugging(
  namespace?: "lexer" | "memory" | "parser" | "runtime" | "interpreter"
) {
  if (namespace) {
    Debug.enable(`${DEBUG_NAMESPACE}:${namespace}`);
  } else {
    if (currentNamespaces) {
      Debug.enable(currentNamespaces);
    } else {
      Debug.enable(`${DEBUG_NAMESPACE}:*`);
    }
  }
}
