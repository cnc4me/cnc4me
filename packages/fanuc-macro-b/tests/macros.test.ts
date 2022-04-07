import { lines } from "../src";

const code = `#1=1
#2=2
#3=3
#4=#2+#2
#5=[#2*3]-#1
#6=#1+#2+#3
#7=3
#8=[#1+#2+#3]
#9=#7*#8
#10=[[48/#9]+[8*#4]]/[#5+[[#4*3]/2]+3]`;

describe("macros expressions", () => {
  const { interpreter, parser } = lines(code);
  const { Memory } = interpreter;

  it("parses with no errors", () => {
    expect(parser.errors).toHaveLength(0);
  });

  it("can interpret variable assignments", () => {
    expect(Memory.read(1)).toBe(1);
    expect(Memory.read(2)).toBe(2);
    expect(Memory.read(3)).toBe(3);
    expect(Memory.read(4)).toBe(4);
    expect(Memory.read(5)).toBe(5);
    expect(Memory.read(6)).toBe(6);
    expect(Memory.read(7)).toBe(3);
    expect(Memory.read(8)).toBe(6);
    expect(Memory.read(9)).toBe(18);
    expect(Memory.read(10)).toBeWithinTolerance(2.47619, 5e-5);
  });
});
