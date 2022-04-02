import { rand } from "../../../testing";
import { MacroMemory } from "../MacroMemory";

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
describe("setting Tool Offset Registers with MacroMemory#g10()", () => {
  it.each`
    register | L     | P      | R
    ${10001} | ${10} | ${1}   | ${rand(0, 12)}
    ${10026} | ${10} | ${26}  | ${rand(0, 12)}
    ${10077} | ${10} | ${77}  | ${rand(0, 12)}
    ${10105} | ${10} | ${105} | ${rand(0, 12)}
    ${10299} | ${10} | ${299} | ${rand(0, 12)}
    ${11005} | ${11} | ${5}   | ${rand(-1, 1)}
    ${11026} | ${11} | ${26}  | ${rand(-1, 1)}
    ${11077} | ${11} | ${77}  | ${rand(-1, 1)}
    ${11111} | ${11} | ${111} | ${rand(-1, 1)}
    ${11299} | ${11} | ${299} | ${rand(-1, 1)}
    ${12009} | ${12} | ${9}   | ${rand(0, 12)}
    ${12011} | ${12} | ${11}  | ${rand(0, 12)}
    ${12030} | ${12} | ${30}  | ${rand(0, 12)}
    ${12101} | ${12} | ${101} | ${rand(0, 12)}
    ${12222} | ${12} | ${222} | ${rand(0, 12)}
    ${13019} | ${13} | ${19}  | ${rand(-1, 1)}
    ${13032} | ${13} | ${32}  | ${rand(-1, 1)}
    ${13066} | ${13} | ${66}  | ${rand(-1, 1)}
    ${13190} | ${13} | ${190} | ${rand(-1, 1)}
    ${13248} | ${13} | ${248} | ${rand(-1, 1)}
  `("call to `G10 L$L P$P R$R` sets #$register = $R", ({ register, L, P, R }) => {
    mem.g10({ L, P, R });

    expect(mem.read(register)).toBe(R);
  });
});
