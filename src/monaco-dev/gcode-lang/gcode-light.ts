import { MonacoThemeDef } from "../chrysalis";

export const gcodeLightTheme: MonacoThemeDef = {
  base: "vs",
  inherit: false,
  rules: [
    { token: "custom-info", foreground: "808080" },
    { token: "custom-error", foreground: "ff0000", fontStyle: "bold" },
    { token: "custom-notice", foreground: "FFA500" },
    { token: "custom-date", foreground: "008800" }
  ],
  colors: {
    "editor.foreground": "#000000"
  }
};
