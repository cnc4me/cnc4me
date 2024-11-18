import { MacroRuntime } from "@cnc4me/fanuc-macro-b";
import { createContext } from "react";

export const MacroRuntimeContext = createContext(new MacroRuntime());
