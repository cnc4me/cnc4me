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
  /**
   * @deprecated should we allow static usage?
   */
  static run(input: string) {
    const parser = new MacroParser();

    const tokens = MacroLexer.run(input);

    parser.setInput(tokens);

    return parser.lines();
  }

  static create(options?: Partial<MacroParserInitOptions>) {
    const instance = new MacroParser();

    if (options?.preloadString) {
      const tokens = MacroLexer.run(options.preloadString);
      instance.setInput(tokens);
    }

    if (options?.preloadTokens) {
      instance.setInput(options.preloadTokens);
    }

    return instance;
  }

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
