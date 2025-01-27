import gcodes from "./gcodes.json";
import mcodes from "./mcodes.json";

export const G = gcodes as GCode[];
export const M = mcodes as MCode[];

export const CodeExplain = {
  /**
   * Find the explination for a G Code
   */
  G: (code: string) => G.find(g => g.code === code),

  /**
   * Find the explination for an M Code
   */
  M: (code: string) => M.find(m => m.code === code)
};

type GCode = {
  code: `G${string}`;
  function: string;
  group: string;
  modal: boolean;
  alias_of: string;
};

type MCode = {
  code: `M${string}`;
  function: string;
  group: string;
  modal: boolean;
  alias_of: string;
};
