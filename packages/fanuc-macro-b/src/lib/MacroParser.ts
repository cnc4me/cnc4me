import { CstParser } from "chevrotain";

import {
  AdditionOperator,
  Address,
  BooleanOperator,
  BuiltinFunctions,
  CloseBracket,
  Comment,
  Equals,
  Gcode,
  GotoLine,
  If,
  Integer,
  LineNumber,
  Mcode,
  Minus,
  MultiplicationOperator,
  Newline,
  NumericValue,
  OpenBracket,
  Percent,
  ProgramNumber,
  Tcode,
  Then,
  Var
} from "./Tokens";
import { allTokens } from "./Tokens/allTokens";

export class MacroParser extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  /**
   * Defining a valid NC program
   */
  public program = this.RULE("program", () => {
    this.SUBRULE(this.StartOfFile);
    this.SUBRULE(this.ProgramNumberLine);
    // this.CONSUME(Newline);
    this.SUBRULE(this.Lines);
    this.SUBRULE(this.EndOfFile);
    // this.CONSUME(Percent, { LABEL: "EndOfFile" });
  });

  /**
   *
   */
  public Lines = this.RULE("Lines", () => {
    this.MANY_SEP({
      SEP: Newline,
      DEF: () => {
        this.SUBRULE(this.Line);
      }
    });
  });

  /**
   * Any number of valid addresses, comments, and/or expressions
   */
  public Line = this.RULE("Line", () => {
    this.OR([
      // { ALT: () => this.CONSUME(Newline) },
      { ALT: () => this.CONSUME(Comment) },
      // { ALT: () => this.SUBRULE(this.ProgramNumberLine) },
      { ALT: () => this.SUBRULE(this.variableAssignment) },
      { ALT: () => this.SUBRULE(this.conditionalExpression) },
      { ALT: () => this.SUBRULE(this.addresses) }
      // { ALT: () => this.SUBRULE(this.atomicExpression) }
    ]);
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
      { ALT: () => this.SUBRULE(this.bracketExpression) },
      { ALT: () => this.SUBRULE(this.VariableLiteral) }
    ]);
  });

  /**
   * A signed, decimal or integer
   *
   * @example 5, 1.2345, -1., 3000
   */
  private NumericLiteral = this.RULE("NumericLiteral", () => {
    this.OPTION(() => {
      this.CONSUME(Minus);
    });
    this.CONSUME(NumericValue);
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

  /**
   * Number or Macro variable
   */
  public ValueLiteral = this.RULE("ValueLiteral", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.VariableLiteral) },
      { ALT: () => this.SUBRULE(this.NumericLiteral) }
    ]);
  });

  /**
   *
   */
  public ProgramNumberLine = this.RULE("ProgramNumberLine", () => {
    this.CONSUME(ProgramNumber);
    // this.OPTION(() => {
    this.CONSUME(Comment);
    // });
    this.CONSUME(Newline);
  });

  /**
   *
   */
  public expression = this.RULE("expression", () => {
    this.SUBRULE(this.additionExpression);
  });

  /**
   *
   */
  public additionExpression = this.RULE("additionExpression", () => {
    this.SUBRULE(this.multiplicationExpression, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(AdditionOperator);
      this.SUBRULE2(this.multiplicationExpression, { LABEL: "rhs" });
    });
  });

  /**
   *
   */
  public multiplicationExpression = this.RULE("multiplicationExpression", () => {
    this.SUBRULE(this.atomicExpression, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(MultiplicationOperator);
      this.SUBRULE2(this.atomicExpression, { LABEL: "rhs" });
    });
  });

  /**
   * Calling a Built-In function
   */
  public functionExpression = this.RULE("functionExpression", () => {
    this.CONSUME(BuiltinFunctions);
    this.CONSUME(OpenBracket);
    this.SUBRULE(this.atomicExpression);
    this.CONSUME(CloseBracket);
  });

  /**
   * Making a comparison between two values
   */
  public booleanExpression = this.RULE("booleanExpression", () => {
    this.SUBRULE(this.atomicExpression);
    this.CONSUME(BooleanOperator);
    this.SUBRULE2(this.atomicExpression);
  });

  /**
   * If expression to branch control flow
   */
  public conditionalExpression = this.RULE("conditionalExpression", () => {
    this.CONSUME(If);
    this.CONSUME(OpenBracket);
    this.SUBRULE(this.booleanExpression);
    this.CONSUME(CloseBracket);
    // eslint-disable-next-line prettier/prettier
    this.OR([
      { ALT: () => this.CONSUME(Then) },
      { ALT: () => this.CONSUME(GotoLine) }
    ]);
  });

  /**
   * `bracketExpression` has the highest precedence and thus it appears
   * in the "lowest" leaf in the expression ParseTree.
   */
  public atomicExpression = this.RULE("atomicExpression", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.bracketExpression) },
      { ALT: () => this.SUBRULE(this.functionExpression) },
      { ALT: () => this.SUBRULE(this.NumericLiteral) },
      { ALT: () => this.SUBRULE(this.VariableLiteral) }
    ]);
  });

  /**
   * Any expression wrapped in brackets
   *
   * @example [#3 + 4.5]
   */
  private bracketExpression = this.RULE("bracketExpression", () => {
    this.CONSUME(OpenBracket);
    this.SUBRULE(this.expression);
    this.CONSUME(CloseBracket);
  });

  /**
   * Assigning a variable with a value
   *
   * @example
   *   #500 = 12.3456
   *   #501 = [2 + 0.5]
   *   #502 = [#501 / 2]
   */
  private variableAssignment = this.RULE("variableAssignment", () => {
    this.SUBRULE(this.VariableLiteral);
    this.CONSUME(Equals);
    this.SUBRULE(this.expression);
  });

  /**
   * A repeated sequence of addressed values
   *
   * Any typical block of NC code would satisfy this rule
   *
   * @example
   * - G43 H12 Z1.0
   * - X1. Y2. B90.
   */
  private addresses = this.RULE("addresses", () => {
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(Gcode) },
        { ALT: () => this.CONSUME(Mcode) },
        { ALT: () => this.CONSUME(Tcode) },
        { ALT: () => this.CONSUME(LineNumber) },
        { ALT: () => this.SUBRULE(this.AddressedValue) }
      ]);
    });
  });

  /**
   * Start of a valid NC File
   */
  private StartOfFile = this.RULE("StartOfFile", () => {
    this.CONSUME(Percent);
    this.CONSUME(Newline);
  });

  /**
   * End of a valid NC File
   */
  private EndOfFile = this.RULE("EndOfFile", () => {
    this.CONSUME(Percent);
    this.OPTION(() => {
      this.CONSUME(Newline);
    });
  });
}

export const parser = new MacroParser();
