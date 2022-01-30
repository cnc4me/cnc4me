import { CstParser } from "chevrotain";

import { ProgramCstNode, VariableAssignmentCstNode } from "../types/fanuc";
import { allTokens } from "./tokens/allTokens";
import { CloseBracket, OpenBracket } from "./tokens/brackets";
import {
  AdditionOperator,
  BooleanOperator,
  MultiplicationOperator,
  NumericValue
} from "./tokens/categories";
import { GotoLine, If, Then } from "./tokens/controlFlow";
import {
  Address,
  BuiltinFunctions,
  Comment,
  Equals,
  Integer,
  Minus,
  Newline,
  Percent,
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
  public program = this.RULE("program", () => {
    this.CONSUME1(Percent);
    this.CONSUME1(Newline);
    this.CONSUME(ProgramNumber);
    this.OPTION(() => {
      this.CONSUME(Comment);
    });
    this.CONSUME2(Newline);
    this.SUBRULE(this.lines);
    this.CONSUME2(Percent);
  });

  public lines = this.RULE("lines", () => {
    this.MANY_SEP({
      SEP: Newline,
      DEF: () => {
        this.SUBRULE(this.line);
      }
    });
  });

  /**
   * Any number of valid addresses, comments, and/or expressions
   */
  public line = this.RULE("line", () => {
    this.OR([
      { ALT: () => this.CONSUME(Percent) },
      { ALT: () => this.CONSUME(Comment) },
      { ALT: () => this.SUBRULE(this.conditionalExpression) },
      { ALT: () => this.SUBRULE(this.variableAssignment) },
      { ALT: () => this.SUBRULE(this.addresses) }
    ]);
  });

  public expression = this.RULE("expression", () => {
    this.SUBRULE(this.additionExpression);
  });

  public additionExpression = this.RULE("additionExpression", () => {
    this.SUBRULE(this.multiplicationExpression, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(AdditionOperator);
      this.SUBRULE2(this.multiplicationExpression, { LABEL: "rhs" });
    });
  });

  public multiplicationExpression = this.RULE(
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
  public functionExpression = this.RULE("functionExpression", () => {
    this.CONSUME(BuiltinFunctions);
    this.CONSUME(OpenBracket);
    // this.SUBRULE(this.ValueLiteral);
    this.SUBRULE(this.atomicExpression);
    // this.OR([
    //   { ALT: () => this.SUBRULE(this.expression) },
    //   { ALT: () => this.SUBRULE2(this.ValueLiteral) }
    // ]);
    this.CONSUME(CloseBracket);
  });

  /**
   * Making a comparison between two values
   */
  public booleanExpression = this.RULE("booleanExpression", () => {
    // this.SUBRULE1(this.ValueLiteral);
    this.SUBRULE(this.atomicExpression);
    this.CONSUME(BooleanOperator);
    // this.SUBRULE2(this.ValueLiteral);
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
    this.OR([
      { ALT: () => this.CONSUME(Then) },
      { ALT: () => this.CONSUME(GotoLine) }
    ]);
  });

  public atomicExpression = this.RULE("atomicExpression", () => {
    this.OR([
      // parenthesisExpression has the highest precedence and thus it appears
      // in the "lowest" leaf in the expression ParseTree.
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
    this.SUBRULE(this.VariableLiteral, { LABEL: "lhs" });
    this.CONSUME(Equals);
    this.SUBRULE(this.expression, { LABEL: "rhs" });
    // this.OR([
    //   { ALT: () => this.SUBRULE(this.expression, { LABEL: "rhs" }) },
    //   { ALT: () => this.SUBRULE(this.bracketExpression, { LABEL: "rhs" }) }
    // ]);
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
      this.SUBRULE(this.AddressedValue);
    });
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
}

export const parser = new MacroParser();
