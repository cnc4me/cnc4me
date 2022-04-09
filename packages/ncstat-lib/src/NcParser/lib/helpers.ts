export function parseNumber(numberStr: string): number {
  return numberStr.includes(".")
    ? parseFloat(numberStr)
    : parseInt(numberStr);
}

export function splitParse(
  address: string
): { prefix: string; value: number } {
  return {
    prefix: address.substring(0, 1),
    value: parseNumber(address.substring(1))
  };
}
