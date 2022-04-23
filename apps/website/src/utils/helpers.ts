export function zeroPad(num: number, zeroCount = 8) {
  return String(num).padStart(zeroCount, "0");
}

export function toFixed(num: number, precision = 4): string {
  return (Math.round(num * 10000) / 10000).toFixed(precision);
}
