type BooleanStateSetter = React.Dispatch<React.SetStateAction<boolean>>;

/**
 * Start on the number you want (included) and the number you want to
 * end on (also included)
 */
export function intRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => i + 1);
}

export function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function toFixed(num: number, precision = 4): string {
  return (Math.round(num * 10000) / 10000).toFixed(precision);
}

export const zeroPad = (num: number, zeroCount = 8) =>
  String(num).padStart(zeroCount, "0");

export const nLine = (num: number, zeroCount = 8) =>
  `N${zeroPad(num, zeroCount)}`;

export function floatInRange(
  min: number,
  max: number,
  precision: number
): number {
  const cMin = Math.ceil(min);
  const fMax = Math.floor(max);
  const num = Math.random() * (fMax - cMin + 1) + cMin;

  return parseFloat(toFixed(num, precision));
}

export function toggle(stateSetter: BooleanStateSetter) {
  return () => stateSetter(prev => !prev);
}
