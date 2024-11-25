// Convert from BIN (binary) to number
export function parseBinary(bin: string): number {
  return parseInt(bin, 2);
}

// Convert from BCD (binary-coded decimal) to decimal
export function parseBinaryCoded(bcd: string): number {
  const bcdDigits = bcd.match(/.{1,4}/g);

  if (!bcdDigits) {
    throw new Error("Invalid BCD input");
  }

  return parseInt(
    bcdDigits.map(digit => parseInt(digit, 2).toString()).join(""),
    10
  );
}
