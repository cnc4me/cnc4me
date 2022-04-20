export function zeroPad(num: number, zeroCount = 8) {
  return String(num).padStart(zeroCount, "0");
}

export function toFixed(num: number, precision = 4): string {
  return (Math.round(num * 10000) / 10000).toFixed(precision);
}

/**
 * Start on the number you want (included) and the number you want to
 * end on (also included)
 */
export function intRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => i + 1);
}
