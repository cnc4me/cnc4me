import type { GcodeRuleTokens } from "./language";
export declare const gcodeDarkTheme: import("monaco-editor").editor.IStandaloneThemeData & {
    rules: import("./types").NamedTokenThemeRule<GcodeRuleTokens>[];
};
export declare const gcodeLightTheme: import("monaco-editor").editor.IStandaloneThemeData & {
    rules: import("./types").NamedTokenThemeRule<`custom-${string}`>[];
};
export declare const Themes: {
    readonly "gcode-dark": import("monaco-editor").editor.IStandaloneThemeData & {
        rules: import("./types").NamedTokenThemeRule<GcodeRuleTokens>[];
    };
    readonly "gcode-light": import("monaco-editor").editor.IStandaloneThemeData & {
        rules: import("./types").NamedTokenThemeRule<`custom-${string}`>[];
    };
};
