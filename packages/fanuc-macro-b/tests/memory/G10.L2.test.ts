import { MacroMemory } from "../../src/lib/MacroMemory";
import { getRandomAxisLocations } from "../helpers";

describe("setting `L2` work offsets with MacroMemory#g10()", () => {
  const mem = new MacroMemory();

  it("can set `G53` work offsets via G10 line.", () => {
    const { X, Y, Z, B } = getRandomAxisLocations();

    mem.g10({ L: 2, P: 0, X, Y, Z, B });

    const G53 = mem.getWorkCoordinateHash(53);

    expect(G53.X).toBe(X);
    expect(G53.Y).toBe(Y);
    expect(G53.Z).toBe(Z);
    expect(G53.B).toBe(B);

    expect(mem.read(5201)).toBe(X);
    expect(mem.read(5202)).toBe(Y);
    expect(mem.read(5203)).toBe(Z);
    expect(mem.read(5204)).toBe(B);
  });

  it("can set `G54` work offsets via G10 line.", () => {
    const { X, Y, Z, B } = getRandomAxisLocations();

    mem.g10({ L: 2, P: 1, X, Y, Z, B });

    const G54 = mem.getWorkCoordinateHash(54);

    expect(G54.X).toBe(X);
    expect(G54.Y).toBe(Y);
    expect(G54.Z).toBe(Z);
    expect(G54.B).toBe(B);

    expect(mem.read(5221)).toBe(X);
    expect(mem.read(5222)).toBe(Y);
    expect(mem.read(5223)).toBe(Z);
    expect(mem.read(5224)).toBe(B);
  });

  it("can set `G55` work offsets via G10 line.", () => {
    const { X, Y, Z, B } = getRandomAxisLocations();

    mem.g10({ L: 2, P: 2, X, Y, Z, B });

    const G55 = mem.getWorkCoordinateHash(55);

    expect(G55.X).toBe(X);
    expect(G55.Y).toBe(Y);
    expect(G55.Z).toBe(Z);
    expect(G55.B).toBe(B);

    expect(mem.read(5241)).toBe(X);
    expect(mem.read(5242)).toBe(Y);
    expect(mem.read(5243)).toBe(Z);
    expect(mem.read(5244)).toBe(B);
  });

  it("can set `G56` work offsets via G10 line.", () => {
    const { X, Y, Z, B } = getRandomAxisLocations();

    mem.g10({ L: 2, P: 3, X, Y, Z, B });

    const G56 = mem.getWorkCoordinateHash(56);

    expect(G56.X).toBe(X);
    expect(G56.Y).toBe(Y);
    expect(G56.Z).toBe(Z);
    expect(G56.B).toBe(B);

    expect(mem.read(5261)).toBe(X);
    expect(mem.read(5262)).toBe(Y);
    expect(mem.read(5263)).toBe(Z);
    expect(mem.read(5264)).toBe(B);
  });

  it("can set `G57` work offsets via G10 line.", () => {
    const { X, Y, Z, B } = getRandomAxisLocations();

    mem.g10({ L: 2, P: 4, X, Y, Z, B });

    const G57 = mem.getWorkCoordinateHash(57);

    expect(G57.X).toBe(X);
    expect(G57.Y).toBe(Y);
    expect(G57.Z).toBe(Z);
    expect(G57.B).toBe(B);

    expect(mem.read(5281)).toBe(X);
    expect(mem.read(5282)).toBe(Y);
    expect(mem.read(5283)).toBe(Z);
    expect(mem.read(5284)).toBe(B);
  });

  it("can set `G58` work offsets via G10 line.", () => {
    const { X, Y, Z, B } = getRandomAxisLocations();

    mem.g10({ L: 2, P: 5, X, Y, Z, B });

    const G58 = mem.getWorkCoordinateHash(58);

    expect(G58.X).toBe(X);
    expect(G58.Y).toBe(Y);
    expect(G58.Z).toBe(Z);
    expect(G58.B).toBe(B);

    expect(mem.read(5301)).toBe(X);
    expect(mem.read(5302)).toBe(Y);
    expect(mem.read(5303)).toBe(Z);
    expect(mem.read(5304)).toBe(B);
  });

  it("can set `G59` work offsets via G10 line.", () => {
    const { X, Y, Z, B } = getRandomAxisLocations();

    mem.g10({ L: 2, P: 6, X, Y, Z, B });

    const G59 = mem.getWorkCoordinateHash(59);

    expect(G59.X).toBe(X);
    expect(G59.Y).toBe(Y);
    expect(G59.Z).toBe(Z);
    expect(G59.B).toBe(B);

    expect(mem.read(5321)).toBe(X);
    expect(mem.read(5322)).toBe(Y);
    expect(mem.read(5323)).toBe(Z);
    expect(mem.read(5324)).toBe(B);
  });
});
