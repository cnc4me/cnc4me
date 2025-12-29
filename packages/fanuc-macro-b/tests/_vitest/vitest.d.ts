import "@vitest/expect";
import type { TokenType } from "chevrotain";

interface CustomMatchers<R = unknown> {
  toMatchToken: (tokType: TokenType) => R;
}

declare module "vitest" {
  interface Matchers<T = any> extends CustomMatchers<T> {}
}
