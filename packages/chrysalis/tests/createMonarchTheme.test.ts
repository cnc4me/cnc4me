import { createMonarchTheme } from "../src/chrysalis";

describe("chrysalis", () => {
  it("createMonarchTheme()", () => {
    const theme = createMonarchTheme({
      rules: [
        { token: "custom-info", foreground: "808080" },
        { token: "custom-error", foreground: "ff0000", fontStyle: "bold" },
        { token: "custom-notice", foreground: "FFA500" },
        { token: "custom-date", foreground: "008800" }
      ],
      colors: {
        "editor.foreground": "#000000"
      }
    });

    expect(theme.base).toBe("vs");
    expect(theme.inherit).toBeFalse();
    expect(theme.rules).toBeArray();
    expect(theme.rules).toBeArrayOfSize(4);
    expect(theme.colors).toBeObject();
    expect(theme.colors["editor.foreground"]).toBe("#000000");
  });
});
