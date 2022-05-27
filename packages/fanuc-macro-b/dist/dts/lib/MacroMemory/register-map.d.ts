/**
 * Microtimer
 *
 * This variable functions as a timer that counts in 1–millisecond
 * increments at all times. When the power is turned on, the value
 * of this variable is reset to 0. When 2147483648 milliseconds is
 * reached, the value of this timer returns to 0.
 */
export declare const MICROTIMER = 3001;
/**********************************************************************
 * Modal Groups
 **********************************************************************/
/**
 * Movement Command
 *
 * @example 0, 1, 2, 3, 33
 */
export declare const GROUP_1 = 4001;
/**
 * Plane Selection
 *
 * @example 17, 18, 19
 */
export declare const GROUP_2 = 4002;
/**
 * Absolute / Incremental Positioning
 *
 * @example 90, 91
 */
export declare const GROUP_3 = 4003;
/**
 * Active Groups
 */
export declare const GROUP_4 = 4004;
export declare const GROUP_5 = 4005;
export declare const GROUP_6 = 4006;
export declare const GROUP_7 = 4007;
export declare const GROUP_8 = 4008;
export declare const GROUP_9 = 4009;
export declare const GROUP_10 = 4010;
export declare const GROUP_11 = 4011;
export declare const GROUP_12 = 4012;
export declare const GROUP_13 = 4013;
/**
 * Active Local Work Offset
 *
 * @example 54, 55, 56, 57, 58, 59
 */
export declare const GROUP_14 = 4014;
/**
 * G61 – G64
 */
export declare const GROUP_15 = 4015;
/**
 * @example 68, 69
 */
export declare const GROUP_16 = 4016;
/**
 * ?
 */
export declare const GROUP_22 = 4022;
/**********************************************************************
 * Currently Active
 **********************************************************************/
/**
 *
 */
export declare const CURRENT_B = 4102;
export declare const CURRENT_D = 4107;
export declare const CURRENT_F = 4109;
export declare const CURRENT_H = 4111;
export declare const CURRENT_M = 4113;
export declare const CURRENT_N_LINE = 4114;
export declare const CURRENT_PROGRAM_NUMBER = 4115;
export declare const CURRENT_S = 4119;
export declare const CURRENT_T = 4120;
