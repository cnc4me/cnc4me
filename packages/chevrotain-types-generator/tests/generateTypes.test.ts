/* eslint-disable no-useless-escape */
import { generateTypes } from "..";
import { parser } from "../example/parser/json-parser";

describe("generateTypes()", () => {
  it("should generate a proper types file in string format", () => {
    const result = generateTypes(parser);
    const lines = result.split("\n");

    expect(lines[0]).toBe(`import type { CstNode, ICstVisitor, IToken } from "chevrotain";`);
    expect(lines[1]).toBe(``);
    expect(lines[2]).toBe(`export interface JsonCstNode extends CstNode {`);
    expect(lines[3]).toBe(`  name: \"json\";`);
    expect(lines[4]).toBe(`  children: JsonCstChildren;`);
    expect(lines[5]).toBe(`}`);
  });
});
