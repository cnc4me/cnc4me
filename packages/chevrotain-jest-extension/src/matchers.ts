import { IToken, tokenMatcher, TokenType } from "chevrotain";

export function toMatchToken(
  this: jest.MatcherContext,
  expected: IToken,
  received: TokenType
): jest.CustomMatcherResult {
  const pass = tokenMatcher(expected, received);

  return {
    message: () => `expected ${expected.tokenType.name} to be ${received.name}`,
    pass
  };
}
