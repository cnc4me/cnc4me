import { describe, expect, it } from "vitest";

import { lines } from "../../src";

const code = `
#1=100*[5/25]
#2=10/2+3
#3=10/[2+3]
#4=1+2+3+4+5
#5=[20-5]*2
#6=20-[5*2]
#7=2*3+5*2
#8=2*[3+5]*2
#9=[[1+2]*3]/[[6*2]+2]]
#10=[5+2]-[3+[5*2+2]/[2+3]]]`;

describe("evaluating expressions enclosed in [brackets]", () => {
  const { runtime } = lines(code);
  const parser = runtime.Parser;
  const Memory = runtime.Memory;

  it("parses with no errors", () => {
    expect(parser.errors).toHaveLength(0);
  });

  it("can evaluate #1=100*[5/25]", () => {
    const val = Memory.read(1);
    expect(val).toBe(20);
  });

  it("can evaluate #2=10/2+3", () => {
    const val = Memory.read(2);
    expect(val).toBe(8);
  });

  it("can evaluate #3=10/[2+3]", () => {
    const val = Memory.read(3);
    expect(val).toBe(2);
  });

  it("can evaluate #4=1+2+3+4+5", () => {
    const val = Memory.read(4);
    expect(val).toBe(15);
  });

  it("can evaluate #5=[20-5]*2", () => {
    const val = Memory.read(5);
    expect(val).toBe(30);
  });

  it("can evaluate #6=20-[5*2]", () => {
    const val = Memory.read(6);
    expect(val).toBe(10);
  });

  it("can evaluate #7=2*3+5*2", () => {
    const val = Memory.read(7);
    expect(val).toBe(16);
  });

  it("can evaluate #8=2*[3+5]*2", () => {
    const val = Memory.read(8);
    expect(val).toBe(32);
  });

  it("can evaluate #9=[1+[2*[3]]]+[[6*2]+2]", () => {
    const val = Memory.read(9);
    expect(val).toMatchWithinTolerance(0.642857);
  });

  it("can evaluate #10=[5+2]-[3+[5*2+2]/[2+3]]]", () => {
    const val = Memory.read(10);
    expect(val).toMatchWithinTolerance(1.6);
  });
});
