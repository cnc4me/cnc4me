import { describe, expect, it } from "vitest";

import { MacroRuntime } from "../../src";

const code = `
#1=1
#2=2
#3=3
#4=#2+#2
#5=[#2*3]-#1
#6=#1+#2+#3
#7=[5555 + .5]
#8=[#1+#2+#3]
#9=#7*#8
#10=[[48/#9]+[8*#4]]/[#5+[[#4*3]/2]+3]`;

const runtime = new MacroRuntime();

describe("macros expressions", () => {
  runtime.evalLines(code);

  const mem = runtime.Memory;

  it("parses with no errors", () => {
    expect(runtime.getErrors()).toHaveLength(0);
  });

  it("can interpret direct assignments", () => {
    expect(mem.read(1)).toBe(1);
    expect(mem.read(2)).toBe(2);
    expect(mem.read(3)).toBe(3);
  });

  it("can interpret expressions and variable expansion", () => {
    expect(mem.read(4)).toBe(4);
    expect(mem.read(5)).toBe(5);
    expect(mem.read(6)).toBe(6);
    expect(mem.read(7)).toBe(5555.5);
    expect(mem.read(8)).toBe(6);
    expect(mem.read(9)).toBe(33333);
    expect(mem.read(10)).toBeCloseTo(15.4014);
  });
});
