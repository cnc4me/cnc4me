export const DEFAULT_WITHIN_PRECISION_VALUE = 5;

export function toMatchWithPrecision(
  received: number,
  expected: number,
  precision = DEFAULT_WITHIN_PRECISION_VALUE
) {
  if (!Number.isFinite(received) || !Number.isFinite(expected)) {
    throw new Error("Both received and expected must be finite numbers.");
  }

  const roundedReceived = roundToPrecision(received, precision);
  const roundedExpected = roundToPrecision(expected, precision);
  const pass = roundedReceived === roundedExpected;

  return {
    pass,
    message: () => {
      return pass
        ? `expected ${received} not to match ${expected} at ${precision} decimal places`
        : [
            `expected values to match at precision ${precision}`,
            `   Received = ${received} (rounded to ${roundedReceived})`,
            `   Expected = ${expected} (rounded to ${roundedExpected})`
          ].join("\n");
    }
  };
}

function roundToPrecision(value: number, precision: number): number {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}
