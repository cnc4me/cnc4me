import { evaluate } from "../utils";

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

describe("Macros expressions", () => {
  const { macros, parseErrors } = evaluate(code);

  it("parses with no errors", () => {
    expect(parseErrors).toHaveLength(0);
  });

  it("can interpret variable assignments", () => {
    expect(macros.get(1)).toBe(1);
    expect(macros.get(2)).toBe(2);
    expect(macros.get(3)).toBe(3);
    expect(macros.get(4)).toBe(4);
    expect(macros.get(5)).toBe(5);
    expect(macros.get(6)).toBe(6);
    expect(macros.get(7)).toBe(3);
    expect(macros.get(8)).toBe(6);
    expect(macros.get(9)).toBe(18);
    expect(macros.get(10)).toBe(2.47619);
  });
});
