export function zeroPad(num: number, zeroCount = 8) {
  return String(num).padStart(zeroCount, "0");
}
