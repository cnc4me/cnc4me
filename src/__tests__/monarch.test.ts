import lang from "../monarch-dev/javascript.lang";

describe("Monarch definition generator", () => {
  it("creates a proper object", () => {
    expect(lang.defaultToken).toBeString();
    expect(lang.tokenPostfix).toBeString();
    expect(lang.keywords).toBeArray();
    expect(lang.typeKeywords).toBeArray();
  });
});
