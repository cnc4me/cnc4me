import { beforeEach, describe, expect, it } from "vitest";

import { MacroRuntime } from "../../src";

const code = `%
O1234 (code1)
N1 G0
N2 G54
N3 M8
N4 G2 X1 Y1 I1 J1
N5 G3 X1 Y1 I1 J1
N6 G4
N7 G0
N8 G54
N9 M30
%`;

const runtime = new MacroRuntime();

describe("interpreting expressions with block numbers", () => {
  runtime.loadProgram(code, { setActive: true }).run();

  const blocks = runtime.Interpreter.getBlocks();

  beforeEach(() => blocks.resetPointer());

  it("parses with no errors", () => {
    expect(blocks).toHaveLength(10);
    expect(runtime.hasErrors).toBeFalsy();
  });

  it("has the correct number of blocks", () => {
    expect(blocks.fromPointer()).toHaveLength(10);
  });

  it("has the correct block numbers", () => {
    const set = blocks.fromPointer();

    expect(set[0]).toMatchObject({ N: 1 });
    expect(set[1]).toMatchObject({ N: 2 });
    expect(set[2]).toMatchObject({ N: 3 });
    expect(set[3]).toMatchObject({ N: 4 });
    expect(set[4]).toMatchObject({ N: 5 });
    expect(set[5]).toMatchObject({ N: 6 });
    expect(set[6]).toMatchObject({ N: 7 });
    expect(set[7]).toMatchObject({ N: 8 });
    expect(set[8]).toMatchObject({ N: 9 });
  });

  it("can find and start from a block number", () => {
    blocks.setPointerToBlock(5);
    const set = blocks.fromPointer();

    expect(set).toHaveLength(6);
    expect(set[0]).toMatchObject({ N: 5 });
    expect(set[1]).toMatchObject({ N: 6 });
    expect(set[2]).toMatchObject({ N: 7 });
    expect(set[3]).toMatchObject({ N: 8 });
    expect(set[4]).toMatchObject({ N: 9 });
  });

  it("can jump to block numbers", () => {
    blocks.setPointerToBlock(5);
    expect(blocks.read()).toMatchObject({ N: 5 });

    blocks.setPointerToBlock(8);
    expect(blocks.read()).toMatchObject({ N: 8 });
  });

  it("can read and advance the pointer", () => {
    blocks.setPointerToBlock(7);

    expect(blocks.fromPointer()).toHaveLength(4);

    expect(blocks.read()).toMatchObject({ N: 7 });
    blocks.advancePointer();
    expect(blocks.read()).toMatchObject({ N: 8 });
    blocks.advancePointer();
    expect(blocks.read()).toMatchObject({ N: 9 });
    blocks.advancePointer();
    blocks.advancePointer();
    expect(blocks.pointerAtEnd).toBeTruthy();
  });

  it("fails to set the pointer to an invalid block number", () => {
    expect(() => {
      blocks.setPointerToBlock(100000);
    }).toThrowError();
  });

  it("fails to advance the pointer when at the end", () => {
    expect(() => {
      for (let i = 0; i < 100; i++) {
        blocks.advancePointer();
      }
    }).toThrowError();
  });
});
