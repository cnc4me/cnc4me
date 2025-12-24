import LZ from "lz-string";

export function unbox<T>(arr: T | T[]): T {
  return Array.isArray(arr) ? arr[0] : arr;
}

export function zeroPad(num: number, length: number) {
  return String(num).padStart(length, "0");
}

export function toFixed(num: number, precision = 4): string {
  return (Math.round(num * 10000) / 10000).toFixed(precision);
}

export function encodeLZString(input: string): string {
  return String(LZ.decompressFromEncodedURIComponent(input));
}

export function decodeLZString(input: string): string {
  return LZ.compressToEncodedURIComponent(String(input));
}

/**
 * Generate an array of integers, including start and finish.
 */
export function range(start: number, end: number) {
  end = end + 1; // include the end
  const length = (end - start) / 1;
  return Array.from({ length }, (_, i) => start + i);
}
