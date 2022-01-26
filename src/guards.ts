import { IToken, tokenMatcher, TokenType } from "chevrotain";

export function isA(tokType: TokenType) {
  return (token: IToken) => tokenMatcher(token, tokType);
}

export function createMatcher(
  tokType: TokenType,
  action: {
    MATCH: (token: IToken) => void;
    NO_MATCH: (token: IToken) => void;
  }
) {
  return (token: IToken) => {
    if (tokenMatcher(token, tokType)) {
      action.MATCH(token);
    } else {
      action.NO_MATCH(token);
    }
  };
}
