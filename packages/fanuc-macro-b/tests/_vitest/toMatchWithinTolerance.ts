export const DEFAULT_WITHIN_TOLERANCE_VALUE = 5e-7;

export function toMatchWithinTolerance(
  received: number,
  expected: number,
  tolerance = DEFAULT_WITHIN_TOLERANCE_VALUE
) {
  const difference = Math.abs(received - expected);
  const pass = difference < tolerance;

  return {
    pass,
    message: () => {
      return composeErrorMsg(pass, received, expected, tolerance, difference);
    }
  };
}

function composeErrorMsg(
  pass: boolean,
  r: string | number,
  e: string | number,
  t: string | number,
  d: string | number
): string {
  return pass
    ? `expected ${r} not to be nearly equal to ${e}`
    : [
        `expected values to be nearly equal`,
        `   Recieved = ${r}`,
        `   Expected = ${e}`,
        ` Difference = ${d}`,
        `  Tolerance = ${t}`
      ].join("\n");
}
