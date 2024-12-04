import { describe, expect, it } from "vitest";

import { MacroLexer, T } from "../../src";

const lexer = new MacroLexer();

describe(`tokenizing program numbers`, () => {
  const tokens = lexer.tokenize("O1234");

  it(`has no errors`, () => {
    expect(lexer.hasErrors).toBeFalsy();
  });

  it(`produces the correct tokens`, () => {
    // expect(tokens).toHaveLength(2);
    expect(tokens[0]).toMatchToken(T.Address);
    expect(tokens[0].image).toBe("O");

    expect(tokens[1]).toMatchToken(T.Integer);
    expect(tokens[1].image).toBe("1234");
  });
});
