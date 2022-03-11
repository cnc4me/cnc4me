import { Command, command, program } from "bandersnatch";

import { cyan, green } from "../colors";
import type { MacroRuntime } from "./MacroRuntime";

function rng(bounds: [number, number]) {
  const [min, max] = bounds;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Build CLI commands with info from the MacroRuntime
 */
export function buildCommands(runtime: MacroRuntime): Command[] {
  const { ActiveProgram, ProgramCount } = runtime;

  const rollCmd = command("roll")
    .option("min", { default: 1 })
    .option("max", { default: 6 })
    .action(args => {
      console.log(rng([args.min, args.max]));
    });

  // const activePrgCmd = command("list")
  //   .option("min", { default: 1 })
  //   .option("max", { default: 6 })
  //   .action(args => {
  //     console.log(`Programs Loaded: ${green(ProgramCount)}`);
  //     console.log(`Active Program: ${cyan(ActiveProgram)}`);
  //   });

  const activeCmd = command("active").action(() => {
    console.log(`Active Program: ${cyan(ActiveProgram)}`);
  });

  const countCmd = command("count").action(() => {
    console.log(`Program Count: ${green(ProgramCount)}`);
  });

  return [rollCmd, activeCmd, countCmd];
}

/**
 * Build the CLI program by creating commands and loading into the app
 */
export function MacroCli(runtime: MacroRuntime) {
  const cli = program();

  buildCommands(runtime).forEach(cmd => cli.add(cmd));

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
