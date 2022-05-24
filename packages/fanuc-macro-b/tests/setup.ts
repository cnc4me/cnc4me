import "jest-extended";
import "@cnc4me/jest-matchers";

import { IToken, tokenMatcher, TokenType } from "chevrotain";

function toMatchToken(
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

expect.extend({ toMatchToken });
