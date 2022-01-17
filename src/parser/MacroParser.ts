import { CstParser } from "chevrotain";

import { allTokens } from "../tokens/allTokens";
import { CloseParen, OpenParen } from "../tokens/brackets";
import {
  AdditionOperator,
  MultiplicationOperator,
  NumericValue
} from "../tokens/categories";
import {
  Address,
  Comma,
  Comment,
  Integer,
  LineNumber,
  Minus,
  Newline,
  Percent,
  PowerFunc,
  ProgramNumber,
  Var
} from "../tokens/tokens";

export default class MacroParser extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  public Program = this.RULE("Program", () => {
    this.SUBRULE(this.startOfFile);
    this.SUBRULE(this.Heading);
    this.MANY(() => {
      this.SUBRULE(this.Line);
    });
    this.CONSUME(Percent);
  });

  /**
   * Any number of valid addresses, comments, and/or expressions
   */
  public Line = this.RULE("Line", () => {
    this.SUBRULE(this.manyNcTokens);
    this.CONSUME(Newline);
  });

  /**
   * A line with a program number and an optional comment
   * to serve as the program title
   */
  public Heading = this.RULE("Heading", () => {
    this.CONSUME(ProgramNumber);
    this.OPTION(() => {
      this.CONSUME(Comment);
    });
    this.CONSUME(Newline);
  });

  // public variableAssignment = this.RULE("variableAssignment", () => {
  //   this.SUBRULE(this.macroVariable);
  //   this.CONSUME(Equals);
  //   this.CONSUME(NumberLiteral);
  // });

  /**
   * Start of file is delineated by a `%`
   */
  private startOfFile = this.RULE("startOfFile", () => {
    this.CONSUME(Percent);
    this.CONSUME(Newline);
  });

  /**
   * Pound sign `#` followed by an integer representing a variable register
   *
   * @TODO variable expressions!
   * @example "#518" or "#152"
   */
  private macroVariable = this.RULE("macroVariable", () => {
    this.CONSUME(Var);
    this.CONSUME(Integer);
  });

  /**
   * A single, capital letter followed by a numeric value
   */
  private valueAddress = this.RULE("valueAddress", () => {
    this.CONSUME(Address);
    this.CONSUME(NumericValue);
    // this.SUBRULE(this.numberLiteral);
  });

  /**
   * A single, capital letter followed by a macro variable
   */
  private variableAddress = this.RULE("variableAddress", () => {
    this.CONSUME(Address);
    this.OPTION(() => {
      this.CONSUME(Minus);
    });
    this.SUBRULE(this.macroVariable);
  });

  public ncToken = this.RULE("ncToken", () => {
    this.OR([
      // { ALT: () => this.CONSUME(Gcode) },
      // { ALT: () => this.CONSUME(Mcode) },
      { ALT: () => this.CONSUME(Comment) },
      { ALT: () => this.CONSUME(LineNumber) },
      { ALT: () => this.SUBRULE(this.valueAddress) },
      { ALT: () => this.SUBRULE(this.macroVariable) },
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
      { ALT: () => this.CONSUME(NumericValue) },
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
