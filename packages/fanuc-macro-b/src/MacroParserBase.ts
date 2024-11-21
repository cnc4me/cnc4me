import { CstParser } from "chevrotain";

import { FANUC_MACRO_B_GRAMMAR } from "./lib";
import {
  AdditionOperator,
  Address,
  BooleanOperator,
  BuiltinFunction,
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
  Then,
  Var
} from "./tokens";

export class MacroParserBase extends CstParser {
  constructor() {
    super(FANUC_MACRO_B_GRAMMAR);
    // debug("initializing");
    this.performSelfAnalysis();
  }

  /**
   * Defining a valid NC program
   */
  public program = this.RULE("program", () => {
    this.SUBRULE(this.StartOfFile);
    this.SUBRULE(this.ProgramNumberLine);
    this.SUBRULE(this.lines);
    this.SUBRULE(this.EndOfFile);
  });

  /**
   *
   */
  public lines = this.RULE("lines", () => {
    this.MANY_SEP({
      SEP: Newline,
      DEF: () => this.SUBRULE(this.Line)
    });
  });

  /**
   * Any number of valid addresses, comments, and/or expressions
   */
  public Line = this.RULE("Line", () => {
    this.MANY(() => {
      this.OR([
        // { ALT: () => this.CONSUME(Newline) },
        { ALT: () => this.CONSUME(LineNumber) },
        { ALT: () => this.CONSUME(Gcode) },
        { ALT: () => this.CONSUME(Mcode) },
        { ALT: () => this.SUBRULE(this.AddressedValue) },
        { ALT: () => this.SUBRULE(this.variableAssignment) },
        { ALT: () => this.SUBRULE(this.conditionalExpression) },
        { ALT: () => this.CONSUME(Comment) }
        // { ALT: () => this.SUBRULE(this.addresses) }
      ]);
    });
  });

  /**
   * A single, capital letter followed by a macro variable
   *
   * @example H#518, X1.2345, Z1., M1, G90
   */
  protected AddressedValue = this.RULE("AddressedValue", () => {
    this.CONSUME(Address);
    this.OPTION(() => {
      this.CONSUME(Minus);
    });
    this.OR([
      { ALT: () => this.CONSUME(NumericValue) },
      { ALT: () => this.SUBRULE(this.VariableLiteral) },
      { ALT: () => this.SUBRULE(this.bracketExpression) }
    ]);
  });

  /**
   * A signed, decimal or integer
   *
   * @example 5, 1.2345, -1., 3000
   */
  protected NumericLiteral = this.RULE("NumericLiteral", () => {
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
  protected VariableLiteral = this.RULE("VariableLiteral", () => {
    this.CONSUME(Var);
    this.CONSUME(Integer);
  });

  /**
   * Number or Macro variable
   */
  protected ValueLiteral = this.RULE("ValueLiteral", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.VariableLiteral) },
      { ALT: () => this.SUBRULE(this.NumericLiteral) }
    ]);
  });
  /**
   *
   */
  protected expression = this.RULE("expression", () => {
    this.SUBRULE(this.additionExpression);
  });

  /**
   * `bracketExpression` has the highest precedence and thus it appears
   * in the "lowest" leaf in the expression ParseTree.
   */
  protected atomicExpression = this.RULE("atomicExpression", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.bracketExpression) },
      { ALT: () => this.SUBRULE(this.functionExpression) },
      { ALT: () => this.SUBRULE(this.NumericLiteral) },
      { ALT: () => this.SUBRULE(this.VariableLiteral) }
    ]);
  });

  /**
   *
   */
  protected additionExpression = this.RULE("additionExpression", () => {
    this.SUBRULE(this.multiplicationExpression, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(AdditionOperator);
      this.SUBRULE2(this.multiplicationExpression, { LABEL: "rhs" });
    });
  });

  /**
   *
   */
  protected multiplicationExpression = this.RULE(
    "multiplicationExpression",
    () => {
      this.SUBRULE(this.atomicExpression, { LABEL: "lhs" });
      this.MANY(() => {
        this.CONSUME(MultiplicationOperator);
        this.SUBRULE2(this.atomicExpression, { LABEL: "rhs" });
      });
    }
  );

  /**
   * Calling a Built-In function
   */
  protected functionExpression = this.RULE("functionExpression", () => {
    this.CONSUME(BuiltinFunction);
    this.CONSUME(OpenBracket);
    this.SUBRULE(this.atomicExpression);
    this.CONSUME(CloseBracket);
  });

  /**
   * Making a comparison between two values
   */
  protected booleanExpression = this.RULE("booleanExpression", () => {
    this.SUBRULE(this.atomicExpression);
    this.CONSUME(BooleanOperator);
    this.SUBRULE2(this.atomicExpression);
  });

  /**
   * If expression to branch control flow
   */
  protected conditionalExpression = this.RULE("conditionalExpression", () => {
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
   * Any expression wrapped in brackets
   *
   * @example [#3 + 4.5]
   */
  protected bracketExpression = this.RULE("bracketExpression", () => {
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
  protected variableAssignment = this.RULE("variableAssignment", () => {
    this.SUBRULE(this.VariableLiteral);
    this.CONSUME(Equals);
    this.SUBRULE(this.expression);
  });

  /**
   * Start of a valid NC File
   */
  protected StartOfFile = this.RULE("StartOfFile", () => {
    this.CONSUME(Percent);
    this.CONSUME(Newline);
  });

  /**
   * End of a valid NC File
   */
  protected EndOfFile = this.RULE("EndOfFile", () => {
    this.CONSUME(Percent);
    this.OPTION(() => {
      this.CONSUME(Newline);
    });
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
}
