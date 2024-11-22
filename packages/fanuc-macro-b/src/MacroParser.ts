import { ParsingError } from "./errors/parser";
import { MacroParserRuleTree } from "./MacroParserRuleTree";

import type { ErrorProducer } from "./types";
import type { IToken } from "chevrotain";

export class MacroParser
  extends MacroParserRuleTree
  implements ErrorProducer<ParsingError>
{
  static getBaseCstVisitor(opts: { useConstructorDefaults: boolean }) {
    const parser = new MacroParserRuleTree();
    return opts.useConstructorDefaults
      ? parser.getBaseCstVisitorConstructorWithDefaults()
      : parser.getBaseCstVisitorConstructor();
  }

  get hasErrors() {
    return this.errors.length > 0;
  }

  getErrors() {
    return this.errors.map(err => new ParsingError(err));
  }

  setInput(tokens: IToken[]) {
    this.input = tokens;
  }
}
