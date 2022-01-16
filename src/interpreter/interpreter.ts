import MacroInterpreter from "./MacroInterpreter";

// We only need a single interpreter instance because our interpreter has no state.
const interpreter = new MacroInterpreter();

export default interpreter;
