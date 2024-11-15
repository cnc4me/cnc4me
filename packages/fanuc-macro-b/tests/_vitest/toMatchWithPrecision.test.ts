import { describe, expect, it } from "vitest";

describe("testing the expect extension 'toMatchWithPrecision'", () => {
  const bigFloat = 0.123456789;

  it("should pass when the numbers are close within the specified precision", () => {
    expect(bigFloat).toMatchWithPrecision(0.12345, 1);
    expect(bigFloat).toMatchWithPrecision(0.12345, 2);
    expect(bigFloat).toMatchWithPrecision(0.12345, 3);
    expect(bigFloat).toMatchWithPrecision(0.12345, 4);
    expect(bigFloat).toMatchWithPrecision(0.12345, 5);
    expect(bigFloat).not.toMatchWithPrecision(0.12345, 6);
    expect(bigFloat).toMatchWithPrecision(0.123456, 6);
    expect(bigFloat).toMatchWithPrecision(0.1234567, 7);
    expect(bigFloat).toMatchWithPrecision(0.12345678, 8);
    expect(bigFloat).not.toMatchWithPrecision(0.12345678, 9);
  });
});
