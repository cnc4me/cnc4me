import { describe, expect, it } from "vitest";

import { MacroLexer } from "../../src";
import {
  Address,
  Decimal,
  Equals,
  Gcode,
  Integer,
  Mcode,
  Minus,
  Newline,
  Var
} from "../../src/lib/tokens";

import type { IToken } from "chevrotain";

function debugTokens(tokens: IToken[]) {
  return console.log(tokens.map((t, i) => [i, t.tokenType.name]));
}

describe("lexing lines with the MarcoLexer2", () => {
  const lexer = new MacroLexer();

  it("can tokenize a G10 line", () => {
    const inputText = `G10 G90 L2 P1 X1.2 Y3.4 Z-5.6 B90.`;

    lexer.tokenize(inputText);

    const { tokens } = lexer;

    expect(lexer.getErrors()).toHaveLength(0);
    expect(lexer.tokens).toHaveLength(15);

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

    expect(tokens[0]).toMatchToken(Gcode);
    expect(tokens[1]).toMatchToken(Gcode);
    expect(tokens[2]).toMatchToken(Address);
    expect(tokens[3]).toMatchToken(Integer);
    expect(tokens[4]).toMatchToken(Address);
    expect(tokens[5]).toMatchToken(Integer);
    expect(tokens[6]).toMatchToken(Address);
    expect(tokens[7]).toMatchToken(Decimal);
    expect(tokens[8]).toMatchToken(Address);
    expect(tokens[9]).toMatchToken(Decimal);
    expect(tokens[10]).toMatchToken(Address);
    expect(tokens[11]).toMatchToken(Minus);
    expect(tokens[12]).toMatchToken(Decimal);
    expect(tokens[13]).toMatchToken(Address);
    expect(tokens[14]).toMatchToken(Decimal);
  });

  it("can tokenize M Codes and NewLines", () => {
    const inputText = `M22
    B-34.2
    M21`;

    lexer.tokenize(inputText);

    const { tokens } = lexer;

    expect(lexer.getErrors()).toHaveLength(0);
    expect(tokens).toHaveLength(7);

    expect(tokens[0].image).toBe("M22");
    expect(tokens[1].image).toBe("\n");
    expect(tokens[2].image).toBe("B");
    expect(tokens[3].image).toBe("-");
    expect(tokens[4].image).toBe("34.2");
    expect(tokens[5].image).toBe("\n");
    expect(tokens[6].image).toBe("M21");

    expect(tokens[0]).toMatchToken(Mcode);
    expect(tokens[1]).toMatchToken(Newline);
    expect(tokens[2]).toMatchToken(Address);
    expect(tokens[3]).toMatchToken(Minus);
    expect(tokens[4]).toMatchToken(Decimal);
    expect(tokens[5]).toMatchToken(Newline);
    expect(tokens[6]).toMatchToken(Mcode);
  });

  it("can tokenize a line with variables and no spaces", () => {
    const inputText = `G43H#518Z1.0`;

    lexer.tokenize(inputText);

    const { tokens } = lexer;

    expect(lexer.getErrors()).toHaveLength(0);
    expect(tokens).toHaveLength(6);

    expect(tokens[0].image).toBe("G43");
    expect(tokens[1].image).toBe("H");
    expect(tokens[2].image).toBe("#");
    expect(tokens[3].image).toBe("518");
    expect(tokens[4].image).toBe("Z");
    expect(tokens[5].image).toBe("1.0");

    expect(tokens[0]).toMatchToken(Gcode);
    expect(tokens[1]).toMatchToken(Address);
    expect(tokens[2]).toMatchToken(Var);
    expect(tokens[3]).toMatchToken(Integer);
    expect(tokens[4]).toMatchToken(Address);
    expect(tokens[5]).toMatchToken(Decimal);
  });

  it("can tokenize a line with a variable assignment", () => {
    const inputText = "#500=2.5";

    lexer.tokenize(inputText);

    const { tokens } = lexer;

    expect(lexer.getErrors()).toHaveLength(0);
    expect(tokens).toHaveLength(4);

    expect(tokens[0].image).toBe("#");
    expect(tokens[1].image).toBe("500");
    expect(tokens[2].image).toBe("=");
    expect(tokens[3].image).toBe("2.5");

    expect(tokens[0]).toMatchToken(Var);
    expect(tokens[1]).toMatchToken(Integer);
    expect(tokens[2]).toMatchToken(Equals);
    expect(tokens[3]).toMatchToken(Decimal);
  });
});
