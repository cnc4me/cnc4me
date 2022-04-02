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
