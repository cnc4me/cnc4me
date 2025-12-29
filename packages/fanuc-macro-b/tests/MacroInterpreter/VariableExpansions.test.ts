import { describe, expect, it } from "vitest";
import { FanucMacroB } from "../../src";

const code = `
#1=1
#2=2
#3=3
#4=#2+#2
#5=[#2*3]-#1
#6=#1+#2+#3
#7=[[#3/#2]+.5]
#8=[#1+#2+#3]
#9=#7*#8
#10=[[48/#9]+[8*#4]]/[#5+[[#4*3]/2]+3]`;

const fmb = new FanucMacroB();

describe("interpreting expressions with variable expansion", () => {
  fmb.eval(code);

  it("parses with no errors", () => {
    expect(fmb.hasErrors).toBeFalsy();
  });

  it("correctly sets and uses variables", () => {
    const mem = fmb.memory;

    expect(mem.read(1)).toBe(1);
    expect(mem.read(2)).toBe(2);
    expect(mem.read(3)).toBe(3);
    expect(mem.read(4)).toBe(4);
    expect(mem.read(5)).toBe(5);
    expect(mem.read(6)).toBe(6);
    expect(mem.read(7)).toBe(2);
    expect(mem.read(8)).toBe(6);
    expect(mem.read(9)).toBe(12);
    expect(mem.read(10)).toBeCloseTo(2.57014);
  });
});
