import debounce from "lodash.debounce";

export function toFixed(num: number, precision = 4): string {
  return (Math.round(num * 10000) / 10000).toFixed(precision);
}

export { debounce };
