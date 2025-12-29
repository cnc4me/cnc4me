import { beforeEach, describe, expect, it } from "vitest";
import { MacroLexer, T } from "../../src";

const lexer = new MacroLexer();

beforeEach(() => lexer.reset());

describe("can tokenize a G10 line", () => {
  const inputText = `G10 G90 L2 P1 X1.2 Y3.4 Z-5.6 B90.`;
  const tokens = lexer.tokenize(inputText);

  it("has no errors", () => {
    expect(lexer.hasErrors).toBeFalsy();
  });

  it("has the correct number of tokens", () => {
    expect(tokens).toHaveLength(15);
  });

  it("has the correct token images", () => {
    expect(tokens[0].image).toBe("G10");
    expect(tokens[1].image).toBe("G90");
    expect(tokens[2].image).toBe("L");
    expect(tokens[3].image).toBe("2");
    expect(tokens[4].image).toBe("P");
    expect(tokens[5].image).toBe("1");
    expect(tokens[6].image).toBe("X");
    expect(tokens[7].image).toBe("1.2");
    expect(tokens[8].image).toBe("Y");
    expect(tokens[9].image).toBe("3.4");
    expect(tokens[10].image).toBe("Z");
    expect(tokens[11].image).toBe("-");
    expect(tokens[12].image).toBe("5.6");
    expect(tokens[13].image).toBe("B");
    expect(tokens[14].image).toBe("90.");
  });

  it("matches the correct token types", () => {
    expect(tokens[0]).toMatchToken(T.Gcode);
    expect(tokens[1]).toMatchToken(T.Gcode);
    expect(tokens[2]).toMatchToken(T.Address);
    expect(tokens[3]).toMatchToken(T.Integer);
    expect(tokens[4]).toMatchToken(T.Address);
    expect(tokens[5]).toMatchToken(T.Integer);
    expect(tokens[6]).toMatchToken(T.Address);
    expect(tokens[7]).toMatchToken(T.Decimal);
    expect(tokens[8]).toMatchToken(T.Address);
    expect(tokens[9]).toMatchToken(T.Decimal);
    expect(tokens[10]).toMatchToken(T.Address);
    expect(tokens[11]).toMatchToken(T.Minus);
    expect(tokens[12]).toMatchToken(T.Decimal);
    expect(tokens[13]).toMatchToken(T.Address);
    expect(tokens[14]).toMatchToken(T.Decimal);
  });
});

describe("can tokenize with newlines", () => {
  const inputText = `M22
    B-34.2
    M21`;
  const tokens = lexer.tokenize(inputText);

  it("has no errors", () => {
    expect(lexer.getErrors()).toHaveLength(0);
  });

  it("has the correct number of tokens", () => {
    expect(tokens).toHaveLength(7);
  });

  it("has the correct token images", () => {
    expect(tokens[0].image).toBe("M22");
    expect(tokens[1].image).toBe("\n");
    expect(tokens[2].image).toBe("B");
    expect(tokens[3].image).toBe("-");
    expect(tokens[4].image).toBe("34.2");
    expect(tokens[5].image).toBe("\n");
    expect(tokens[6].image).toBe("M21");
  });

  it("matches the correct token types", () => {
    expect(tokens[0]).toMatchToken(T.Mcode);
    expect(tokens[1]).toMatchToken(T.Newline);
    expect(tokens[2]).toMatchToken(T.Address);
    expect(tokens[3]).toMatchToken(T.Minus);
    expect(tokens[4]).toMatchToken(T.Decimal);
    expect(tokens[5]).toMatchToken(T.Newline);
    expect(tokens[6]).toMatchToken(T.Mcode);
  });
});

describe("can tokenize a line with variables and no spaces", () => {
  const inputText = `G43H#518Z1.0`;
  const tokens = lexer.tokenize(inputText);

  it("has the correct token images", () => {
    expect(tokens[0].image).toBe("G43");
    expect(tokens[1].image).toBe("H");
    expect(tokens[2].image).toBe("#");
    expect(tokens[3].image).toBe("518");
    expect(tokens[4].image).toBe("Z");
    expect(tokens[5].image).toBe("1.0");
  });

  it("matches the correct token types", () => {
    expect(tokens[0]).toMatchToken(T.Gcode);
    expect(tokens[1]).toMatchToken(T.Address);
    expect(tokens[2]).toMatchToken(T.Var);
    expect(tokens[3]).toMatchToken(T.Integer);
    expect(tokens[4]).toMatchToken(T.Address);
    expect(tokens[5]).toMatchToken(T.Decimal);
  });

  it("has the correct number of tokens", () => {
    expect(tokens).toHaveLength(6);
  });

  it("has no errors", () => {
    expect(lexer.getErrors()).toHaveLength(0);
  });
});

describe("can tokenize a line with a variable assignment", () => {
  const inputText = "#500=2.5";
  const tokens = lexer.tokenize(inputText);

  it("has no errors", () => {
    expect(lexer.getErrors()).toHaveLength(0);
  });
  it("has the correct number of tokens", () => {
    expect(tokens).toHaveLength(4);
  });

  it("has the correct token images", () => {
    expect(tokens[0].image).toBe("#");
    expect(tokens[1].image).toBe("500");
    expect(tokens[2].image).toBe("=");
    expect(tokens[3].image).toBe("2.5");
  });

  it("matches the correct token types", () => {
    expect(tokens[0]).toMatchToken(T.Var);
    expect(tokens[1]).toMatchToken(T.Integer);
    expect(tokens[2]).toMatchToken(T.Equals);
    expect(tokens[3]).toMatchToken(T.Decimal);
  });
});

// it("has the correct token images", () => {});
// it("matches the correct token types", () => {});
// it("has the correct number of tokens", () => {});
// it("has no errors", () => {});
