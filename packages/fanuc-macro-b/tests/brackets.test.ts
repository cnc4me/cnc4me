import { lines } from "../src";

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

describe("evaluating expresssions", () => {
  const { interpreter } = lines(code);
  const { Memory } = interpreter;

  it("can evaluate #1=100*[5/25]", () => {
    expect(Memory.read(1)).toBe(20);
  });

  it("can evaluate #2=10/2+3", () => {
    expect(Memory.read(2)).toBe(8);
  });

  it("can evaluate #3=10/[2+3]", () => {
    expect(Memory.read(3)).toBe(2);
  });

  it("can evaluate #4=1+2+3+4+5", () => {
    expect(Memory.read(4)).toBe(15);
  });

  it("can evaluate #5=[20-5]*2", () => {
    expect(Memory.read(5)).toBe(30);
  });

  it("can evaluate #6=20-[5*2]", () => {
    expect(Memory.read(6)).toBe(10);
  });

  it("can evaluate #7=2*3+5*2", () => {
    expect(Memory.read(7)).toBe(16);
  });

  it("can evaluate #8=2*[3+5]*2", () => {
    expect(Memory.read(8)).toBe(32);
  });

  it("can evaluate #9=[1+[2*[3]]]+[[6*2]+2]", () => {
    expect(Memory.read(9)).toBeWithinTolerance(0.642857, 0.000001);
  });

  it("can evaluate #10=[5+2]-[3+[5*2+2]/[2+3]]]", () => {
    expect(Memory.read(10)).toBeWithinTolerance(1.6, 1e-10);
  });
});
