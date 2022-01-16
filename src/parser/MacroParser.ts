import { CstParser } from "chevrotain";

import { allTokens } from "../lexer/tokens/allTokens";
import { CloseParen, OpenParen } from "../lexer/tokens/brackets";
import {
  AdditionOperator,
  MultiplicationOperator
} from "../lexer/tokens/categories";
import {
  Address,
  Comma,
  Comment,
  Dot,
  Equals,
  Gcode,
  LineNumber,
  Mcode,
  Minus,
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
    this.SUBRULE(this.startOfFile);
    this.SUBRULE(this.programHeading);
    this.MANY(() => {
      this.SUBRULE(this.Line);
    });
    this.CONSUME(Percent);
  });

  public Line = this.RULE("Line", () => {
    this.SUBRULE(this.manyNcTokens);
    this.CONSUME(Newline);
  });

  public startOfFile = this.RULE("startOfFile", () => {
    this.CONSUME(Percent);
    this.CONSUME(Newline);
  });

  public programHeading = this.RULE("programHeading", () => {
    this.CONSUME(ProgramNumber);
    this.OPTION(() => {
      this.CONSUME(Comment);
    });
    this.CONSUME(Newline);
  });

  public valueAddress = this.RULE("valueAddress", () => {
    this.CONSUME(Address);
    this.OPTION(() => {
      this.CONSUME(Minus);
    });
    this.CONSUME(NumberLiteral);
    // this.OPTION1(() => {
    //   this.CONSUME(Dot);
    // });
  });

  public variableAddress = this.RULE("variableAddress", () => {
    this.CONSUME(Address);
    this.CONSUME(Var);
    this.OPTION(() => {
      this.CONSUME(Minus);
    });
    this.CONSUME(NumberLiteral);
  });

  public variableIdent = this.RULE("variableIdent", () => {
    this.CONSUME(Var);
    this.CONSUME(NumberLiteral);
  });

  public variableAssignment = this.RULE("variableAssignment", () => {
    this.SUBRULE(this.variableIdent);
    this.CONSUME(Equals);
    this.CONSUME(NumberLiteral);
  });

  public ncToken = this.RULE("ncToken", () => {
    this.OR([
      { ALT: () => this.CONSUME(Gcode) },
      { ALT: () => this.CONSUME(Mcode) },
      { ALT: () => this.CONSUME(Comment) },
      { ALT: () => this.CONSUME(LineNumber) },
      { ALT: () => this.SUBRULE(this.valueAddress) },
      { ALT: () => this.SUBRULE(this.variableIdent) },
      { ALT: () => this.SUBRULE(this.variableAddress) }
    ]);
  });

  public manyNcTokens = this.RULE("manyNcTokens", () => {
    this.MANY(() => {
      this.SUBRULE(this.ncToken);
    });
  });

  public expression = this.RULE("expression", () => {
    this.SUBRULE(this.additionExpression);
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
