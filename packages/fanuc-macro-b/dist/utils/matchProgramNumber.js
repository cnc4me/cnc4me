/**
 * Attempt to match a valid NC program identifier
 */
export function matchProgramNumber(input, { MATCH, NOMATCH }) {
    const result = input.match(/^O([0-9]+)\s+?(?:\(.+?\))?$/m);
    if (result === null) {
        return NOMATCH("Program Number Not Found");
    }
    else {
        return MATCH(result);
    }
}
