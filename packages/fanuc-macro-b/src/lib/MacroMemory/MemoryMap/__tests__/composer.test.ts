import {
  composeAuxWorkOffsetAxisRegister,
  composeToolOffsetRegister,
  composeWorkOffsetAxisRegister
} from "../composer";

describe("testing methods for composing memory addresses", () => {
  it.each`
    register | group | toolNum
    ${10001} | ${10} | ${1}
    ${11005} | ${11} | ${5}
    ${12071} | ${12} | ${71}
    ${13109} | ${13} | ${109}
    ${11299} | ${11} | ${299}
  `("composeToolOffsetRegister($group, $toolNum) = $register", ({ register, group, toolNum }) => {
    const address = composeToolOffsetRegister(group, toolNum);

    expect(address).toBe(register);
  });

  it.each`
    register | group | axis
    ${5201}  | ${1}  | ${"X"}
    ${5223}  | ${2}  | ${"Z"}
    ${5241}  | ${3}  | ${"X"}
    ${5302}  | ${6}  | ${"Y"}
    ${5324}  | ${7}  | ${"B"}
  `("composeWorkOffsetAxisRegister($group, '$axis') = $register", ({ register, group, axis }) => {
    const address = composeWorkOffsetAxisRegister(group, axis);

    expect(address).toBe(register);
  });

  it.each`
    register | group | axis
    ${7001}  | ${1}  | ${"X"}
    ${7022}  | ${2}  | ${"Y"}
    ${7043}  | ${3}  | ${"Z"}
    ${7181}  | ${10} | ${"X"}
    ${7964}  | ${49} | ${"B"}
  `(
    "composeAuxWorkOffsetAxisRegister($group, '$axis') = $register",
    ({ register, group, axis }) => {
      const address = composeAuxWorkOffsetAxisRegister(group, axis);

      expect(address).toBe(register);
    }
  );
});
