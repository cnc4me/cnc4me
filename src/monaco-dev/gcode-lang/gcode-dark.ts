import { MonacoThemeDef } from "../chrysalis";

export const gcodeDarkTheme: MonacoThemeDef = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "number", foreground: "#FFE38A" },
    { token: "macro-var", foreground: "#F1AAFF" },
    // { token: "operators", foreground: "#cfcf4f" },
    { token: "comment", foreground: "#C09D70", fontStyle: "italic" }
    // { token: "custom-date", foreground: "008800" }
  ],
  colors: {
    "editor.foreground": "#3B9B9B"
  }
};
