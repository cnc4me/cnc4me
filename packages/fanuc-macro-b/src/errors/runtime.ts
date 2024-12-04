export class MacroRuntimeError extends Error {
  //
}

export class NoActiveProgram extends MacroRuntimeError {
  constructor() {
    super(`There is no active program.`);
  }
}

export class ProgramNumberNotFound extends MacroRuntimeError {
  constructor(programNumber: number | string | null) {
    super(`Program number "${programNumber}" not found.`);
  }
}

export class InvalidProgramNumber extends MacroRuntimeError {
  constructor(programNumber: string) {
    super(
      [
        `"${programNumber}" is not a valid program number.`,
        `Program numbers as strings must start with "O"`
      ].join("\n")
    );
  }
}
