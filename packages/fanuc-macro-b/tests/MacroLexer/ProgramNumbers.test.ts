import { describe, expect, it } from "vitest";

import { MacroLexer } from "../../src";
import { ProgramNumber } from "../../src/tokens";

const lexer = new MacroLexer();

describe.each([
  ["O1"],
  ["O01"],
  ["O001"],
  ["O0001"],
  ["O9999"] //
] as const)(`tokenizing program numbers`, prgNum => {
  it(`correctly identifies "${prgNum}"`, () => {
    const tokens = lexer.tokenize(prgNum);

    expect(lexer.hasErrors).toBeFalsy();
    expect(tokens[0]).toMatchToken(ProgramNumber);
    expect(tokens[0].image).toBe(prgNum);
  });
});
