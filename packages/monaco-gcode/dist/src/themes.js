import { createTheme } from "./utils";
export const gcodeDarkTheme = createTheme({
    base: "vs-dark",
    inherit: true,
    rules: [
        { token: "number", foreground: "#FFE38A" },
        { token: "g-code", foreground: "#02524f" },
        { token: "m-code", foreground: "#5fe04f" },
        { token: "z-move", foreground: "#fc2c2c" },
        { token: "operators", foreground: "#0f4fff" },
        { token: "address", foreground: "#fcfc2c" },
        { token: "macro-var", foreground: "#aa0bac" },
        { token: "keyword", foreground: "#F1AAFF", fontStyle: "italic" },
        { token: "comment", foreground: "#C09D70", fontStyle: "italic" }
    ],
    colors: {}
});
export const gcodeLightTheme = createTheme({
    base: "vs",
    inherit: false,
    rules: [
        { token: "custom-info", foreground: "#808080" },
        { token: "custom-error", foreground: "#ff0000", fontStyle: "bold" },
        { token: "custom-notice", foreground: "#FFA500" },
        { token: "custom-date", foreground: "#008800" }
    ],
    colors: {
        "editor.foreground": "#000000"
    }
});
export const Themes = {
    "gcode-dark": gcodeDarkTheme,
    "gcode-light": gcodeLightTheme
};
