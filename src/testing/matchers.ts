import { IToken, tokenMatcher, TokenType } from "chevrotain";

export function toMatchToken(received: IToken, tokType: TokenType) {
  const pass = tokenMatcher(received, tokType);

  return {
    message: () => `expected ${received.tokenType.name} to be ${tokType.name}`,
    pass
  };
}
