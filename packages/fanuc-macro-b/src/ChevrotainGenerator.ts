import { createSyntaxDiagramsCode, generateCstDts } from "chevrotain";

import type {
  BaseParser,
  GenerateDtsOptions,
  ICreateSyntaxDiagramsConfig
} from "chevrotain";

export class ChevrotainGenerator {
  #parser: BaseParser;

  constructor(parser: BaseParser) {
    this.#parser = parser;
  }

  /**
   * Create TypeScript types from a {@link BaseParser}
   */
  getCstDts(config?: GenerateCstDtsOptions) {
    const defaults: GenerateDtsOptions = {
      includeVisitorInterface: true,
      visitorInterfaceName: "ICstNodeVisitor"
    };

    const ast = this.#parser.getGAstProductions();

    const content = generateCstDts(ast, { ...defaults, ...config });

    if (config?.convertExportToDeclare) {
      return content.replaceAll("export", "declare");
    }

    return content;
  }

  /**
   * Create a railroad diagram from a {@link BaseParser}
   */
  getHtml(config?: ICreateSyntaxDiagramsConfig): string {
    const serialAst = this.#parser.getSerializedGastProductions();

    return createSyntaxDiagramsCode(serialAst, config);
  }
}

type GenerateCstDtsOptions = GenerateDtsOptions & {
  convertExportToDeclare?: boolean;
};
