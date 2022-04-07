import { MacroMemory } from "../../src/lib/MacroMemory/MacroMemory";
import { getRandomAxisLocations } from "../../src/testing";

describe("setting Tool Offset Registers with MacroMemory#g10()", () => {
  const mem = new MacroMemory();

  it.each`
    P     | xReg    | yReg    | zReg    | bReg
    ${1}  | ${7001} | ${7002} | ${7003} | ${7004}
    ${2}  | ${7021} | ${7022} | ${7023} | ${7024}
    ${3}  | ${7041} | ${7042} | ${7043} | ${7044}
    ${4}  | ${7061} | ${7062} | ${7063} | ${7064}
    ${5}  | ${7081} | ${7082} | ${7083} | ${7084}
    ${25} | ${7481} | ${7482} | ${7483} | ${7484}
    ${49} | ${7961} | ${7962} | ${7963} | ${7964}
  `(
    "calling `G10 L20 P$P` sets #$xReg, #$yReg, #$zReg, #$bReg",
    ({ P, xReg, yReg, zReg, bReg }: Record<string, number>) => {
      const { X, Y, Z, B } = getRandomAxisLocations();

      mem.g10({ L: 20, P, X, Y, Z, B });

      expect(mem.read(xReg)).toBe(X);
      expect(mem.read(yReg)).toBe(Y);
      expect(mem.read(zReg)).toBe(Z);
      expect(mem.read(bReg)).toBe(B);
    }
  );
});
