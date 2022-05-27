const programNumberRegex = /[O|:](\d+)/y;
export function matchProgramNumber(text, startOffset) {
    let execResult = null;
    // using 'y' sticky flag (Note it is not supported on IE11...)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky
    programNumberRegex.lastIndex = startOffset;
    // Note that just because we are using a custom token pattern
    // Does not mean we cannot implement it using JavaScript Regular Expressions...
    execResult = programNumberRegex.exec(text);
    if (execResult !== null) {
        const fullMatch = execResult[0];
        execResult.payload = parseInt(fullMatch.slice(1));
    }
    return execResult;
}
