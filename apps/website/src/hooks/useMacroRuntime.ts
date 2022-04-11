import { MacroRuntime } from "@cnc4me/fanuc-macro-b";
import { useState } from "react";

export function useMacroRuntime() {
  const runtimeInstance = new MacroRuntime();

  return useState(runtimeInstance);
}
