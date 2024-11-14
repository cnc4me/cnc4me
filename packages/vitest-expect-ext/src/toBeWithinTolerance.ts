export const DEFAULT_WITHIN_TOLERANCE_VALUE = 1e-7;

export function toBeWithinTolerance(
  received: number,
  expected: number,
  tolerance = DEFAULT_WITHIN_TOLERANCE_VALUE
) {
  const difference = Math.abs(received - expected);
  const pass = difference < tolerance;

  return {
    pass,
    message: () => composeErrorMsg(pass, received, expected, tolerance, difference)
  };
}

function composeErrorMsg(pass: boolean, r: any, e: any, t: any, d: any) {
  return pass
    ? `expected ${r} not to be nearly equal to ${e}`
    : [
      `expected ${r} to be nearly equal to ${e}`,
      ` Difference = ${d}`,
      `  Tolerance = ${t}`,
    ].join("\n");
}
