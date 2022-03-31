/**
 * Mapping of macro address registers to names.
 */
export const MACRO_VAR = {
  /**
   * MICROTIMER
   * This variable functions as a timer that counts in 1–millisecond
   * increments at all times. When the power is turned on, the value
   * of this variable is reset to 0. When 2147483648 milliseconds is
   * reached, the value of this timer returns to 0.
   */
  MICROTIMER: 3001,

  /**
   * Active Groups
   */
  GROUP_1: 4001, //  G00, G01, G02, G03, G33
  GROUP_2: 4002, //  G17, G18, G19
  GROUP_3: 4003, //  G90, G91
  GROUP_4: 4004, //  ?
  GROUP_5: 4005, //  G94, G95
  GROUP_6: 4006, //  G20, G21
  GROUP_7: 4007, //  G40, G41, G42
  GROUP_8: 4008, //  G43, G44, G49
  GROUP_9: 4009, //  G73, G74, G76, G80–G89
  GROUP_10: 4010, // G98, G99
  GROUP_11: 4011, // G98, G99
  GROUP_12: 4012, // G65, G66, G67
  GROUP_13: 4013, // G96, G97
  GROUP_14: 4014, // G54 – G59
  GROUP_15: 4015, // G61 – G64
  GROUP_16: 4016, // G68, G69
  GROUP_22: 4022, // ?

  /**
   * Current Commands
   */
  CURRENT_B: 4102,
  CURRENT_D: 4107,
  CURRENT_F: 4109,
  CURRENT_H: 4111,
  CURRENT_M: 4113,
  CURRENT_N_LINE: 4114,
  CURRENT_PROGRAM_NUMBER: 4115,
  CURRENT_S: 4119,
  CURRENT_T: 4120
} as const;

// #3002 This variable functions as a timer that counts in 1–hour
// increments when the cycle start lamp is on. This timer
// preserves its value even when the power is turned off. When
// 9544.371767 hours is reached, the value of this timer returns to
// 0.
// #3011 This variable can be used to read the current date (year/month/
// day). Year/month/day information is converted to an apparent
// decimal number. For example, September 28, 2001 is
// represented as 20010928.
// #3012 This variable can be used to read the current time (hours/min-
// utes/seconds). Hours/minutes/seconds information is converted
// to an apparent decimal number. For example, 34 minutes and
// 56 seconds after 3 p.m. is represented as 153456.

export const GroupValues = {
  [MACRO_VAR.GROUP_4]: [90, 91]
};
