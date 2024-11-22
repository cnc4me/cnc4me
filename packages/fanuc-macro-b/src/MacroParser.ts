import {
  createSyntaxDiagramsCode,
  generateCstDts,
  type GenerateDtsOptions,
  type ICreateSyntaxDiagramsConfig,
  type IRecognitionException,
  type IToken
} from "chevrotain";

import { MacroParserBase } from "./MacroParserBase";

import type { IMacroBase } from "./types";

export type MacroParserInitOptions = {
  preloadString: string;
  preloadTokens: IToken[];
};

export class MacroParser
  extends MacroParserBase
  implements IMacroBase<IRecognitionException>
{
  static getBaseCstVisitor(opts: { useConstructorDefaults: boolean }) {
    const parser = new MacroParserBase();
    return opts.useConstructorDefaults
      ? parser.getBaseCstVisitorConstructorWithDefaults()
      : parser.getBaseCstVisitorConstructor();
  }

  constructor() {
    super();
  }

  get hasErrors() {
    return this.errors.length > 0;
  }

  getErrors(): IRecognitionException[] {
    return this.errors;
  }

  setInput(tokens: IToken[]) {
    this.input = tokens;
  }

  generateCstDts(
    config?: GenerateDtsOptions & { convertExportToDeclare?: boolean }
  ) {
    const defaults: GenerateDtsOptions = {
      includeVisitorInterface: true,
      visitorInterfaceName: "ICstNodeVisitor"
    };
    const ast = this.getGAstProductions();
    const content = generateCstDts(ast, { ...defaults, ...config });
    if (config?.convertExportToDeclare) {
      return content.replaceAll("export", "declare");
    }
    return content;
  }

  generateHtml(config?: ICreateSyntaxDiagramsConfig): string {
    const serialAst = this.getSerializedGastProductions();

    return createSyntaxDiagramsCode(serialAst, config);
  }
}
