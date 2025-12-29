import { describe, expect, it } from "vitest";
import { BinaryRegister } from "../src/lib/BinaryRegister";

describe("BinaryRegister stores and manipulates a memory register.", () => {
  it("creates a new instance", () => {
    const reg = new BinaryRegister("1011");
    expect(reg.value).toBe("00001011"); // Binary string representation should be "1011"
  });

  it("can be converted to a string", () => {
    const reg = new BinaryRegister("11001100");

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    expect(`${reg}`).toBe("11001100");
  });

  it("can be cleared", () => {
    const reg = new BinaryRegister("11001100");

    expect(reg.value).toBe("11001100");
    reg.clear();
    expect(reg.value).toBe("00000000");
  });

  it("creates a new instance via static method `fromBinary`", () => {
    const reg = BinaryRegister.fromBinary("1011");
    expect(reg.value).toBe("00001011"); // Binary string representation should be "1011"
  });

  it("creates a register from a numeric value", () => {
    const regFromValue = BinaryRegister.fromValue(5);
    expect(regFromValue.value).toBe("00000101"); // Binary string representation should be "00000101"
  });

  it("sets bits at position", () => {
    const reg = BinaryRegister.fromBinary("00000000"); // Initial value: 11 (binary 1011)

    reg.set(0, true);
    expect(reg.value).toBe("00000001");
    reg.set(1, true);
    expect(reg.value).toBe("00000011");
    reg.set(2, true);
    expect(reg.value).toBe("00000111");
    reg.set(3, true);
    expect(reg.value).toBe("00001111");
    reg.set(4, true);
    expect(reg.value).toBe("00011111");
    reg.set(5, true);
    expect(reg.value).toBe("00111111");
    reg.set(6, true);
    expect(reg.value).toBe("01111111");
    reg.set(7, true);
    expect(reg.value).toBe("11111111");
  });

  it("flips bits at position", () => {
    const reg = BinaryRegister.fromBinary("11111111"); // Initial value: 11 (binary 1011)

    reg.flip(0);
    expect(reg.value).toBe("11111110");
    reg.flip(1);
    expect(reg.value).toBe("11111100");
    reg.flip(2);
    expect(reg.value).toBe("11111000");
    reg.flip(3);
    expect(reg.value).toBe("11110000");
    reg.flip(4);
    expect(reg.value).toBe("11100000");
    reg.flip(5);
    expect(reg.value).toBe("11000000");
    reg.flip(6);
    expect(reg.value).toBe("10000000");
    reg.flip(7);
    expect(reg.value).toBe("00000000");
  });

  it("reads bits at position", () => {
    const reg = BinaryRegister.fromBinary("10101010"); // Initial value: 11 (binary 1011)

    expect(reg.bit(0)).toBeFalsy();
    expect(reg.bit(1)).toBeTruthy();
    expect(reg.bit(2)).toBeFalsy();
    expect(reg.bit(3)).toBeTruthy();
    expect(reg.bit(4)).toBeFalsy();
    expect(reg.bit(5)).toBeTruthy();
    expect(reg.bit(6)).toBeFalsy();
    expect(reg.bit(7)).toBeTruthy();
  });
});
