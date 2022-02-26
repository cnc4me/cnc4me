import { IToken, tokenMatcher, TokenType } from "chevrotain";

export function toMatchToken(
  expected: IToken,
  given: unknown
): jest.CustomMatcherResult {
  const pass = tokenMatcher(expected, given as TokenType);

  return {
    message: () =>
      `expected ${expected.tokenType.name} to be ${(given as TokenType).name}`,
    pass
  };
}
