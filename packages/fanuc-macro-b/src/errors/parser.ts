import type { IRecognitionException } from "chevrotain";

export class MacroParserError extends Error {
  //
}

export class ParsingError extends MacroParserError {
  constructor(err: IRecognitionException) {
    super(`There was an error running the MacroParser.`, { cause: err });
  }
}
