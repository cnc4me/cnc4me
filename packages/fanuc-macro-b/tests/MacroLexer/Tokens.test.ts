import { describe, expect, it } from "vitest";
import { MacroLexer } from "../../src";
import {
  Address,
  BuiltinFunction,
  Decimal,
  Divide,
  Do,
  End,
  Equals,
  EqualTo,
  GotoLine,
  GreaterThan,
  GreaterThanOrEq,
  If,
  Integer,
  LessThan,
  LessThanOrEq,
  Minus,
  Newline,
  NotEqualTo,
  Plus,
  Product,
  Then,
  Var,
  While,
} from "../../src/core/tokens";
import { FANUC_MACRO_B_FNS } from "../../src/lib";
import type { TokenType } from "chevrotain";

const BASIC_CASES: TestCaseData[] = [
  ["\n", Newline],
  ["7", Integer],
  ["1.2", Decimal],
  ["+", Plus],
  ["-", Minus],
  ["/", Divide],
  ["*", Product],
  ["#", Var],
  ["=", Equals],
];

const KEYWORD_CASES: TestCaseData[] = [
  ["IF", If],
  ["THEN", Then],
  ["DO", Do],
  ["WHILE", While],
  ["END", End],
  ["GOTO", GotoLine],
  ["EQ", EqualTo],
  ["NE", NotEqualTo],
  ["LT", LessThan],
  ["LE", LessThanOrEq],
  ["GT", GreaterThan],
  ["GE", GreaterThanOrEq],
];

const ADDRESS_CASES = "ABCDEFHIJKLPQRSTUVWXYZ" // Missing G,M,N,O on purpose, they are reserved
  .split("")
  .map((ltr) => [ltr, Address]) as TestCaseData[];

const FUNCTION_CASES = FANUC_MACRO_B_FNS.map(
  (fn) => [fn, BuiltinFunction] as TestCaseData,
);

const TEST_GROUPS: [label: string, cases: TestCaseData[]][] = [
  ["basic", BASIC_CASES],
  ["address", ADDRESS_CASES],
  ["function", FUNCTION_CASES],
  ["keyword", KEYWORD_CASES],
];

const lexer = new MacroLexer();

describe.each(TEST_GROUPS)(`tokenizing %s tokens`, (_, cases) => {
  describe.each(cases)(`lexing "%s"`, (input, tokenType) => {
    lexer.reset();

    const tokens = lexer.tokenize(input);

    it(`produces token: ${tokenType.name}`, () => {
      expect(lexer.hasErrors).toBeFalsy();
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchToken(tokenType);
      expect(tokens[0].image).toBe(input);
    });
  });
});

type TestCaseData = [input: string, token: TokenType];
