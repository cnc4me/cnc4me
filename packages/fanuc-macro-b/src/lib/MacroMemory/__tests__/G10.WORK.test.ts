import { MacroMemory } from "../../src";
import { rB, rX, rY, rZ } from "../../src/utils";

/**
 * G10 Line Reference
 *
 * ```
 * L2  = Common Work Offsets
 * L10 = Tool Length Compensation
 * L11 = Tool Length Geometry
 * L12 = Tool Diameter Compensation
 * L13 = Tool Diameter Geometry
 * L20 = Aux Work Offsets
 * ```
 */
const mem = new MacroMemory();
describe.skip("setting Tool Offset Registers with MacroMemory#g10()", () => {
  it.each`
    register | L    | P    | X       | Y       | Z       | B
    ${5221}  | ${2} | ${1} | ${rX()} | ${rY()} | ${rZ()} | ${rB()}
    ${5222}  | ${2} | ${1} | ${rX()} | ${rY()} | ${rZ()} | ${rB()}
    ${5223}  | ${2} | ${1} | ${rX()} | ${rY()} | ${rZ()} | ${rB()}
    ${5224}  | ${2} | ${1} | ${rX()} | ${rY()} | ${rZ()} | ${rB()}
  `("call to `G10 L$L P$P R$R` sets #$register = $R", ({ register, L, P, R }) => {
    mem.g10({ L, P, R });

    expect(mem.G55.Z).toBe(Z);

    expect(mem.read(register)).toBe(R);
    expect(mem.read(register)).toBe(R);
  });
});
