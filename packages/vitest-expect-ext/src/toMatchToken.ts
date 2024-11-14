import { tokenMatcher } from "chevrotain";

import type { IToken, TokenType } from "chevrotain";

export function toMatchToken(received: IToken, tokType: TokenType) {
  const pass = tokenMatcher(received, tokType);

  return {
    pass,
    message: () =>
      `expected token "${received.tokenType.name}" to be type "${tokType.name}"`
  };
}
