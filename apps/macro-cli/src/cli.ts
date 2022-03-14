import type { MacroRuntime } from "@cnc4me/fanuc-macro-b";
import { program } from "bandersnatch";

import { buildCommands } from "./commands";

/**
 * Build the CLI program by creating commands and loading into the app
 */
export function MacroCli(runtime: MacroRuntime) {
  const cli = program();
  const commands = buildCommands(runtime);

  commands.forEach(cmd => cli.add(cmd));

  return cli;
}

/**
 * Run the CLI program as a REPL
 */
export function MacroRepl(runtime: MacroRuntime) {
  const title = "==          Fanuc Macro B          ==";

  console.log("=".repeat(title.length));
  console.log(title);
  console.log("=".repeat(title.length));

  return MacroCli(runtime).repl();
}
