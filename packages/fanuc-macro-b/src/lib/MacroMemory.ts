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
    this.setToolOffsetValue(10, toolNum, value);
  }

  /**
   * Tool Length Compensation Offset Group (L11)
   */
  setToolLengthComp(toolNum: number, value: number) {
    this.setToolOffsetValue(11, toolNum, value);
  }

  /**
   * Tool Diameter Offset Group (L12)
   */
  setToolDiameter(toolNum: number, value: number) {
    this.setToolOffsetValue(12, toolNum, value);
  }

  /**
   * Tool Diameter Compensation Offset Group (L13)
   */
  setToolDiameterComp(toolNum: number, value: number) {
    this.setToolOffsetValue(13, toolNum, value);
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
    const target = this.getToolOffsetRegister(offsetGroup, toolNum);

    this.write(target, value);
  }

  /**
   * Set the work offset axis value
   */
  setWorkOffsetAxisValue(offsetGroup: OffsetGroups, axis: string, value: number) {
    const target = this.getWorkOffsetAxisRegister(offsetGroup, axis);

    this.write(target, value);
  }

  /**
   * Compose a tool offset register number by group and tool num.
   */
  getToolOffsetRegister(group: number, toolNum: number): number {
    const maxToolNum = this._config.UPPER_TOOL_NUMBER_LIMIT;

    if (toolNum > maxToolNum) {
      throw Error(`(${toolNum}) exceeds configured maximum tool number (${maxToolNum}).`);
    } else if (toolNum <= 0) {
      throw Error(`${toolNum} is invalid, Tools must be positive.`);
    }

    // eslint-disable-next-line prettier/prettier
    return (group * 1000) + toolNum;
  }

  /**
   * Compose a work offset axis register number by group and axis.
   *
   * The arguments `(54, "X")`  would produce `5221`
   */
  getWorkOffsetAxisRegister(offset: number, axis: string): number {
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
}
