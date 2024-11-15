/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import "@vitest/expect";

import type { TokenType } from "chevrotain";

interface CustomMatchers<R = unknown> {
  toMatchToken: (tokType: TokenType) => R;
  toMatchWithPrecision: (received: number, precision?: number) => R;
  toMatchWithinTolerance: (received: number, tolerance?: number) => R;
}

declare module "vitest" {
  /* @eslint-disable-line prettier/prettier */
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
