import { parser } from "../example/json-parser";
import { generateTypes } from "../src";

const result = generateTypes({ parser });

describe("generateTypes()", () => {
  it("should generate types", () => {
    expect(typeof result).toBe("string");
  });
});
