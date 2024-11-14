import { MacroRuntime } from "@cnc4me/fanuc-macro-b";
// import { useState } from "react";

const runtimeInstance = new MacroRuntime();

export function useMacroRuntime() {
  return runtimeInstance;
}
