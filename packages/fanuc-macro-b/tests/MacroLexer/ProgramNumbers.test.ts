import { describe, expect, it } from "vitest";

import { MacroLexer } from "../../src";
import { ProgramNumber } from "../../src/tokens";

const lexer = new MacroLexer();

describe(`tokenizing program numbers`, () => {
  const tokens = lexer.tokenize("O1234");

  it(`has no errors`, () => {
    expect(lexer.hasErrors).toBeFalsy();
  });

  it(`produces the correct tokens`, () => {
    // expect(tokens).toHaveLength(2);
    expect(tokens[0]).toMatchToken(ProgramNumber);
    expect(tokens[0].image).toBe("O1234");
    expect(tokens[0].payload).toBe(1234);
  });
});
