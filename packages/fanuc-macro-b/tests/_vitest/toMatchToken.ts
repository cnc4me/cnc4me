import { tokenMatcher } from "chevrotain";
import type { IToken, TokenType } from "chevrotain";

export function toMatchToken(received: IToken, tokType: TokenType) {
  if (!received && tokType) {
    return {
      pass: false,
      message: () =>
        `expected token "${received}" to be type "${tokType.name}"`,
    };
  }
  if (received && !tokType) {
    return {
      pass: false,
      message: () =>
        `Expected value for <${received.tokenType.name}> token was undefined.`,
    };
  }
  return {
    pass: tokenMatcher(received, tokType),
    message: () =>
      `expected token "${received.tokenType.name}" to be type "${tokType.name}"`,
  };
}
