import { CstParser } from "chevrotain";

import { allTokens } from "./tokens/allTokens";
import {
  CloseBracket,
  CloseParen,
  OpenBracket,
  OpenParen
} from "./tokens/brackets";
import {
  AdditionOperator,
  BooleanOperator,
  Brackets,
  ControlFlowKeyword,
  MultiplicationOperator,
  NumericValue
} from "./tokens/categories";
import { GotoLine, If, Then } from "./tokens/controlFlow";
import {
  Address,
  Comma,
  Comment,
  Decimal,
  Equals,
  Integer,
  Minus,
  Newline,
  Percent,
  PowerFunc,
  ProgramNumber,
  Var
} from "./tokens/tokens";

export default class MacroParser extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  /**
   * Defining a valid NC program
   */
  public Program = this.RULE("Program", () => {
    this.SUBRULE(this.PercentLine);
    this.SUBRULE(this.ProgramNumberLine);
    this.MANY_SEP({
      SEP: Newline,
      DEF: () => {
        this.SUBRULE(this.line);
      }
    });
    // this.CONSUME(Percent);
  });

  /**
   * Any number of valid addresses, comments, and/or expressions
   */
  public line = this.RULE("line", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.ifThenExpression) },
      { ALT: () => this.SUBRULE(this.variableAssignment) },
      { ALT: () => this.SUBRULE(this.addresses) }
      // { ALT: () => this.SUBRULE(this.ProgramNumberLine) },
      // { ALT: () => this.SUBRULE(this.PercentLine) },
      // { ALT: () => this.CONSUME(Comment) }
    ]);
    // this.CONSUME(Newline);
    // this.MANY(() => {
    //   this.SUBRULE(this.validToken);
    // });
  });

  /**
   * Any valid piece of code that can be found in a file
   */
  public validToken = this.RULE("validToken", () => {
    this.OR([
      { ALT: () => this.CONSUME(Comment) },
      { ALT: () => this.CONSUME(Equals) },
      { ALT: () => this.CONSUME(Percent) },
      { ALT: () => this.CONSUME(Brackets) },
      { ALT: () => this.CONSUME(BooleanOperator) },
      { ALT: () => this.CONSUME(AdditionOperator) },
      { ALT: () => this.CONSUME(MultiplicationOperator) },
      // { ALT: () => this.CONSUME(Newline) },
      { ALT: () => this.SUBRULE(this.AddressedValue) }

      // { ALT: () => this.SUBRULE(this.valueExpression) },
      // { ALT: () => this.SUBRULE(this.gotoExpression) },
      // { ALT: () => this.SUBRULE(this.booleanExpression) },
    ]);
  });

  /**
   * Assigning a variable with a value
   *
   * @example
   *   #500 = 12.3456
   *   #501 = [2 + 0.5]
   *   #502 = [#501 / 2]
   */
  public variableAssignment = this.RULE("variableAssignment", () => {
    this.SUBRULE(this.VariableLiteral, { LABEL: "lhs" });
    this.CONSUME(Equals);
    this.SUBRULE(this.SignedNumericLiteral, { LABEL: "rhs" });
    //OR NumericExpression
  });

  // public valueExpression = this.RULE("valueExpression", () => {
  //   this.SUBRULE1(this.VarOrNumber);
  //   this.OR([
  //     { ALT: () => this.CONSUME(AdditionOperator) },
  //     { ALT: () => this.CONSUME(MultiplicationOperator) }
  //   ]);
  //   this.SUBRULE2(this.VarOrNumber);
  // });

  // public bracketExpression = this.RULE("bracketExpression", () => {
  //   this.CONSUME(OpenBracket);
  //   this.SUBRULE(this.expression);
  //   this.CONSUME(CloseBracket);
  // });
  public booleanExpression = this.RULE("booleanExpression", () => {
    this.CONSUME(OpenBracket);
    this.SUBRULE1(this.SignedNumericLiteral);
    this.CONSUME(BooleanOperator);
    this.SUBRULE2(this.SignedNumericLiteral);
    this.CONSUME(CloseBracket);
  });

  public ifThenExpression = this.RULE("ifThenExpression", () => {
    this.CONSUME(If);
    this.CONSUME(OpenBracket);
    this.SUBRULE1(this.SignedNumericLiteral);
    this.CONSUME(BooleanOperator);
    this.SUBRULE2(this.SignedNumericLiteral);
    this.CONSUME(CloseBracket);
    this.CONSUME(Then);
  });

  /**
   * If/Goto Expression
   */
  public gotoExpression = this.RULE("gotoExpression", () => {
    this.CONSUME(If);
    this.SUBRULE(this.booleanExpression);
    this.CONSUME(GotoLine);
  });

  /**
   * A single, capital letter followed by a macro variable
   *
   * @example H#518, X1.2345, Z1., M1, G90
   */
  private AddressedValue = this.RULE("AddressedValue", () => {
    this.CONSUME(Address);
    this.OPTION(() => {
      this.CONSUME(Minus);
    });
    this.OR([
      { ALT: () => this.CONSUME(Integer) },
      { ALT: () => this.CONSUME(Decimal) },
      { ALT: () => this.SUBRULE(this.VariableLiteral) }
    ]);
  });

  /**
   * A single, capital letter followed by a macro variable
   *
   * @example H#518, X1.2345, Z1., M1, G90
   */
  private SignedNumericLiteral = this.RULE("SignedNumericLiteral", () => {
    this.OPTION(() => {
      this.CONSUME(Minus);
    });
    this.OR([
      { ALT: () => this.CONSUME(Integer) },
      { ALT: () => this.CONSUME(Decimal) }
    ]);
  });

  /**
   * A repeated sequence of addressed values
   *
   * Any typical block of NC code would satisfy this rule
   *
   * @example
   * - G43 H12 Z1.0
   */
  private addresses = this.RULE("addresses", () => {
    this.MANY(() => {
      this.SUBRULE(this.AddressedValue);
    });
  });

  private PercentLine = this.RULE("PercentLine", () => {
    this.CONSUME(Percent);
    this.CONSUME(Newline);
  });

  private ProgramNumberLine = this.RULE("ProgramNumberLine", () => {
    this.CONSUME(ProgramNumber);
    this.OPTION(() => {
      this.CONSUME(Comment);
    });
    this.CONSUME(Newline);
  });

  /**
   * Pound sign `#` followed by an integer representing a variable register
   *
   * @TODO variable expressions!
   * @example "#518" or "#152"
   */
  private VariableLiteral = this.RULE("VariableLiteral", () => {
    this.CONSUME(Var);
    this.CONSUME(Integer);
  });
}

export const parser = new MacroParser();
