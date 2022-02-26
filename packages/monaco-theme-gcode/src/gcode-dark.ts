import { createMonarchTheme } from "@cnc4me/chrysalis";

export const gcodeDarkTheme = createMonarchTheme(
  {
    rules: [
      // { token: "number", foreground: "#FFE38A" },
      // { token: "macro-var", foreground: "#F1AAFF" },
      // { token: "operators", foreground: "#cfcf4f" },
      { token: "comment", foreground: "#C09D70", fontStyle: "italic" }
      // { token: "custom-date", foreground: "008800" }
    ],
    colors: {}
  },
  { base: "vs-dark", inherit: true }
);
