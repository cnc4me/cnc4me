import type { MacroRuntime } from "@cnc4me/fanuc-macro-b";
import type { Command } from "bandersnatch";
import { command } from "bandersnatch";

import { cyan, green } from "./colors";

/**
 * Build CLI commands with info from the MacroRuntime
 */
export function buildCommands(runtime: MacroRuntime): Command[] {
  const { ActiveProgram, ProgramCount } = runtime;

  const rollCmd = command("activate").action(args => {
    console.log(args);
  });

  const listCmd = command("list").action(() => {
    console.log(`Programs Loaded: ${green(ProgramCount)}`);
    runtime.getPrograms().forEach(program => {
      console.log(`${program.input}`);
    });
    console.log(`Active Program: ${cyan(ActiveProgram)}`);
  });

  const activeCmd = command("active").action(() => {
    console.log(`Active Program: ${cyan(ActiveProgram)}`);
  });

  const countCmd = command("count").action(() => {
    console.log(`Program Count: ${green(ProgramCount)}`);
  });

  return [listCmd, rollCmd, activeCmd, countCmd];
}
