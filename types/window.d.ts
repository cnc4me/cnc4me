import * as MacroB from "../src";

declare global {
  interface Window {
    MacroB: typeof MacroB;
  }
}

export {};
