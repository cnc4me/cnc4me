import { createToolchain } from "@cnc4me/fanuc-macro-b";

type ToolchainReturnType = ReturnType<typeof createToolchain>;
type ToolchainInitParam = Parameters<typeof createToolchain>[0];

interface UseMacroToolsResult {
  lexer: ToolchainReturnType["lexer"];
  parser: ToolchainReturnType["parser"];
  interpreter: ToolchainReturnType["interpreter"];
}

export function useMacroTools(opts?: ToolchainInitParam): UseMacroToolsResult {
  const { interpreter, lexer, parser } = createToolchain(opts);

  return { interpreter, lexer, parser };
}
