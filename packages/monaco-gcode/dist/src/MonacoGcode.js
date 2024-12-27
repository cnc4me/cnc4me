import { gcodeLanguage } from "./language";
import { Themes } from "./themes";
export class MonacoGcode {
    monaco;
    constructor(monaco) {
        this.monaco = monaco;
    }
    registerTheme(name, theme) {
        this.monaco.editor.defineTheme(name, theme);
        return this;
    }
    registerLanguage(languageId, languageDef) {
        this.monaco.languages.register({ id: languageId });
        this.monaco.languages.setMonarchTokensProvider(languageId, languageDef);
        return this;
    }
    /**
     * Register the custom gcode language and themes
     */
    static register(monaco) {
        const instance = new MonacoGcode(monaco);
        // monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
        instance.registerLanguage("gcode", gcodeLanguage);
        Object.entries(Themes).forEach(([name, theme]) => {
            instance.registerTheme(name, theme);
        });
    }
}
