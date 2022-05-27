/**
 * Microtimer
 *
 * This variable functions as a timer that counts in 1–millisecond
 * increments at all times. When the power is turned on, the value
 * of this variable is reset to 0. When 2147483648 milliseconds is
 * reached, the value of this timer returns to 0.
 */
export const MICROTIMER = 3001;
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
/**********************************************************************
 * Modal Groups
 **********************************************************************/
/**
 * Movement Command
 *
 * @example 0, 1, 2, 3, 33
 */
export const GROUP_1 = 4001;
/**
 * Plane Selection
 *
 * @example 17, 18, 19
 */
export const GROUP_2 = 4002;
/**
 * Absolute / Incremental Positioning
 *
 * @example 90, 91
 */
export const GROUP_3 = 4003;
/**
 * Active Groups
 */
export const GROUP_4 = 4004; //  ?
export const GROUP_5 = 4005; //  G94, G95
export const GROUP_6 = 4006; //  G20, G21
export const GROUP_7 = 4007; //  G40, G41, G42
export const GROUP_8 = 4008; //  G43, G44, G49
export const GROUP_9 = 4009; //  G73, G74, G76, G80–G89
export const GROUP_10 = 4010; // G98, G99
export const GROUP_11 = 4011; // G98, G99
export const GROUP_12 = 4012; // G65, G66, G67
export const GROUP_13 = 4013; // G96, G97
/**
 * Active Local Work Offset
 *
 * @example 54, 55, 56, 57, 58, 59
 */
export const GROUP_14 = 4014;
/**
 * G61 – G64
 */
export const GROUP_15 = 4015;
/**
 * @example 68, 69
 */
export const GROUP_16 = 4016;
/**
 * ?
 */
export const GROUP_22 = 4022;
/**********************************************************************
 * Currently Active
 **********************************************************************/
/**
 *
 */
export const CURRENT_B = 4102;
export const CURRENT_D = 4107;
export const CURRENT_F = 4109;
export const CURRENT_H = 4111;
export const CURRENT_M = 4113;
export const CURRENT_N_LINE = 4114;
export const CURRENT_PROGRAM_NUMBER = 4115;
export const CURRENT_S = 4119;
export const CURRENT_T = 4120;
