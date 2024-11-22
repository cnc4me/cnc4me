import { MacroLexer } from "./MacroLexer";
import { MacroParserBase } from "./MacroParserBase";

import type { IMacroBase } from "./types";
import type { IRecognitionException, IToken } from "chevrotain";

export type MacroParserInitOptions = {
  preloadString: string;
  preloadTokens: IToken[];
};

export class MacroParser
  extends MacroParserBase
  implements IMacroBase<IRecognitionException>
{
  static getBaseCstVisitor(opts: { useConstructorDefaults: boolean }) {
    const parser = new MacroParserBase();
    return opts.useConstructorDefaults
      ? parser.getBaseCstVisitorConstructorWithDefaults()
      : parser.getBaseCstVisitorConstructor();
  }

  constructor() {
    super();
  }

  get hasErrors() {
    return this.errors.length > 0;
  }

  getErrors(): IRecognitionException[] {
    return this.errors;
  }

  setInput(tokens: IToken[]) {
    this.input = tokens;
  }
}
