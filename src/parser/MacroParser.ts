import { CstParser } from "chevrotain";

import { allTokens } from "../lexer/tokens/allTokens";
import { CloseParen, OpenParen } from "../lexer/tokens/brackets";
import {
  AdditionOperator,
  Address,
  Comma,
  Comment,
  Equals,
  ExtendedOffset,
  Gcode,
  LineNumber,
  Mcode,
  Minus,
  MultiplicationOperator,
  Newline,
  NumberLiteral,
  Percent,
  PowerFunc,
  ProgramNumber,
  Var
} from "../lexer/tokens/tokens";

export default class MacroParser extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  public Program = this.RULE("Program", () => {
    this.SUBRULE(this.programDelim);
    // this.SUBRULE(this.startOfProgram);
    this.CONSUME(ProgramNumber);
    this.OPTION(() => {
      this.CONSUME(Comment);
    });
    this.CONSUME(Newline);
    this.MANY(() => {
      this.SUBRULE(this.block);
    });
    this.CONSUME(Percent);
  });

  public programDelim = this.RULE("programDelim", () => {
    this.CONSUME(Percent);
    this.CONSUME(Newline);
  });

  public variable = this.RULE("variable", () => {
    this.CONSUME(Address);
    this.CONSUME(Var);
    this.CONSUME(NumberLiteral);
  });

  public valueAddress = this.RULE("valueAddress", () => {
    this.CONSUME(Address);
    // this.OPTION(() => {
    //   this.CONSUME(Minus);
    // });
    this.CONSUME(NumberLiteral);
  });

  public identifier = this.RULE("identifier", () => {
    this.OR([
      { ALT: () => this.CONSUME1(LineNumber) },
      { ALT: () => this.CONSUME1(Gcode) },
      { ALT: () => this.CONSUME1(ExtendedOffset) },
      { ALT: () => this.CONSUME1(Mcode) },
      { ALT: () => this.SUBRULE(this.variable) },
      { ALT: () => this.SUBRULE(this.valueAddress) }
    ]);
  });

  public block = this.RULE("block", () => {
    this.MANY(() => {
      this.SUBRULE(this.identifier);
      this.OPTION(() => {
        this.CONSUME(Comment);
      });
    });
    this.CONSUME(Newline);
  });

  public commentBlock = this.RULE("commentBlock", () => {
    this.CONSUME(Comment);
    this.CONSUME(Newline);
  });

  public expression = this.RULE("expression", () => {
    this.SUBRULE(this.additionExpression);
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
