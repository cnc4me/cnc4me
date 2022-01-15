import { CstParser } from "chevrotain";

import {
  AdditionOperator,
  Address,
  allTokens,
  CloseParen,
  Comma,
  Equals,
  Minus,
  MultiplicationOperator,
  Newline,
  NumberLiteral,
  OpenParen,
  Percent,
  PowerFunc,
  Var
} from "../lexer/MacroLexer";

export default class MacroParser extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  public startOfProgram = this.RULE("startOfProgram", () => {
    this.CONSUME1(Percent);
    this.CONSUME2(Newline);
  });

  public block = this.RULE("block", () => {
    this.MANY(() => {
      this.SUBRULE(this.valueAddress);
    });
    this.CONSUME(Newline);
  });

  public program = this.RULE("program", () => {
    // this.SUBRULE(this.startOfProgram);
    this.CONSUME1(Percent);
    // this.CONSUME(ProgramNumber);
    this.MANY(() => {
      this.SUBRULE(this.block);
    });
    this.CONSUME2(Percent);
  });

  public expression = this.RULE("expression", () => {
    this.SUBRULE(this.additionExpression);
  });

  public valueAddress = this.RULE("valueAddress", () => {
    this.CONSUME1(Address);
    this.OPTION(() => {
      this.CONSUME2(Minus);
    });
    this.CONSUME3(NumberLiteral);
  });

  public variableStatement = this.RULE("variableStatement", () => {
    this.CONSUME1(Var);
    this.CONSUME2(NumberLiteral);
    this.OPTION(() => {
      this.CONSUME3(Equals);
      this.CONSUME4(NumberLiteral);
    });
  });

  // Lowest precedence thus it is first in the rule chain
  // The precedence of binary expressions is determined by how far down the Parse Tree
  // The binary expression appears.
  public additionExpression = this.RULE("additionExpression", () => {
    // using labels can make the CST processing easier
    this.SUBRULE(this.multiplicationExpression, { LABEL: "lhs" });
    this.MANY(() => {
      // consuming 'AdditionOperator' will consume either Plus or Minus as they are subclasses of AdditionOperator
      this.CONSUME(AdditionOperator);
      //  the index "2" in SUBRULE2 is needed to identify the unique position in the grammar during runtime
      this.SUBRULE2(this.multiplicationExpression, { LABEL: "rhs" });
    });
  });

  public multiplicationExpression = this.RULE(
    "multiplicationExpression",
    () => {
      this.SUBRULE(this.atomicExpression, { LABEL: "lhs" });
      this.MANY(() => {
        this.CONSUME(MultiplicationOperator);
        //  the index "2" in SUBRULE2 is needed to identify the unique position in the grammar during runtime
        this.SUBRULE2(this.atomicExpression, { LABEL: "rhs" });
      });
    }
  );

  public atomicExpression = this.RULE("atomicExpression", () => {
    this.OR([
      // parenthesisExpression has the highest precedence and thus it appears
      // in the "lowest" leaf in the expression ParseTree.
      { ALT: () => this.SUBRULE(this.parenthesisExpression) },
      { ALT: () => this.CONSUME(NumberLiteral) },
      { ALT: () => this.SUBRULE(this.powerFunction) }
    ]);
  });

  public parenthesisExpression = this.RULE("parenthesisExpression", () => {
    this.CONSUME(OpenParen);
    this.SUBRULE(this.expression);
    this.CONSUME(CloseParen);
  });

  public powerFunction = this.RULE("powerFunction", () => {
    this.CONSUME(PowerFunc);
    this.CONSUME(OpenParen);
    this.SUBRULE(this.expression, { LABEL: "base" });
    this.CONSUME(Comma);
    this.SUBRULE2(this.expression, { LABEL: "exponent" });
    this.CONSUME(CloseParen);
  });
}

export const parser = new MacroParser();
