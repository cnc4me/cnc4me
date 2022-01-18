import { sample1 } from "../../demo/samples";
import interpret from "../interpreter/interpret";

describe("Fanuc Macro B Interpreter", () => {
  it("Can extract the program title from `sample1`", () => {
    const { lexResult, parseErrors } = interpret(sample1);

    expect(parseErrors).toHaveLength(0);
    expect(lexResult.groups.comments[0].image).toEqual("(PALLET RUNNER)");
  });
});
