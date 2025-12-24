import { useContext } from "react";
import { MacroRuntimeContext } from "~/context/MacroRuntimeContext";

export function useMacroRuntime() {
  return useContext(MacroRuntimeContext);
}
