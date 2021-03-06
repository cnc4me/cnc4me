import { parser } from "../example/parser";
import { generateTsNode } from "../src";

describe("generateTsNode()", () => {
  const result = generateTsNode(parser);
  it("should be a declaration file", () => {
    expect(result.isDeclarationFile).toBeTrue();
  });

  it("should have start and end positions", () => {
    expect(result.pos).toBeInteger();

    expect(result.end).toBeInteger();
  });

  it("should have flags", () => {
    expect(result.flags).toBeInteger();
  });

  it("should be the correct `kind` of node", () => {
    expect(result.kind).toBeInteger();
    expect(result.kind).toBe(303);
  });

  it("should be an array of statements", () => {
    expect(result.statements).toBeArray();
    expect(result.statements.length).toBeGreaterThan(0);
  });
});
