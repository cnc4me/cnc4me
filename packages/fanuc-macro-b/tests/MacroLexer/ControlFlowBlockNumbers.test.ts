import { beforeEach, describe, expect, it } from "vitest";
import { MacroLexer } from "../../src";
import { Do, End, GotoLine, Integer } from "../../src/core/tokens";

// Define test cases in a data-driven manner
const testCases = [
  { input: "DO1", tokenType: Do, expectedInteger: "1" },
  { input: "DO 5", tokenType: Do, expectedInteger: "5" },
  { input: "DO40", tokenType: Do, expectedInteger: "40" },
  { input: "DO 99", tokenType: Do, expectedInteger: "99" },
  { input: "END1", tokenType: End, expectedInteger: "1" },
  { input: "END 8", tokenType: End, expectedInteger: "8" },
  { input: "END123", tokenType: End, expectedInteger: "123" },
  { input: "END 333", tokenType: End, expectedInteger: "333" },
  { input: "GOTO1", tokenType: GotoLine, expectedInteger: "1" },
  { input: "GOTO 2", tokenType: GotoLine, expectedInteger: "2" },
  { input: "GOTO12345", tokenType: GotoLine, expectedInteger: "12345" },
  { input: "GOTO 98765", tokenType: GotoLine, expectedInteger: "98765" },
];

describe(`tokenizing control flow tokens with block numbers`, () => {
  const lexer = new MacroLexer();

  beforeEach(() => lexer.reset());

  testCases.forEach(({ input, tokenType, expectedInteger }) => {
    describe(`parsing "${input}"`, () => {
      const tokens = lexer.tokenize(input);

      it(`produces token: <${tokenType.name}>`, () => {
        // Extract keyword by removing the digits at the end
        const keyword = input.replace(/\d+$/, "").trim();
        expect(tokens[0].image).toBe(keyword);
        expect(tokens[0]).toMatchToken(tokenType);
      });

      it(`produces token: <Integer image="${expectedInteger}">`, () => {
        expect(tokens[1]).toMatchToken(Integer);
        expect(tokens[1].image).toBe(expectedInteger);
      });
    });
  });
});
