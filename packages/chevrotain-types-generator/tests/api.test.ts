import { unlink } from "node:fs/promises";
import path from "node:path";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { generateTsNode, generateTypes } from "../src";
import { parser } from "./sample/parser";

beforeAll(cleanTestFiles);

describe("generateTsNode()", () => {
  const result = generateTsNode(parser);

  it("should be a declaration file", () => {
    expect(result.isDeclarationFile).toBeTruthy();
  });

  it("should have start and end positions", () => {
    expect(result.pos).toBeTypeOf("number");
    expect(result.end).toBeTypeOf("number");
  });

  it("should have flags", () => {
    expect(result.flags).toBeTypeOf("number");
  });

  it("should be the correct `kind` of node", () => {
    expect(result.kind).toBeTypeOf("number");
    expect(result.kind).toBe(307);
  });

  it("should be an array of statements", () => {
    expect(Array.isArray(result.statements)).toBeTruthy();
    expect(result.statements.length).toBeGreaterThan(0);
  });
});

describe("generateTypes()", () => {
  const result = generateTypes(parser);

  it("should generate a proper types file in string format", () => {
    const lines = result.split("\n");

    expect(lines[0]).toBe(
      `import type { CstNode, ICstVisitor, IToken } from "chevrotain";`
    );
    expect(lines[1]).toBe(``);
    expect(lines[2]).toBe(`export interface JsonCstNode extends CstNode {`);
    // eslint-disable-next-line no-useless-escape
    expect(lines[3]).toBe(`  name: \"json\";`);
    expect(lines[4]).toBe(`  children: JsonCstChildren;`);
    expect(lines[5]).toBe(`}`);
  });
});

afterAll(cleanTestFiles);

async function cleanTestFiles() {
  const outDir = path.join(import.meta.dirname, "sample", "out");
  const ast = path.join(outDir, "ast.json");
  const types = path.join(outDir, "__generated__.d.ts");
  try {
    await unlink(ast);
    await unlink(types);
  } catch (e) {
    //
  }
}
