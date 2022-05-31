import { MacroRuntime } from "@cnc4me/fanuc-macro-b";
import { useState } from "react";
import { singletonHook } from "react-singleton-hook";

const init = new MacroRuntime();

export function _useMacroRuntime(): MacroRuntime {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [runtime, setRuntime] = useState(init);

  return runtime;
}

export const useMacroRuntime = singletonHook(init, _useMacroRuntime);
