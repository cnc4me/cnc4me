/* eslint-disable no-useless-escape */
import { createMonarchLanguage } from "../src/chrysalis";

describe("chrysalis", () => {
  it("createMonarchLanguage()", () => {
    const gcodeLang = createMonarchLanguage(
      [
        ["(", ")", "delimiter.paren"],
        ["[", "]", "delimiter.brace"]
      ],
      [
        [/#\d/, "macro-var"],
        [/\(.+\)/, "comment"],
        [/[\=\+\-\*\/]/, "operators"],
        [/(\d+(?:\.\d+)?)/, "number"]
        // [/\[[a-zA-Z 0-9:]+\]/, "custom-date"]
      ]
    );

    expect(gcodeLang.brackets).toBeTruthy();
    expect(gcodeLang.tokenizer["root"]).toBeTruthy();
  });
});
