import { MacroLexer } from "./MacroLexer";
import { MacroParser } from "./MacroParser";

import type { IMacroBase } from "./types";
import type { IRecognitionException, IToken } from "chevrotain";

export type MacroParserInitOptions = {
  preloadString: string;
  preloadTokens: IToken[];
};

export class MacroParser2
  extends MacroParser
  implements IMacroBase<IRecognitionException>
{
  static create(options?: Partial<MacroParserInitOptions>) {
    const instance = new MacroParser2();

    if (options?.preloadString) {
      const tokens = MacroLexer.parseForTokens(options.preloadString);
      instance.setInput(tokens);
    }

    if (options?.preloadTokens) {
      instance.setInput(options.preloadTokens);
    }

    return instance;
  }

  // constructor() {
  //   super();
  // }

  setInput(tokens: IToken[]) {
    this.input = tokens;
  }

  get hasErrors() {
    return this.errors.length > 0;
  }

  getErrors(): IRecognitionException[] {
    return this.errors;
  }
}
