import { IToken, tokenMatcher } from "chevrotain";

import { Comment } from "./tokens/tokens";

export function unwrapComment(token: IToken) {
  if (tokenMatcher(token, Comment)) {
    //
  }
}
