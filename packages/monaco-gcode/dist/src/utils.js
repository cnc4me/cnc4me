export function createMonarchLanguage(brackets, rules) {
    return {
        brackets,
        tokenizer: {
            root: rules
        }
    };
}
export function createTheme(theme) {
    return theme;
}
export function createThemeRule(rule) {
    const token = rule.token;
    return Object.assign(rule, { token });
}
export function createThemeRules(rules) {
    return rules.map(rule => createThemeRule(rule));
}
export function createLanguageRule(regex, token) {
    return [regex, token];
}
export function createLanguageRules(rules) {
    return rules.map(([r, t]) => createLanguageRule(r, t));
}
export function createBracketRule(bracket) {
    return {
        open: bracket[0],
        close: bracket[1],
        token: bracket[2]
    };
}
export function createBracketRules(brackets) {
    return brackets.map(b => createBracketRule(b));
}
/**
 * Given a Chevrotain parser, generate a Monarch language definition
 *
 * @TODO look into this, and actually generate it
 */
export function generateMonarchLanguageFromChevrotainTokens(tokens, brackets, rules) {
    const mapped = tokens.map(tok => {
        return {
            token: tok.name,
            group: tok.GROUP,
            pattern: tok.PATTERN
        };
    });
    // return mapped;
    return {
        brackets,
        tokenizer: {
            root: rules
        }
    };
}
/**
 * Given a Chevrotain parser, generate a Monarch language definition
 *
 * @TODO look into this, and actually generate it
 */
export function generateMonarchLanguageFromChevrotainParser(parser, brackets, rules) {
    // console.log(parser);
    return {
        brackets,
        tokenizer: {
            root: rules
        }
    };
}
