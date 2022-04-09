import { CodeTable } from "../types";

export const G_CODE_TABLE: CodeTable = {
  G00: {
    desc: "RAPID",
    group: "MOTION"
  },
  G01: {
    desc: "LINEAR",
    group: "MOTION"
  },
  G02: {
    desc: "CW_ARC",
    group: "MOTION"
  },
  G03: {
    desc: "CCW_ARC",
    group: "MOTION"
  },
  G04: {
    desc: "DWELL",
    group: "MOTION"
  },
  G05: {
    desc: "NON-MODAL_RAPID",
    group: "MOTION"
  },
  G09: {
    desc: "EXACT_STOP_CHECK",
    group: "MOTION"
  },
  G10: {
    desc: "PROGRAMMABLE_OFFSET_INPUT",
    group: "COMPENSATION"
  },
  G15: {
    desc: "Turn Polar Coordinates OFF, return to Cartesian Coordinates",
    group: "COORDINATE"
  },
  G16: {
    desc: "Turn Polar Coordinates ON",
    group: "COORDINATE"
  },
  G17: {
    desc: "SELECT_X-Y_PLANE",
    group: "COORDINATE"
  },
  G18: {
    desc: "SELECT_X-Z_PLANE",
    group: "COORDINATE"
  },
  G187: {
    desc: "SET_SMOOTHNESS_LEVEL",
    group: "OTHER"
  },
  G19: {
    desc: "SELECT_Y-Z_PLANE",
    group: "COORDINATE"
  },
  G20: {
    desc: "Program coordinates are inches",
    group: "COORDINATE"
  },
  G21: {
    desc: "Program coordinates are mm",
    group: "COORDINATE"
  },
  G27: {
    desc: "REFERENCE_RETURN_CHECK",
    group: "MOTION"
  },
  G28: {
    desc: "RETURN_TO_HOME",
    group: "MOTION"
  },
  G29: {
    desc: "RETURN_FROM_REFERENCE",
    group: "MOTION"
  },
  G40: {
    desc: "Tool cutter compensation off (radius comp.)",
    group: "COMPENSATION"
  },
  G41: {
    desc: "Tool cutter compensation left (radius comp.)",
    group: "COMPENSATION"
  },
  G42: {
    desc: "Tool cutter compensation right (radius comp.)",
    group: "COMPENSATION"
  },
  G43: {
    desc: "Apply tool length compensation (plus)",
    group: "COMPENSATION"
  },
  G44: {
    desc: "Apply tool length compensation (minus)",
    group: "COMPENSATION"
  },
  G49: {
    desc: "Tool length compensation cancel",
    group: "COMPENSATION"
  },
  G50: {
    desc: "Reset all scale factors to 1.0",
    group: "COMPENSATION"
  },
  G51: {
    desc: "Turn on scale factors",
    group: "COMPENSATION"
  },
  G52: {
    desc: "Local workshift for all coordinate systems, add XYZ offsets",
    group: "COORDINATE"
  },
  G53: {
    desc: "Machine coordinate system (cancel work offsets)",
    group: "COORDINATE"
  },
  G54: {
    desc: "Work coordinate system (1st Workpiece)",
    group: "COORDINATE"
  },
  G55: {
    desc: "Work coordinate system (2nd Workpiece)",
    group: "COORDINATE"
  },
  G56: {
    desc: "Work coordinate system (3rd Workpiece)",
    group: "COORDINATE"
  },
  G57: {
    desc: "Work coordinate system (4th Workpiece)",
    group: "COORDINATE"
  },
  G58: {
    desc: "Work coordinate system (5th Workpiece)",
    group: "COORDINATE"
  },
  G59: {
    desc: "Work coordinate system (6th Workpiece)",
    group: "COORDINATE"
  },
  G61: {
    desc: "Exact stop check mode",
    group: "OTHER"
  },
  G62: {
    desc: "Automatic corner override",
    group: "OTHER"
  },
  G63: {
    desc: "Tapping mode",
    group: "OTHER"
  },
  G64: {
    desc: "Best speed path",
    group: "OTHER"
  },
  G65: {
    desc: "Custom macro simple call",
    group: "OTHER"
  },
  G68: {
    desc: "Coordinate System Rotation",
    group: "COORDINATE"
  },
  G69: {
    desc: "Cancel Coordinate System Rotation",
    group: "COORDINATE"
  },
  G73: {
    desc: "High speed drilling cycle (small retract)",
    group: "CANNED"
  },
  G74: {
    desc: "LH_TAP_CYCLE",
    group: "CANNED"
  },
  G76: {
    desc: "Fine boring cyle",
    group: "CANNED"
  },
  G80: {
    desc: "CANCEL_CANNED",
    group: "CANNED"
  },
  G81: {
    desc: "PLUNGE_DRILL",
    group: "CANNED"
  },
  G82: {
    desc: "DRILL_WITH_DWELL",
    group: "CANNED"
  },
  G83: {
    desc: "DRILL_WITH_PECK",
    group: "CANNED"
  },
  G84: {
    desc: "RH_TAP_CYCLE",
    group: "CANNED"
  },
  G85: {
    desc: "FEED_IN_FEED_OUT_REAMING",
    group: "CANNED"
  },
  G86: {
    desc: "FEED_IN_RAPID_OUT_REAMING",
    group: "CANNED"
  },
  G87: {
    desc: "Back boring canned cycle",
    group: "CANNED"
  },
  G88: {
    desc: "Boring canned cycle, spindle stop, manual out",
    group: "CANNED"
  },
  G89: {
    desc: "Boring canned cycle, dwell, feed out",
    group: "CANNED"
  },
  G90: {
    desc: "ABSOLUTE",
    group: "MOTION"
  },
  G91: {
    desc: "INCREMENTAL",
    group: "MOTION"
  },
  G92: {
    desc: "Offset coordinate system and save parameters",
    group: "COORDINATE"
  },
  G94: {
    desc: "FEED_PER_MINUTE",
    group: "MOTION"
  },
  G95: {
    desc: "FEED_PER_REV",
    group: "MOTION"
  },
  G96: {
    desc: "CONSTANT_SURFACE_SPEED_ENABLE",
    group: "MOTION"
  },
  G97: {
    desc: "CONSTANT_SURFACE_SPEED_DISABLE",
    group: "MOTION"
  },
  G98: {
    desc: "RETURN_TO_INITIAL_Z_PLANE",
    group: "CANNED"
  },
  G99: {
    desc: "RETURN_TO_INITIAL_R_PLANE",
    group: "CANNED"
  },
  G101: {
    desc: "TOOL_SET_OR_CHECK",
    group: "OTHER"
  }
};
