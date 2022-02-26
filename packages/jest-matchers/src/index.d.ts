/* eslint-disable @typescript-eslint/no-empty-interface */
interface CustomMatchers<R = unknown> {
  toBeWithinTolerance(expected: number, tolerance: number): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}

export {};
