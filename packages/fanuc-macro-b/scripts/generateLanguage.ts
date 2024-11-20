import { generateMonarchLanguageFromChevrotainTokens } from "@cnc4me/monaco-gcode";

import { TOKEN_VOCABULARY } from "../src";

const lang = generateMonarchLanguageFromChevrotainTokens(TOKEN_VOCABULARY);

console.log(lang);
