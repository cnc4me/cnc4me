import { CodeTable } from "../../types/NcSpec";
import { describeCode } from "./lib";

export const M_CODE_TABLE: CodeTable = {
  0: describeCode("PROGRAM_STOP"),
  1: describeCode("OPTIONAL_STOP"),
  3: describeCode("SPINDLE_FORWARD"),
  4: describeCode("SPINDLE_REVERSE"),
  5: describeCode("SPINDLE_STOP"),
  6: describeCode("TOOL_CHANGE"),
  7: describeCode("MIST_COOLANT_ON"),
  8: describeCode("FLOOD_COOLANT_ON"),
  9: describeCode("COOLANT_OFF"),
  21: describeCode("B_AXIS_LOCK"),
  22: describeCode("B_AXIS_UNLOCK"),
  29: describeCode("RIGID_TAPPING"),
  30: describeCode("PROGRAM_END"),
  50: describeCode("TSC_COOLANT_ON"),
  52: describeCode("THRU_TOOL_AIR_ON"),
  53: describeCode("THRU_TOOL_AIR_OFF"),
  80: describeCode("SYNCHRONIZED_TAPPING"),
  98: describeCode("SUBPROGRAM_CALL"),
  99: describeCode("RETURN_FROM_SUB_OR_LOOP"),
  107: describeCode("SAFE_START")
};
