export function toBeWithinTolerance(
  received: number,
  expected: number,
  tolerance: number
): jest.CustomMatcherResult {
  const high = expected + tolerance;
  const low = expected - tolerance;
  const pass = received <= high && received >= low;

  return {
    // message: () => `expected ${expected} +/- ${tolerance}, received ${received}`,
    message: () =>
      `expected: ${expected} +/- ${tolerance}\n` +
      `received: ${received}\n` +
      `    high: ${high}\n` +
      `     low: ${low}`,
    pass
  };
}
