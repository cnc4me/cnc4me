export const zeroPad = (num: number, zeroCount = 8) =>
  String(num).padStart(zeroCount, "0");
