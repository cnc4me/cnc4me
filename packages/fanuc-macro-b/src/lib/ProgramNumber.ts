/**
 * Attempt to match a valid NC program identifier
 */
export function match(input: string): number | null {
  const result = isValid(input);
  return result ? Number(result[1]) : null;
}

export function isValid(input: string): RegExpMatchArray | null {
  const cleanedInput = input.replace(/^%|[\n\r]/, "").trim();
  return cleanedInput.match(/^O([0-9]+)/);
}

export default { isValid, match };
