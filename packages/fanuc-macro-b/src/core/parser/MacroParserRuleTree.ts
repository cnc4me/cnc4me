import { CstParser } from "chevrotain";
import { Debuggers } from "../../utils/debug";
import {
  AdditionOperator,
  Address,
  BooleanOperator,
  BuiltinFunction,
  CloseBracket,
  Comment,
  Do,
  End,
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
  Var,
  While,
  WhiteSpace,
} from "../tokens";
import { FANUC_MACRO_B_GRAMMAR } from "./MacroGrammar";
import type { ConsumeMethodOpts, IToken, TokenType } from "chevrotain";

const $d = Debuggers.Parser;

export class MacroParserRuleTree extends CstParser {
  /**
   * Utilize the generic to get the token name
   *
   * @see https://github.com/Chevrotain/chevrotain/issues/1987#issuecomment-1709854026
   */
  public override CONSUME<S extends TokenType>(
    token: S,
    options?: ConsumeMethodOpts,
  ) {
    const _debug = $d.extend("consume");
    _debug(String(token.tokenTypeIdx).padStart(2, " "), token.name);
    return super.CONSUME(token, options) as Omit<IToken, "tokenType"> & {
      tokenType: S;
    };
  }

  constructor() {
    super(FANUC_MACRO_B_GRAMMAR);
    $d("initializing");
    this.performSelfAnalysis();
    $d("ready");
  }

  /**
   * Multiple NC Programs
   */
  public Programs = this.RULE("Programs", () => {
    this.MANY_SEP({
      SEP: Newline,
      DEF: () => this.SUBRULE(this.Program),
    });
  });

  /**
   * Defining a valid NC Program
   */
  public Program = this.RULE("Program", () => {
    this.CONSUME(Percent);
    this.OPTION(() => this.CONSUME(Newline));
    this.SUBRULE(this.ProgramNumberLine);
    this.SUBRULE(this.Lines);
    this.OPTION1(() => this.CONSUME1(Newline));
    this.CONSUME1(Percent);
  });

  /**
   *
   */
  public Lines = this.RULE("Lines", () => {
    this.MANY_SEP({
      SEP: Newline,
      DEF: () => this.SUBRULE(this.Line),
    });
  });

  /**
   * Any number of valid addresses, comments, and/or Expressions
   */
  public Line = this.RULE("Line", () => {
    this.MANY(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.AddressedValue) },
        { ALT: () => this.SUBRULE(this.EndStatement) },
        { ALT: () => this.SUBRULE(this.GoToStatement) },
        { ALT: () => this.SUBRULE(this.VariableAssignment) },
        { ALT: () => this.SUBRULE(this.ConditionalExpression) },
        { ALT: () => this.SUBRULE(this.WhileDoExpression) },
        { ALT: () => this.SUBRULE(this.Expression) },
        { ALT: () => this.CONSUME(LineNumber) },
        { ALT: () => this.CONSUME(Mcode) },
        { ALT: () => this.CONSUME(Gcode) },
        { ALT: () => this.CONSUME(Comment) },
      ]);
    });
  });

  /**
   * Assigning a variable with a value
   *
   * @example
   *   #500 = 12.3456
   *   #501 = [2 + 0.5]
   *   #502 = [#501 / 2]
   */
  VariableAssignment = this.RULE("VariableAssignment", () => {
    this.SUBRULE(this.VariableLiteral);
    this.CONSUME(Equals);
    this.SUBRULE(this.Expression);
  });

  /**
   * End of a WHILE loop
   */
  DoStatement = this.RULE("DoStatement", () => {
    this.CONSUME(Do);
    this.OPTION(() => this.CONSUME(WhiteSpace));
    this.CONSUME(Integer, { LABEL: "BlockNumber" });
  });

  /**
   * End of a WHILE loop
   */
  EndStatement = this.RULE("EndStatement", () => {
    this.CONSUME(End);
    this.OPTION(() => this.CONSUME(WhiteSpace));
    this.CONSUME(Integer, { LABEL: "BlockNumber" });
  });

  /**
   * Go To Line
   */
  GoToStatement = this.RULE("GoToStatement", () => {
    this.CONSUME(GotoLine);
    this.OPTION(() => this.CONSUME(WhiteSpace));
    this.CONSUME(Integer, { LABEL: "BlockNumber" });
  });

  /**
   * If Expression to branch control flow
   */
  ConditionalExpression = this.RULE("ConditionalExpression", () => {
    this.CONSUME(If);
    this.SUBRULE(this.AtomicBooleanExpression);
    this.OR([
      {
        ALT: () => {
          this.CONSUME(Then);
          this.OPTION(() => this.CONSUME(WhiteSpace));
          this.SUBRULE(this.VariableAssignment);
        },
      },
      {
        ALT: () => {
          this.OPTION1(() => this.CONSUME1(WhiteSpace));
          this.SUBRULE(this.GoToStatement);
        },
      },
    ]);
  });

  /**
   * While loop construct
   */
  WhileDoExpression = this.RULE("WhileDoExpression", () => {
    this.SUBRULE(this.AtomicWhileExpression, { LABEL: "WhileLoopPredicate" });
    this.SUBRULE(this.DoStatement);
    // this.SUBRULE1(this.Lines); // @TODO 👈🏻 This is causing recursion...
    // this.SUBRULE2(this.EndStatement);
  });

  AtomicWhileExpression = this.RULE("AtomicWhileExpression", () => {
    this.CONSUME(While);
    this.SUBRULE(this.AtomicBooleanExpression);
  });

  AtomicBooleanExpression = this.RULE("AtomicBooleanExpression", () => {
    this.CONSUME(OpenBracket);
    this.SUBRULE(this.BooleanExpression);
    this.CONSUME(CloseBracket);
  });

  /**
   * `BracketExpression` has the highest precedence and thus it appears
   * in the "lowest" leaf in the Expression ParseTree.
   */
  AtomicExpression = this.RULE("AtomicExpression", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.FunctionExpression) },
      { ALT: () => this.SUBRULE(this.BracketExpression) },
      { ALT: () => this.SUBRULE(this.NumericLiteral) },
      { ALT: () => this.SUBRULE(this.VariableLiteral) },
    ]);
  });

  /**
   * Making a comparison between two values
   */
  BooleanExpression = this.RULE("BooleanExpression", () => {
    this.SUBRULE(this.AtomicExpression, { LABEL: "lhs" });
    this.CONSUME(BooleanOperator);
    this.SUBRULE2(this.AtomicExpression, { LABEL: "rhs" });
  });

  /**
   * Lowest precedence thus it is first in the rule chain
   * The precedence of binary Expressions is determined by how far down the Parse Tree
   * The binary Expression appears.
   */
  AdditionExpression = this.RULE("AdditionExpression", () => {
    this.SUBRULE(this.MultiplicationExpression, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(AdditionOperator);
      this.SUBRULE2(this.MultiplicationExpression, { LABEL: "rhs" });
    });
  });

  /**
   *
   */
  MultiplicationExpression = this.RULE("MultiplicationExpression", () => {
    this.SUBRULE(this.AtomicExpression, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(MultiplicationOperator);
      this.SUBRULE2(this.AtomicExpression, { LABEL: "rhs" });
    });
  });

  /**
   * Calling a Built-In function
   */
  FunctionExpression = this.RULE("FunctionExpression", () => {
    this.CONSUME(BuiltinFunction, { LABEL: "FunctionName" });
    this.SUBRULE(this.BracketExpression);
  });

  /**
   * Any Expression wrapped in brackets
   *
   * @example [#3 + 4.5]
   */
  BracketExpression = this.RULE("BracketExpression", () => {
    this.CONSUME(OpenBracket);
    this.SUBRULE(this.Expression);
    this.CONSUME(CloseBracket);
  });

  /**
   *
   */
  Expression = this.RULE("Expression", () => {
    return this.SUBRULE(this.AdditionExpression);
  });

  /**
   * A single, capital letter followed by number or
   * macro variable reference
   *
   * @example H#518, X1.2345, Z1., M1, G90
   */
  AddressedValue = this.RULE("AddressedValue", () => {
    this.CONSUME(Address);
    this.OPTION(() => this.CONSUME(Minus));
    this.OR([
      { ALT: () => this.CONSUME(NumericValue) },
      { ALT: () => this.SUBRULE(this.BracketExpression) },
      { ALT: () => this.SUBRULE(this.VariableLiteral) },
    ]);
  });

  /**
   * A signed, decimal or integer
   *
   * @example 5, 1.2345, -1., 3000
   */
  NumericLiteral = this.RULE("NumericLiteral", () => {
    this.OPTION(() => this.CONSUME(Minus));
    this.CONSUME(NumericValue);
  });

  /**
   * Pound sign `#` followed by an integer representing a variable register
   *
   * @example "#518" or "#152"
   */
  VariableLiteral = this.RULE("VariableLiteral", () => {
    this.CONSUME(Var);
    this.CONSUME(Integer);
  });

  /**
   * Pound sign `#` followed by a bracketed expression to evaluate the register number
   *
   * @example "#[1+2]" to use #3
   * @example "#[#1+#2]=1" would set #3=1 if #1=1 and #2=2
   */
  VariableExpression = this.RULE("VariableExpression", () => {
    this.CONSUME(Var);
    this.SUBRULE(this.BracketExpression);
  });

  /**
   * Number or Macro variable
   */
  ValueLiteral = this.RULE("ValueLiteral", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.VariableLiteral) },
      { ALT: () => this.SUBRULE(this.NumericLiteral) },
    ]);
  });

  /**
   * Start of a valid NC File
   */
  StartOfFile = this.RULE("StartOfFile", () => {
    this.CONSUME(Percent);
    this.CONSUME(Newline);
  });

  /**
   * A line consisting of a program number and optional comment
   */
  ProgramNumberLine = this.RULE("ProgramNumberLine", () => {
    this.CONSUME(ProgramNumber);
    this.OPTION(() => this.CONSUME(Comment));
    this.CONSUME(Newline);
  });

  /**
   * End of a valid NC File
   */
  EndOfFile = this.RULE("EndOfFile", () => {
    this.CONSUME(Percent);
    this.OPTION(() => this.CONSUME(Newline));
  });
}
