import {
  Address,
  Decimal,
  Equals,
  Integer,
  Minus,
  Newline,
  Var
} from "../src/lib/Tokens";
import { lex } from "../src";

describe("lexer", () => {
  it("can lex a G10 line", () => {
    const inputText = `G10 G90 L2 P1 X1.2 Y3.4 Z-5.6 B90.`;
    const { tokens, errors } = lex(inputText);

    expect(errors).toHaveLength(0);
    expect(tokens).toHaveLength(17);
    expect(tokens[0].image).toBe("G");
    expect(tokens[1].image).toBe("10");
    expect(tokens[2].image).toBe("G");
    expect(tokens[3].image).toBe("90");
    expect(tokens[4].image).toBe("L");
    expect(tokens[5].image).toBe("2");
    expect(tokens[6].image).toBe("P");
    expect(tokens[7].image).toBe("1");
    expect(tokens[8].image).toBe("X");
    expect(tokens[9].image).toBe("1.2");
    expect(tokens[10].image).toBe("Y");
    expect(tokens[11].image).toBe("3.4");
    expect(tokens[12].image).toBe("Z");
    expect(tokens[13].image).toBe("-");
    expect(tokens[14].image).toBe("5.6");
    expect(tokens[15].image).toBe("B");
    expect(tokens[16].image).toBe("90.");

    expect(tokens[0]).toMatchToken(Address);
    expect(tokens[1]).toMatchToken(Integer);
    expect(tokens[2]).toMatchToken(Address);
    expect(tokens[3]).toMatchToken(Integer);
    expect(tokens[4]).toMatchToken(Address);
    expect(tokens[5]).toMatchToken(Integer);
    expect(tokens[6]).toMatchToken(Address);
    expect(tokens[7]).toMatchToken(Integer);
    expect(tokens[8]).toMatchToken(Address);
    expect(tokens[9]).toMatchToken(Decimal);
    expect(tokens[10]).toMatchToken(Address);
    expect(tokens[11]).toMatchToken(Decimal);
    expect(tokens[12]).toMatchToken(Address);
    expect(tokens[13]).toMatchToken(Minus);
    expect(tokens[14]).toMatchToken(Decimal);
    expect(tokens[15]).toMatchToken(Address);
    expect(tokens[16]).toMatchToken(Decimal);
  });

  it("can lex Mcodes and Newlines", () => {
    const inputText = `M22
    B-34.2
    M21`;

    const { tokens, errors } = lex(inputText);

    expect(errors).toHaveLength(0);
    expect(tokens).toHaveLength(9);
    expect(tokens[0].image).toBe("M");
    expect(tokens[1].image).toBe("22");
    expect(tokens[2].image).toBe("\n");
    expect(tokens[3].image).toBe("B");
    expect(tokens[4].image).toBe("-");
    expect(tokens[5].image).toBe("34.2");
    expect(tokens[6].image).toBe("\n");
    expect(tokens[7].image).toBe("M");
    expect(tokens[8].image).toBe("21");

    expect(tokens[0]).toMatchToken(Address);
    expect(tokens[1]).toMatchToken(Integer);
    expect(tokens[2]).toMatchToken(Newline);
    expect(tokens[3]).toMatchToken(Address);
    expect(tokens[4]).toMatchToken(Minus);
    expect(tokens[5]).toMatchToken(Decimal);
    expect(tokens[6]).toMatchToken(Newline);
    expect(tokens[7]).toMatchToken(Address);
    expect(tokens[8]).toMatchToken(Integer);
  });

  it("can lex a line with variables", () => {
    const inputText = `G43H#518Z1.0`;

    const { tokens, errors } = lex(inputText);

    expect(errors).toHaveLength(0);
    expect(tokens).toHaveLength(7);
    expect(tokens[0].image).toBe("G");
    expect(tokens[1].image).toBe("43");
    expect(tokens[2].image).toBe("H");
    expect(tokens[3].image).toBe("#");
    expect(tokens[4].image).toBe("518");
    expect(tokens[5].image).toBe("Z");
    expect(tokens[6].image).toBe("1.0");

    expect(tokens[0]).toMatchToken(Address);
    expect(tokens[1]).toMatchToken(Integer);
    expect(tokens[2]).toMatchToken(Address);
    expect(tokens[3]).toMatchToken(Var);
    expect(tokens[4]).toMatchToken(Integer);
    expect(tokens[5]).toMatchToken(Address);
    expect(tokens[6]).toMatchToken(Decimal);
  });

  it("can lex a line with a variable assignment", () => {
    const inputText = "#500=2.5";

    const { tokens, errors } = lex(inputText);

    expect(errors).toHaveLength(0);
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
