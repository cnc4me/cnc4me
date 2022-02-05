import { TokenType } from "chevrotain";

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R> {
      toMatchToken(expected: TokenType): CustomMatcherResult;
    }
  }
}

export {};
