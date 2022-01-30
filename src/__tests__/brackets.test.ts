import { evaluate } from "../utils";

describe("Evaluating expresssions", () => {
  it("can evaluate #1=100*[5/25]", () => {
    const { macros } = evaluate("#1=100*[5/25]");

    expect(macros.get(1)).toBe(20);
  });

  it("can evaluate #2=10/2+3", () => {
    const { macros } = evaluate("#2=10/2+3");

    expect(macros.get(2)).toBe(8);
  });

  it("can evaluate #3=10/[2+3]", () => {
    const { macros } = evaluate("#3=10/[2+3]");

    expect(macros.get(3)).toBe(2);
  });

  it("can evaluate #4=1+2+3+4+5", () => {
    const { macros } = evaluate("#4=1+2+3+4+5");

    expect(macros.get(4)).toBe(15);
  });

  it("can evaluate #5=[20-5]*2", () => {
    const { macros } = evaluate("#5=[20-5]*2");

    expect(macros.get(5)).toBe(30);
  });

  it("can evaluate #6=20-[5*2]", () => {
    const { macros } = evaluate("#6=20-[5*2]");

    expect(macros.get(6)).toBe(10);
  });

  it("can evaluate #7=2*3+5*2", () => {
    const { macros } = evaluate("#7=2*3+5*2");

    expect(macros.get(7)).toBe(16);
  });

  it("can evaluate #8=2*[3+5]*2", () => {
    const { macros } = evaluate("#8=2*[3+5]*2");

    expect(macros.get(8)).toBe(32);
  });

  it("can evaluate #9=[1+[2*[3]]]+[[6*2]+2]", () => {
    const { macros } = evaluate("#9=[[1+2]*3]/[[6*2]+2]]");

    expect(macros.get(9)).toBe(0.64286);
  });

  it("can evaluate #10=[5+2]-[3+[5*2+2]/[2+3]]]", () => {
    const { macros } = evaluate("#10=[5+2]-[3+[5*2+2]/[2+3]]]");

    expect(macros.get(10)).toBe(1.6);
  });
});
