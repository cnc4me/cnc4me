import { beforeEach, describe, expect, it } from "vitest";

import { MacroLexer, T } from "../../src";

const lexer = new MacroLexer();

const TEST_CASES = [
  ["M8"], //
  ["M22"],
  ["M109"]
];

beforeEach(() => lexer.reset());

describe.each(TEST_CASES)(
  `can tokenize the string "%s" as an M Code`,
  input => {
    const tokens = lexer.tokenize(input);

    it("has no errors", () => {
      expect(lexer.hasErrors).toBeFalsy();
    });

    it("has the correct number of tokens", () => {
      expect(tokens).toHaveLength(1);
    });

    it("has the correct token image", () => {
      expect(tokens[0].image).toBe(input);
    });

    it("matches the correct token type", () => {
      expect(tokens[0]).toMatchToken(T.Mcode);
    });
  }
);

describe.skip(`errors with invalid M Codes`, () => {
  const tokens = lexer.tokenize("M-1");

  it("has errors", () => {
    expect(lexer.getErrors()).toHaveLength(1);
  });

  it("has no tokens", () => {
    expect(tokens).toHaveLength(0);
  });
});
