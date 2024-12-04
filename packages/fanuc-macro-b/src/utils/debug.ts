import Debug from "debug";

const DEBUG_NAMESPACE = "fanuc";
const NAMESPACES = [
  "lexer",
  "memory",
  "parser",
  "runtime",
  "interpreter"
] as const;

let currentNamespaces = "";

const FanucDebugger = Debug(DEBUG_NAMESPACE);

export const disableDebugging = () => {
  currentNamespaces = Debug.disable();
  return currentNamespaces;
};

export function enableDebugging(namespace?: `${(typeof NAMESPACES)[number]}`) {
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

export const Debuggers = {
  enable: Debug.enable,
  disable: Debug.disable,
  Main: FanucDebugger,
  Lexer: FanucDebugger.extend("lexer"),
  Memory: FanucDebugger.extend("memory"),
  Parser: FanucDebugger.extend("parser"),
  Runtime: FanucDebugger.extend("runtime"),
  Interpreter: FanucDebugger.extend("interpreter")
};
