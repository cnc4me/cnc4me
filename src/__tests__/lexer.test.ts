import lex from "../lexer/lex";
import {
  Address,
  Dot,
  Gcode,
  Mcode,
  Minus,
  Newline,
  NumberLiteral,
  Var
} from "../lexer/tokens/tokens";
import { toMatchToken } from "../testing/matchers";

expect.extend({ toMatchToken });

describe("Fanuc Macro B Lexer", () => {
  it("Can lex a G10 line", () => {
    const inputText = `G10 G90 L2 P1 X1.2 Y3.4 Z-5.6 B90.`;
    const { tokens, errors } = lex(inputText);

    expect(errors).toHaveLength(0);
    expect(tokens).toHaveLength(16);
    expect(tokens[0].image).toEqual("G10");
    expect(tokens[1].image).toEqual("G90");
    expect(tokens[2].image).toEqual("L");
    expect(tokens[3].image).toEqual("2");
    expect(tokens[4].image).toEqual("P");
    expect(tokens[5].image).toEqual("1");
    expect(tokens[6].image).toEqual("X");
    expect(tokens[7].image).toEqual("1.2");
    expect(tokens[8].image).toEqual("Y");
    expect(tokens[9].image).toEqual("3.4");
    expect(tokens[10].image).toEqual("Z");
    expect(tokens[11].image).toEqual("-");
    expect(tokens[12].image).toEqual("5.6");
    expect(tokens[13].image).toEqual("B");
    /**
     * @TODO FIX THIS, include dot with number
     */
    expect(tokens[14].image).toEqual("90");
    expect(tokens[15].image).toEqual(".");

    expect(tokens[0]).toMatchToken(Gcode);
    expect(tokens[1]).toMatchToken(Gcode);
    expect(tokens[2]).toMatchToken(Address);
    expect(tokens[3]).toMatchToken(NumberLiteral);
    expect(tokens[4]).toMatchToken(Address);
    expect(tokens[5]).toMatchToken(NumberLiteral);
    expect(tokens[6]).toMatchToken(Address);
    expect(tokens[7]).toMatchToken(NumberLiteral);
    expect(tokens[8]).toMatchToken(Address);
    expect(tokens[9]).toMatchToken(NumberLiteral);
    expect(tokens[10]).toMatchToken(Address);
    expect(tokens[11]).toMatchToken(Minus);
    expect(tokens[12]).toMatchToken(NumberLiteral);
    expect(tokens[13]).toMatchToken(Address);
    expect(tokens[14]).toMatchToken(NumberLiteral);
    expect(tokens[15]).toMatchToken(Dot);
  });

  it("Can lex Mcodes and Newlines", () => {
    const inputText = `M22
    B-34.2
    M21`;

    const { tokens, errors } = lex(inputText);

    expect(errors).toHaveLength(0);
    expect(tokens).toHaveLength(7);
    expect(tokens[0].image).toEqual("M22");
    expect(tokens[1].image).toEqual("\n");
    expect(tokens[2].image).toEqual("B");
    /**
     * @TODO FIX THIS, include dot with number
     */
    expect(tokens[3].image).toEqual("-");
    expect(tokens[4].image).toEqual("34.2");
    expect(tokens[5].image).toEqual("\n");
    expect(tokens[6].image).toEqual("M21");

    expect(tokens[0]).toMatchToken(Mcode);
    expect(tokens[1]).toMatchToken(Newline);
    expect(tokens[2]).toMatchToken(Address);
    expect(tokens[3]).toMatchToken(Minus);
    expect(tokens[4]).toMatchToken(NumberLiteral);
    expect(tokens[5]).toMatchToken(Newline);
    expect(tokens[6]).toMatchToken(Mcode);
  });

  it("Can lex a line with variables", () => {
    const inputText = `G43H#518Z1.0`;

    const { tokens, errors } = lex(inputText);

    expect(errors).toHaveLength(0);
    expect(tokens).toHaveLength(6);
    expect(tokens[0].image).toEqual("G43");
    expect(tokens[1].image).toEqual("H");
    expect(tokens[2].image).toEqual("#");
    expect(tokens[3].image).toEqual("518");
    expect(tokens[4].image).toEqual("Z");
    expect(tokens[5].image).toEqual("1.0");

    expect(tokens[0]).toMatchToken(Gcode);
    expect(tokens[1]).toMatchToken(Address);
    expect(tokens[2]).toMatchToken(Var);
    expect(tokens[3]).toMatchToken(NumberLiteral);
    expect(tokens[4]).toMatchToken(Address);
    expect(tokens[5]).toMatchToken(NumberLiteral);
  });
});
