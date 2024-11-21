export class MacroLexerError extends Error {
  //
}

export class InputUndefined extends MacroLexerError {
  constructor() {
    super(`The MacroLexer requested to tokenize an empty string.`);
  }
}

export class InvalidInput extends MacroLexerError {
  constructor(o: unknown) {
    super(`"${typeof o}" is not valid input for the MacroLexer.`);
  }
}
