import { CodeTable } from "../types";

export const M_CODE_TABLE: CodeTable = {
  0: { desc: "PROGRAM_STOP" },
  1: { desc: "OPTIONAL_STOP" },
  3: { desc: "SPINDLE_FORWARD" },
  4: { desc: "SPINDLE_REVERSE" },
  5: { desc: "SPINDLE_STOP" },
  6: { desc: "TOOL_CHANGE" },
  7: { desc: "MIST_COOLANT_ON" },
  8: { desc: "FLOOD_COOLANT_ON" },
  9: { desc: "COOLANT_OFF" },
  21: { desc: "B_AXIS_LOCK" },
  22: { desc: "B_AXIS_UNLOCK" },
  29: { desc: "RIGID_TAPPING" },
  30: { desc: "PROGRAM_END" },
  50: { desc: "TSC_COOLANT_ON" },
  52: { desc: "THRU_TOOL_AIR_ON" },
  53: { desc: "THRU_TOOL_AIR_OFF" },
  80: { desc: "SYNCHRONIZED_TAPPING" },
  98: { desc: "SUBPROGRAM_CALL" },
  99: { desc: "RETURN_FROM_SUB_OR_LOOP" },
  107: { desc: "SAFE_START" }
};
