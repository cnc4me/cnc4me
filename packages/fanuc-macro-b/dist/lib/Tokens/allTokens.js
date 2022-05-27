import { AdditionOperator, Address, BooleanOperator, Brackets, BuiltinFunctions, CloseBracket, CloseParen, Comma, Comment, ControlFlowKeyword, Decimal, Divide, Do, Equals, EqualTo, Gcode, GotoLine, GreaterThan, GreaterThanOrEq, If, Integer, LessThan, LessThanOrEq, Mcode, Minus, MultiplicationOperator, Newline, NotEqualTo, NumericValue, OpenBracket, OpenParen, Percent, Plus, Product, ProgramNumber, Then, Var, While, WhiteSpace } from ".";
import { LineNumber } from "./tokens";
/**
 * The order of tokens is important because token
 *  matches are applied sequentially
 */
export const allTokens = [
    Newline,
    WhiteSpace,
    Percent,
    Comment,
    EqualTo,
    NotEqualTo,
    GreaterThan,
    GreaterThanOrEq,
    LessThan,
    LessThanOrEq,
    If,
    Do,
    Then,
    While,
    GotoLine,
    BuiltinFunctions,
    Var,
    Equals,
    Comma,
    Divide,
    Product,
    Minus,
    Plus,
    Gcode,
    Mcode,
    LineNumber,
    ProgramNumber,
    Address,
    Decimal,
    Integer,
    OpenParen,
    CloseParen,
    OpenBracket,
    CloseBracket,
    /**
     * Categories
     */
    ControlFlowKeyword,
    Brackets,
    NumericValue,
    BooleanOperator,
    AdditionOperator,
    MultiplicationOperator
];
