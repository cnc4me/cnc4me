import "../src";

describe("custom matchers", () => {
  it("passes when value is within tolerance", () => {
    expect(1.0).toBeWithinTolerance(1, 1e-10);
    expect(1.02).toBeWithinTolerance(1, 0.1);
    expect(1.007).toBeWithinTolerance(1, 0.01);
    expect(6.4995).toBeWithinTolerance(6.5, 0.002);
  });

  it("fails when above or below tolerance", () => {
    expect(0.9997).not.toBeWithinTolerance(1, 0.0002);
    expect(1.011).not.toBeWithinTolerance(1, 0.01);
    expect(1.007).not.toBeWithinTolerance(1, 0.005);
    expect(1.0003).not.toBeWithinTolerance(1, 0.0002);
  });
});
