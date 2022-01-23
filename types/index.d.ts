/* eslint-disable @typescript-eslint/no-unused-vars */
import { TokenType } from "chevrotain";

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchToken(expected: TokenType): CustomMatcherResult;
    }
  }
}

export {};
