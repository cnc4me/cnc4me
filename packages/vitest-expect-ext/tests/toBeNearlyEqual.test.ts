import "../src/config";

import { beforeAll, describe, expect, it } from "vitest";
import { DEFAULT_NEARLY_EQUAL_TOLERANCE } from "../src";

beforeAll(() => {
  // Assuming applyExpectExtensions is a function that extends expect with toBeNearlyEqual
  // If not, you can directly use the function in your tests
  // applyExpectExtensions(expect);
});

describe("toBeNearlyEqual function tests", () => {
  it("verifies default tolerance is 1e-7 (0.0000001)", () => {
    expect(DEFAULT_NEARLY_EQUAL_TOLERANCE).toEqual(1e-7);
    expect(DEFAULT_NEARLY_EQUAL_TOLERANCE).toEqual(0.0000001);
  });

  it("1 is nearly equal to 0.9999999 with default tolerance", () => {
    expect(0.9999999).toBeNearlyEqual(1);
  });

  it("0.9999999999 is nearly equal to 1 with default tolerance", () => {
    expect(0.9999999999).toBeNearlyEqual(1);
  });

  it("1.0000000001 is nearly equal to 1 with default tolerance", () => {
    expect(1.0000000001).toBeNearlyEqual(1);
  });

  // Numbers exactly equal
  it("numbers exactly equal are nearly equal", () => {
    expect(1).toBeNearlyEqual(1);
  });

  // Numbers within tolerance
  it("numbers within tolerance are nearly equal", () => {
    expect(1.00000005).toBeNearlyEqual(1);
  });

  // Numbers outside tolerance
  it("numbers outside tolerance are not nearly equal", () => {
    expect(1.00001).not.toBeNearlyEqual(1);
  });

  // Negative numbers
  it("negative numbers are nearly equal if within tolerance", () => {
    expect(-1).toBeNearlyEqual(-1.00000005);
  });

  it("negative numbers are not nearly equal if outside tolerance", () => {
    expect(-1).not.toBeNearlyEqual(-1.00001);
  });

  // Zero and small numbers
  it("zero is nearly equal to a small number within tolerance", () => {
    expect(0).toBeNearlyEqual(1e-8);
  });

  it("zero is not nearly equal to a small number outside tolerance", () => {
    expect(0).not.toBeNearlyEqual(1e-6);
  });

  // Very large numbers
  it("large numbers are nearly equal if within relative tolerance", () => {
    expect(1e200 + 0.00000005).toBeNearlyEqual(1e200);
  });

  // NaN and Infinity
  it("NaN is not nearly equal to any number", () => {
    expect(NaN).not.toBeNearlyEqual(1);
    expect(1).not.toBeNearlyEqual(NaN);
  });

  // Changing default tolerance
  it("changing default tolerance affects comparisons", () => {
    expect(0.99999).toBeNearlyEqual(1, 1e-5);
    expect(0.99999).not.toBeNearlyEqual(1, 1e-10);
  });

  // Providing epsilon parameter
  it("providing epsilon overrides default tolerance", () => {
    expect(0.99999).toBeNearlyEqual(1, 1e-5);
    expect(0.99999).not.toBeNearlyEqual(1, 1e-7);
  });

  // Edge cases for absolute error
  it("uses absolute error when comparing with zero", () => {
    expect(0).toBeNearlyEqual(1e-8);
    expect(0).not.toBeNearlyEqual(1e-6);
  });

  it("zero is nearly equal to negative zero", () => {
    expect(0).toBeNearlyEqual(-0);
  });

  // Testing with both numbers as zero
  it("zero is nearly equal to zero", () => {
    expect(0).toBeNearlyEqual(0);
  });

  // Testing with one number zero and another not zero
  it("zero is not nearly equal to non-zero number beyond tolerance", () => {
    expect(0).not.toBeNearlyEqual(1e-6);
  });

  // Edge case for MIN_VALUE
  it("numbers smaller than MIN_VALUE are treated correctly", () => {
    const tiny = Number.MIN_VALUE / 2;
    expect(tiny).toBeNearlyEqual(0);
  });
});
