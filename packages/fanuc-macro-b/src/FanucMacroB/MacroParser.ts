import { ParsingError } from "../errors/parser";
import { Debuggers } from "../utils";
import { MacroParserRuleTree } from "./MacroParserRuleTree";

import type { ErrorProducer } from "../types";
import type { IToken } from "chevrotain";

const $d = Debuggers.Parser;

export class MacroParser
  extends MacroParserRuleTree
  implements ErrorProducer<ParsingError>
{
  static getBaseCstVisitor(opts: { useConstructorDefaults: boolean }) {
    $d("creating BaseCstVisitor");
    const parser = new MacroParserRuleTree();
    return opts.useConstructorDefaults
      ? parser.getBaseCstVisitorConstructorWithDefaults()
      : parser.getBaseCstVisitorConstructor();
  }

  get hasErrors() {
    return this.errors.length > 0;
  }

  setInput(tokens: IToken[]) {
    $d("setting input with", tokens.length, "tokens");
    this.input = tokens;
  }

  getErrors() {
    return this.errors.map(err => new ParsingError(err));
  }
}
