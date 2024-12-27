import type { MonarchLanguage, ThemeData } from "./types";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
export declare class MonacoGcode {
    monaco: typeof Monaco;
    constructor(monaco: typeof Monaco);
    registerTheme(name: string, theme: ThemeData): this;
    registerLanguage(languageId: string, languageDef: MonarchLanguage): this;
    /**
     * Register the custom gcode language and themes
     */
    static register(monaco: typeof Monaco): void;
}
