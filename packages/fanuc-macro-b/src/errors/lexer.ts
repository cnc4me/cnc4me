import type { ILexingError } from "chevrotain";

export class MacroLexerError extends Error {
  //
}

export class LexingError extends MacroLexerError {
  constructor(err: ILexingError) {
    const cause = Object.assign(err, { name: "ILexingError" }) as Error;
    super(`There was an error running the lexer.`, { cause });
  }
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
