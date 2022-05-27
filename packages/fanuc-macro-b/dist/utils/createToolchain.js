import { MacroInterpreter, MacroLexer, MacroParser } from "../lib";
export function createToolchain(options) {
    const errors = [];
    const lexer = new MacroLexer();
    const parser = new MacroParser();
    const interpreter = new MacroInterpreter();
    if (options?.preloadInput) {
        const { errors, tokens } = lexer.tokenize(options.preloadInput);
        if (errors) {
            errors.push(...errors);
        }
        parser.input = tokens;
    }
    return {
        errors,
        lexer,
        parser,
        interpreter
    };
}
