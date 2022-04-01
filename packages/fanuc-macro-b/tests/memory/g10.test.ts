import { MacroMemory } from "../../src";
import { bigRand, smallRand } from "../../src/utils";

/**
 * G10 Line Reference
 *
 * ```
 * L10 = Tool Length Compensation
 * L11 = Tool Length Geometry
 * L12 = Tool Diameter Compensation
 * L13 = Tool Diameter Geometry
 * ```
 */
const mem = new MacroMemory();
describe("testing the MacroMemory#g10()", () => {
  describe("setting `L10` group offsets (Tool Length Comp.)", () => {
    it.each`
      V        | P      | R
      ${10001} | ${1}   | ${bigRand()}
      ${10026} | ${26}  | ${bigRand()}
      ${10077} | ${77}  | ${bigRand()}
      ${10105} | ${105} | ${bigRand()}
      ${10299} | ${299} | ${bigRand()}
    `("sets #$V = $R via `G10 L10 P$P R$R`", ({ V, P, R }) => {
      mem.g10({ L: 10, P, R });

      expect(mem.read(V)).toBe(R);
    });
  });

  describe("setting `L11` group offsets (Tool Length)", () => {
    it.each`
      V        | P      | R
      ${11005} | ${5}   | ${smallRand()}
      ${11026} | ${26}  | ${smallRand()}
      ${11077} | ${77}  | ${smallRand()}
      ${11111} | ${111} | ${smallRand()}
      ${11299} | ${299} | ${smallRand()}
    `("sets #$V = $R via `G10 L10 P$P R$R`", ({ V, P, R }) => {
      mem.g10({ L: 11, P, R });

      expect(mem.read(V)).toBe(R);
    });
  });

  describe("setting `L12` group offsets (Tool Diameter Comp.)", () => {
    it.each`
      V        | P      | R
      ${12009} | ${9}   | ${bigRand()}
      ${12011} | ${11}  | ${bigRand()}
      ${12030} | ${30}  | ${bigRand()}
      ${12101} | ${101} | ${bigRand()}
      ${12222} | ${222} | ${bigRand()}
    `("sets #$V = $R via `G10 L10 P$P R$R`", ({ V, P, R }) => {
      mem.g10({ L: 12, P, R });

      expect(mem.read(V)).toBe(R);
    });
  });

  describe("setting `L13` group offsets (Tool Diameter)", () => {
    it.each`
      V        | P      | R
      ${13019} | ${19}  | ${smallRand()}
      ${13032} | ${32}  | ${smallRand()}
      ${13066} | ${66}  | ${smallRand()}
      ${13190} | ${190} | ${smallRand()}
      ${13248} | ${248} | ${smallRand()}
    `("sets #$V = $R via `G10 L10 P$P R$R`", ({ V, P, R }) => {
      mem.g10({ L: 13, P, R });

      expect(mem.read(V)).toBe(R);
    });
  });

  describe("setting `L2` work offsets (Common)", () => {
    it("can set `G54` work offsets via G10 line.", () => {
      mem.g10({ L: 2, P: 1, X: 1, Y: 2, Z: 3, B: 4 });

      expect(mem.G54.X).toBe(1);
      expect(mem.G54.Y).toBe(2);
      expect(mem.G54.Z).toBe(3);
      expect(mem.G54.B).toBe(4);
      expect(mem.read(5221)).toBe(1);
      expect(mem.read(5222)).toBe(2);
      expect(mem.read(5223)).toBe(3);
      expect(mem.read(5224)).toBe(4);
    });

    it("can set `G55` work offsets via G10 line.", () => {
      mem.g10({ L: 2, P: 2, X: 0.1, Y: 0.2, Z: 0.3, B: 0.4 });

      expect(mem.G55.X).toBe(0.1);
      expect(mem.G55.Y).toBe(0.2);
      expect(mem.G55.Z).toBe(0.3);
      expect(mem.G55.B).toBe(0.4);
      expect(mem.read(5241)).toBe(0.1);
      expect(mem.read(5242)).toBe(0.2);
      expect(mem.read(5243)).toBe(0.3);
      expect(mem.read(5244)).toBe(0.4);
    });

    it("can set `G56` work offsets via G10 line.", () => {
      mem.g10({ L: 2, P: 2, X: 0.1, Y: 0.2, Z: 0.3, B: 0.4 });

      expect(mem.G55.X).toBe(0.1);
      expect(mem.G55.Y).toBe(0.2);
      expect(mem.G55.Z).toBe(0.3);
      expect(mem.G55.B).toBe(0.4);
      expect(mem.read(5241)).toBe(0.1);
      expect(mem.read(5242)).toBe(0.2);
      expect(mem.read(5243)).toBe(0.3);
      expect(mem.read(5244)).toBe(0.4);
    });
  });
});
