import "@vitest/expect";

import type { IToken, TokenType } from "chevrotain";

interface CustomMatchers<R = unknown> {
  toMatchToken: (tokType: TokenType) => R;
  toBeWithinTolerance: (received: number, tolerance?: number) => R;
}

declare module "vitest" {
  /* @eslint-disable-line prettier/prettier */
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
