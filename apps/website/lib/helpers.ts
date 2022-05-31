import debounce from "lodash.debounce";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent
} from "lz-string";

export function unbox<T>(arr: T | T[]): T {
  return Array.isArray(arr) ? arr[0] : arr;
}

export function toFixed(num: number, precision = 4): string {
  return (Math.round(num * 10000) / 10000).toFixed(precision);
}

export function encodeString(input: string): string {
  return String(decompressFromEncodedURIComponent(input));
}

export function decodeString(input: string): string {
  return compressToEncodedURIComponent(String(input));
}

export { debounce };
