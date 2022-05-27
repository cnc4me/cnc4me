import type { InterpretedLines, WithTools } from "../types";
/**
 * Run lines of text as gcode throught the {@link MacroInterpreter}
 */
export declare function lines(input: string): WithTools<InterpretedLines, "parser" | "interpreter">;
