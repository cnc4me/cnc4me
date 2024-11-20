import { tokenMatcher } from "chevrotain";

import type { IToken, TokenType } from "chevrotain";

export function toMatchToken(received: IToken, tokType: TokenType) {
  if (!received && tokType) {
    return {
      pass: false,
      // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
      message: () => `expected token "${received}" to be type "${tokType.name}"`
    };
  }
  if (received && !tokType) {
    return {
      pass: false,
      message: () =>
        `matcher for token "${received.tokenType.name}" was undefined.`
    };
  }
  return {
    pass: tokenMatcher(received, tokType),
    message: () =>
      `expected token "${received.tokenType.name}" to be type "${tokType.name}"`
  };
}
