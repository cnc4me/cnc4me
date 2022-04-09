/* eslint-disable @typescript-eslint/no-empty-interface */
import type { IToken } from "chevrotain";

interface CustomMatchers<R = unknown> {
  toMatchToken(expected: IToken, given: unknown): R;
}

declare global {
  namespace expect {}
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}

export {};
