/* eslint-disable @typescript-eslint/no-unused-vars */
import { IToken, TokenType } from "chevrotain";

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchToken(expected: TokenType): CustomMatcherResult;
    }
  }
}

export {};
