import { beforeEach, describe, expect, it } from "vitest";

import { Gcode, MacroLexer, range } from "../../src";

const lexer = new MacroLexer();

const TEST_CASES = [
  ...range(1, 9).map(n => [`G${n}`]), // Single Digit
  ...range(54, 59).map(n => [`G${n}`]), // Work Offsets
  ["G200"], // Three Digit
  ["G54.1"] // With Decimal
];

beforeEach(() => lexer.reset());

describe.each(TEST_CASES)(`can tokenize the string "%s" as a G Code`, input => {
  const tokens = lexer.tokenize(input);

  it("has no errors", () => {
    expect(lexer.getErrors()).toHaveLength(0);
  });

  it("has the correct number of tokens", () => {
    expect(tokens).toHaveLength(1);
  });

  it("has the correct token image", () => {
    expect(tokens[0].image).toBe(input);
  });

  it("matches the correct token type", () => {
    expect(tokens[0]).toMatchToken(Gcode);
  });
});
