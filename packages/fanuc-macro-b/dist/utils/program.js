import { createToolchain } from "./createToolchain";
/**
 * Analyze a text in the context of being a valid NC program
 */
export function program(input) {
    const { parser, interpreter } = createToolchain({ preloadInput: input });
    const cst = parser.program();
    const result = interpreter.visit(cst);
    return {
        result,
        insights: interpreter.Insights,
        errors: parser.errors
    };
}
