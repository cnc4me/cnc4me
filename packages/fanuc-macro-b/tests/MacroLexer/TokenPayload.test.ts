import { beforeEach, describe, expect, it } from "vitest";

import { MacroLexer } from "../../src";
import { Do, End } from "../../src/tokens";

const lexer = new MacroLexer();

describe(`tokenizing tokens with payloads`, () => {
  beforeEach(() => lexer.reset());

  it(`produces END token and NUMBER`, () => {
    const tokens = lexer.tokenize("END1");

    expect(lexer.hasErrors).toBeFalsy();
    expect(tokens).toHaveLength(1);
    expect(tokens[0]).toMatchToken(End);
    expect(tokens[0].image).toBe("END");
  });

  it(`produces DO token and NUMBER`, () => {
    const tokens = lexer.tokenize("DO1");

    expect(lexer.hasErrors).toBeFalsy();
    expect(tokens).toHaveLength(1);
    expect(tokens[0]).toMatchToken(Do);
    expect(tokens[0].image).toBe("END");
  });
});
