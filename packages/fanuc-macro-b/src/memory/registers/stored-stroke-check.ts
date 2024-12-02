/**
 * Stored Stroke Check
 *
 * B-63944EN/02 - III - 6
 */

// Stored stroke check 1
// Parameters (Nos. 1320, 1321 or Nos. 1326, 1327) set boundary.
// Outside the area of the set limits is a forbidden area. The machine tool
// builder usually sets this area as the maximum stroke.
// When the tool enters a forbidden area and an alarm is generated, the
// tool can be moved in the reverse direction from which the tool came.
// At this time, a signal (overtravel alarm signal) can be output to the
// PMC if bit 6 (OTS) of parameter No. 1301 is set to 1. In addition,
// when the tool enters the forbidden area during manual operation, the
// signal (overtravel alarm signal) can be output to the PMC without
// generating the alarm by setting bit 1 (NAL) of parameter No. 1300 to
// 1. With this parameter setting, the alarm is generated when the tool
// enters the forbidden area during automatic operation.
// CAUTION
// 1 If the two points for specifying a forbidden area are
// identical, all areas are handled as forbidden areas
// for stored stroke check 1.
// 2 The size of a forbidden area must be set carefully.
// If the size is set incorrectly, the stroke becomes
// infinite.

export const STROKE_CHECK_1_P1 = 1320; // or 1326 // @todo not sure why or?
export const STROKE_CHECK_1_P2 = STROKE_CHECK_1_P1 + 1; // or 1327 // @todo not sure why or?

export const STROKE_CHECK_2_P1 = 1322;
export const STROKE_CHECK_2_P2 = STROKE_CHECK_1_P1 + 1;
