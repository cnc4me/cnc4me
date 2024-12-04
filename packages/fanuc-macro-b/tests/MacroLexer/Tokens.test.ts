import { describe, expect, it } from "vitest";

import { FANUC_MACRO_B_FNS, MacroLexer, T } from "../../src";

import type { TokenType } from "chevrotain";

const BASIC_CASES: TestCaseData[] = [
  ["\n", T.Newline],
  ["7", T.Integer],
  ["1.2", T.Decimal],
  ["+", T.Plus],
  ["-", T.Minus],
  ["/", T.Divide],
  ["*", T.Product],
  ["#", T.Var],
  ["=", T.Equals]
];

const CONTROL_FLOW_CASES: TestCaseData[] = [
  ["IF", T.If],
  ["THEN", T.Then],
  ["DO", T.Do],
  ["WHILE", T.While],
  ["GOTO1", T.GotoLine],
  ["GOTO162", T.GotoLine],
  ["GOTO60102", T.GotoLine]
];

const ADDRESS_CASES = "ABCDEFHIJKLPQRSTUVWXYZ" // Missing G,M,N,O on purpose, they are reserved
  .split("")
  .map(ltr => [ltr, T.Address]) as TestCaseData[];

const FUNCTION_CASES = FANUC_MACRO_B_FNS.map(
  fn => [fn, T.BuiltinFunction] as TestCaseData
);

const TEST_GROUPS: [label: string, cases: TestCaseData[]][] = [
  ["basic", BASIC_CASES],
  ["address", ADDRESS_CASES],
  ["function", FUNCTION_CASES],
  ["control-flow", CONTROL_FLOW_CASES]
];

const lexer = new MacroLexer();

describe.each(TEST_GROUPS)(`tokenizing %s tokens`, (_, cases) => {
  describe.each(cases)(`lexing "%s"`, (input, tokenType) => {
    lexer.reset();

    const tokens = lexer.tokenize(input);

    it(`produces <${tokenType.name}> token`, () => {
      expect(lexer.hasErrors).toBeFalsy();
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchToken(tokenType);
      expect(tokens[0].image).toBe(input);
    });
  });
});

type TestCaseData = [input: string, token: TokenType];
