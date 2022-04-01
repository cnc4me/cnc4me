import { MacroMemory } from "../../src";
import { getRandomAxisLocations } from "../../src/utils";

const mem = new MacroMemory();

describe("setting `L2` work offsets with MacroMemory#g10()", () => {
  it("can set `G54` work offsets via G10 line.", () => {
    const { X, Y, Z, B } = getRandomAxisLocations();

    mem.g10({ L: 2, P: 1, X, Y, Z, B });

    expect(mem.G54.X).toBe(X);
    expect(mem.G54.Y).toBe(Y);
    expect(mem.G54.Z).toBe(Z);
    expect(mem.G54.B).toBe(B);

    expect(mem.read(5221)).toBe(X);
    expect(mem.read(5222)).toBe(Y);
    expect(mem.read(5223)).toBe(Z);
    expect(mem.read(5224)).toBe(B);
  });

  it("can set `G55` work offsets via G10 line.", () => {
    const { X, Y, Z, B } = getRandomAxisLocations();

    mem.g10({ L: 2, P: 2, X, Y, Z, B });

    expect(mem.G55.X).toBe(X);
    expect(mem.G55.Y).toBe(Y);
    expect(mem.G55.Z).toBe(Z);
    expect(mem.G55.B).toBe(B);

    expect(mem.read(5241)).toBe(X);
    expect(mem.read(5242)).toBe(Y);
    expect(mem.read(5243)).toBe(Z);
    expect(mem.read(5244)).toBe(B);
  });

  it("can set `G56` work offsets via G10 line.", () => {
    const { X, Y, Z, B } = getRandomAxisLocations();

    mem.g10({ L: 2, P: 3, X, Y, Z, B });

    expect(mem.G56.X).toBe(X);
    expect(mem.G56.Y).toBe(Y);
    expect(mem.G56.Z).toBe(Z);
    expect(mem.G56.B).toBe(B);

    expect(mem.read(5261)).toBe(X);
    expect(mem.read(5262)).toBe(Y);
    expect(mem.read(5263)).toBe(Z);
    expect(mem.read(5264)).toBe(B);
  });

  it("can set `G57` work offsets via G10 line.", () => {
    const { X, Y, Z, B } = getRandomAxisLocations();

    mem.g10({ L: 2, P: 4, X, Y, Z, B });

    expect(mem.G57.X).toBe(X);
    expect(mem.G57.Y).toBe(Y);
    expect(mem.G57.Z).toBe(Z);
    expect(mem.G57.B).toBe(B);

    expect(mem.read(5281)).toBe(X);
    expect(mem.read(5282)).toBe(Y);
    expect(mem.read(5283)).toBe(Z);
    expect(mem.read(5284)).toBe(B);
  });

  it("can set `G58` work offsets via G10 line.", () => {
    const { X, Y, Z, B } = getRandomAxisLocations();

    mem.g10({ L: 2, P: 5, X, Y, Z, B });

    expect(mem.G58.X).toBe(X);
    expect(mem.G58.Y).toBe(Y);
    expect(mem.G58.Z).toBe(Z);
    expect(mem.G58.B).toBe(B);

    expect(mem.read(5301)).toBe(X);
    expect(mem.read(5302)).toBe(Y);
    expect(mem.read(5303)).toBe(Z);
    expect(mem.read(5304)).toBe(B);
  });

  it("can set `G59` work offsets via G10 line.", () => {
    const { X, Y, Z, B } = getRandomAxisLocations();

    mem.g10({ L: 2, P: 6, X, Y, Z, B });

    expect(mem.G59.X).toBe(X);
    expect(mem.G59.Y).toBe(Y);
    expect(mem.G59.Z).toBe(Z);
    expect(mem.G59.B).toBe(B);

    expect(mem.read(5321)).toBe(X);
    expect(mem.read(5322)).toBe(Y);
    expect(mem.read(5323)).toBe(Z);
    expect(mem.read(5324)).toBe(B);
  });
});
