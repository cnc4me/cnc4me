import { MEMORY } from "../PackageConfig";
import { G10Line } from "./G10Line";

type OffsetGroups = 53 | 54 | 55 | 56 | 57 | 58 | 59;

interface AxisLocations {
  X: number;
  Y: number;
  Z: number;
  B: number;
}

interface UpdatedValue {
  prev: number;
  curr: number;
}

type PositioningMode = "G90" | "G91";

function range(start: number, end: number) {
  end = end + 1; // include the end
  const length = (end - start) / 1;
  return Array.from({ length }, (_, i) => start + i);
}

const WORK_OFFSET_MAP: Record<number, number> = {
  54: 22,
  55: 24,
  56: 26,
  57: 28,
  58: 30,
  59: 32
};

const AXIS_MAP: Record<string, number> = {
  X: 1,
  Y: 2,
  Z: 3,
  B: 4
};

export class MacroMemory {
  private _config: typeof MEMORY;
  private _mode: PositioningMode;
  private _vars: Record<number, number>;

  constructor(mode: PositioningMode = "G90") {
    this._vars = {};
    this._mode = mode;
    this._config = MEMORY;

    range(1, 14000).forEach(idx => this.resetVar(idx));
  }

  /**
   * Read a value from a register
   */
  read(key: number): number {
    return this._vars[key];
  }

  /**
   * Write  a value to a register
   */
  write(key: number, value: number): UpdatedValue {
    const prev = this._vars[key];

    this._vars[key] = value;

    return {
      prev,
      curr: this._vars[key]
    };
  }

  /**
   * Increment a value in a register
   */
  adjust(key: number, value: number): UpdatedValue {
    const prev = this._vars[key];

    this._vars[key] = prev + value;

    return {
      prev,
      curr: this._vars[key]
    };
  }

  /**
   * Check if a register has a value
   */
  isset(register: number): boolean {
    return Boolean(this._vars[register]);
  }

  /**
   * Clear a register value by writing `NaN`
   */
  resetVar(register: number): void {
    this._vars[register] = NaN;
  }

  /**
   * Evaluate a G10 line to extract values
   */
  evalG10(g10: G10Line) {
    const { L: group, P: register } = g10;

    // const macro = group.value + register.value;

    console.log(group, register);
  }

  /**
   * Tool Length Offset Group (L10)
   */
  setToolLength(toolNum: number, value: number) {
    this.setToolOffsetValue(toolNum, 10, value);
  }

  /**
   * Tool Length Compensation Offset Group (L11)
   */
  setToolLengthComp(toolNum: number, value: number) {
    this.setToolOffsetValue(toolNum, 11, value);
  }

  /**
   * Tool Diameter Offset Group (L12)
   */
  setToolDiameter(toolNum: number, value: number) {
    this.setToolOffsetValue(toolNum, 12, value);
  }

  /**
   * Tool Diameter Compensation Offset Group (L13)
   */
  setToolDiameterComp(toolNum: number, value: number) {
    this.setToolOffsetValue(toolNum, 13, value);
  }

  /**
   * Set axis values for a Work Offset Group (L2)
   */
  setWorkOffset(offsetGroup: OffsetGroups, locations: Partial<AxisLocations>) {
    Object.entries(locations).forEach(([axis, value]) => {
      if (value) {
        this.setWorkOffsetAxisValue(offsetGroup, axis, value);
      }
    });
  }

  /**
   * Set axis values for an Extended Work Offset Group (L20)
   */
  setWorkExtendedOffset(extOffsetGroup: OffsetGroups, locations: Partial<AxisLocations>) {
    Object.entries(locations).forEach(([axis, value]) => {
      if (value) {
        this.setWorkOffsetAxisValue(extOffsetGroup, axis, value);
      }
    });
  }

  /**
   * Set the group value for a tool by number
   */
  setToolOffsetValue(toolNum: number, offsetGroup: number, value: number) {
    this._validateToolNumber(toolNum);

    const target = this.composeToolOffsetRegister(offsetGroup, toolNum);

    this.write(target, value);
  }

  /**
   * Set the work offset axis value
   */
  setWorkOffsetAxisValue(offsetGroup: OffsetGroups, axis: string, value: number) {
    const target = this.composeWorkOffsetAxisRegister(offsetGroup, axis);

    this.write(target, value);
  }

  /**
   * Compose a tool offset register number by group and tool num.
   */
  composeToolOffsetRegister(group: number, toolNum: number): number {
    this._validateToolNumber(toolNum);
    // eslint-disable-next-line prettier/prettier
    return (group * 1000) + toolNum;
  }

  /**
   * Compose a work offset axis register number by group and axis.
   *
   * The arguments `(54, "X")`  would produce `5221`
   */
  composeWorkOffsetAxisRegister(offset: number, axis: string): number {
    // eslint-disable-next-line prettier/prettier
    return 5000 + (WORK_OFFSET_MAP[offset] * 10) + AXIS_MAP[axis];
  }

  toArray() {
    const valueArr: [register: number, value: number][] = [];

    Object.entries(this._vars).forEach(([register, value]) => {
      if (value) {
        valueArr.push([parseInt(register), value]);
      }
    });

    return valueArr;
  }

  private _validateToolNumber(toolNum: number) {
    const maxToolNum = this._config.UPPER_TOOL_NUMBER_LIMIT;

    if (toolNum > maxToolNum) {
      throw Error(`(${toolNum}) exceeds configured maximum tool number (${maxToolNum}).`);
    } else if (toolNum <= 0) {
      throw Error(`${toolNum} is invalid, Tools must be positive.`);
    }
  }
}

// www.cncdata.co.uk 15
// System Variables for Time Information
// Variable
// number Function
// #3001 This variable functions as a timer that counts in 1–millisecond
// increments at all times. When the power is turned on, the value
// of this variable is reset to 0. When 2147483648 milliseconds is
// reached, the value of this timer returns to 0.
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
// // System Variables for Modal Information
// Variable
// Number Function Group
// #4001 G00, G01, G02, G03, G33 Group 1
// #4002 G17, G18, G19 Group 2
// #4003 G90, G91 Group 3
// #4004 Group 4
// #4005 G94, G95 Group 5
// #4006 G20, G21 Group 6
// #4007 G40, G41, G42 Group 7
// #4008 G43, G44, G49 Group 8
// #4009 G73, G74, G76, G80–G89 Group 9
// #4010 G98, G99 Group 10
// #4011 G98, G99 Group 11
// #4012 G65, G66, G67 Group 12
// #4013 G96,G97 Group 13
// #4014 G54–G59 Group 14
// #4015 G61–G64 Group 15
// #4016 G68, G69 Group 16
// : : :
// #4022 Group 22
// #4102 B code
// #4107 D code
// #4109 F code
// #4111 H code
// #4113 M code
// #4114 Sequence number
// #4115 Program number
// #4119 S code
// #4120 T code
