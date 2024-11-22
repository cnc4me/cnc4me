export function toMatchWithPrecision(
  received: number,
  expected: number,
  precision: number
) {
  const truncatedReceived = truncateToPrecision(received, precision);
  const truncatedExpected = truncateToPrecision(expected, precision);
  const pass = truncatedReceived === truncatedExpected;

  return {
    pass,
    message: () => {
      return pass
        ? `expected ${received} not to match ${expected} at ${precision} decimal places`
        : [
            `expected values to match at precision ${precision}`,
            `   Received = ${received} (truncated to ${truncatedReceived})`,
            `   Expected = ${expected} (truncated to ${truncatedExpected})`
          ].join("\n");
    }
  };
}

function truncateToPrecision(value: number, precision: number): number {
  const factor = 10 ** precision;
  return Math.floor(value * factor) / factor;
}
