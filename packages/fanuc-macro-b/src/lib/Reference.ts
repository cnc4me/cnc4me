import gcodes from "./Reference.gcodes.json";
import mcodes from "./Reference.mcodes.json";

export const G = gcodes as GCode[];
export const M = mcodes as MCode[];

export const Reference = {
  /**
   * Find the Reference Data for a G Code
   */
  G: (code: string) => G.find(g => g.code === code),

  /**
   * Find the Reference Data for an M Code
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
