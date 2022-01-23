import { parse } from "../utils";

describe.skip("Fanuc Macro B Parser", () => {
  it("Can parse a variable assignment", () => {
    const { parser } = parse(`#500 = 12.5423`);
    const node = parser.variableAssignment();

    expect(parser.errors).toHaveLength(0);

    expect(node.name).toEqual("variableAssignment");
    expect(node.children).toHaveLength(3);
    expect(node.children).toMatchObject({
      children: {
        macroVariable: expect.anything(),
        Equals: expect.anything(),
        NumericValue: expect.anything()
      }
    });
  });

  it.skip("Can will error with a bad variable assignment", () => {
    const { parser } = parse(`#500 = #`);

    const node = parser.variableAssignment();

    expect(parser.errors).toHaveLength(1);
  });
});
