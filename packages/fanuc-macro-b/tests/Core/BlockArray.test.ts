import { describe, expect, it } from "vitest";

import { FanucMacroB } from "../../src";

const code = `N1 G0
N2 G54
N3 M8
N4 G2 X1 Y1 I1 J1
N5 G3 X1 Y1 I1 J1
N6 G4
N7 G0
N8 G54
N9 M30`;

const fmb = new FanucMacroB();

describe("interpreting expressions with block numbers", () => {
  fmb.eval(code);

  const blocks = fmb.interpreter.getBlocks();

  it("parses with no errors", () => {
    expect(blocks).toHaveLength(9);
    expect(fmb.hasErrors).toBeFalsy();
  });

  it("has the correct number of blocks", () => {
    expect(blocks.fromPointer()).toHaveLength(9);
  });

  it("has the correct block numbers", () => {
    blocks.resetPointer();
    const set = Array.from(blocks.fromPointer());

    set.forEach((block, idx) => {
      expect(block).toMatchObject({ N: idx + 1 });
    });
  });

  it("fails to set the pointer to an invalid block number", () => {
    expect(() => {
      blocks.setPointerToBlock(100000);
    }).toThrowError();
  });

  it("can read and advance the pointer", () => {
    blocks.setPointerToBlock(7);

    expect(blocks.fromPointer()).toHaveLength(3);

    expect(blocks.read()).toMatchObject({ N: 7 });
    blocks.advancePointer();
    expect(blocks.read()).toMatchObject({ N: 8 });
    blocks.advancePointer();
    expect(blocks.read()).toMatchObject({ N: 9 });
  });

  it("can find and start from a block number", () => {
    blocks.setPointerToBlock(5);
    const set = blocks.fromPointer();

    expect(set).toHaveLength(5);
    expect(set[0]).toMatchObject({ N: 5 });
    expect(set[1]).toMatchObject({ N: 6 });
    expect(set[2]).toMatchObject({ N: 7 });
    expect(set[3]).toMatchObject({ N: 8 });
    expect(set[4]).toMatchObject({ N: 9 });
  });

  it("can jump over block numbers", () => {
    blocks.setPointerToBlock(5);

    expect(blocks.read()).toMatchObject({ N: 5 });

    blocks.setPointerToBlock(8);
    expect(blocks.read()).toMatchObject({ N: 8 });
  });
});
