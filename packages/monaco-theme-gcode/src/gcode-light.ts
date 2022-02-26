import { createMonarchTheme } from "@cnc4me/chrysalis";

export const gcodeLightTheme = createMonarchTheme(
  {
    rules: [
      { token: "custom-info", foreground: "808080" },
      { token: "custom-error", foreground: "ff0000", fontStyle: "bold" },
      { token: "custom-notice", foreground: "FFA500" },
      { token: "custom-date", foreground: "008800" }
    ],
    colors: {
      "editor.foreground": "#000000"
    }
  },
  {
    base: "vs",
    inherit: false
  }
);
