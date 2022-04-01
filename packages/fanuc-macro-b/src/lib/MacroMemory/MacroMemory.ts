import Debug from "debug";
import { pick } from "lodash";
import { __, match } from "ts-pattern";

import { MEMORY } from "../../PackageConfig";
import type { AxisLocations, G10Line, ToolOffsetValues, UpdatedValue } from "../../types";
import { range } from "../../utils";
import { OFFSET_GROUPS } from "./OffsetGroups";
import { MACRO_VAR } from "./OffsetRegisters";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const debug = Debug("macro:memory");
// debug.enabled = true;

/**
 * A Representaion of a CNC machines' macro memory.
 */
export class MacroMemory {
  private _mode: number;
  private _config = MEMORY;
  private _vars: Record<number, number> = {};
  private _modals: Record<number, number> = {};

  get G54(): AxisLocations {
    return this._getCommonWorkOffsetAxisLocations(54);
  }

  get G55(): AxisLocations {
    return this._getCommonWorkOffsetAxisLocations(55);
  }

  get G56(): AxisLocations {
    return this._getCommonWorkOffsetAxisLocations(56);
  }

  get G57(): AxisLocations {
    return this._getCommonWorkOffsetAxisLocations(57);
  }

  get G58(): AxisLocations {
    return this._getCommonWorkOffsetAxisLocations(58);
  }

  get G59(): AxisLocations {
    return this._getCommonWorkOffsetAxisLocations(59);
  }

  constructor(mode?: number) {
    this._mode = mode ?? 90;

    range(1, 14000).forEach(idx => this.clear(idx));
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
   * Write a value to a named register
   */
  modal(key: keyof typeof MACRO_VAR, value: number): UpdatedValue {
    const register = MACRO_VAR[key];
    const prev = this._vars[register];

    this._vars[register] = value;

    return {
      prev,
      curr: this._vars[register]
    };
  }

  /**
   * Increment a value in a register
   */
  increment(key: number, value: number): UpdatedValue {
    const prev = this._vars[key];

    this._vars[key] = prev + value;

    return {
      prev,
      curr: this._vars[key]
    };
  }

  /**
   * Clear a register value by writing `NaN`
   */
  clear(register: number): void {
    this._vars[register] = NaN;
  }

  /**
   * Evaluate a G10 line to extract values
   */
  g10(g10: G10Line) {
    const { WORK, TOOL } = OFFSET_GROUPS;

    debug("Evaluating G10 line", g10);

    return match<G10Line>(g10)
      .with({ L: WORK.COMMON }, ({ P, ...rest }) => {
        const positions = pick(rest, ["X", "Y", "Z", "B"]);

        this.setCommonWorkOffset(P + 53, positions);
      })
      .with({ L: WORK.AUX }, ({ P, ...rest }) => {
        const positions = pick(rest, ["X", "Y", "Z", "B"]);

        this.setAuxWorkOffset(P, positions);
        debug(`L20 P${P}`);
      })
      .with({ L: TOOL.LENGTH_COMP, R: __.number }, ({ P, R }) => {
        this.setToolLengthComp(P, R);
      })
      .with({ L: TOOL.LENGTH, R: __.number }, ({ P, R }) => {
        this.setToolLength(P, R);
      })
      .with({ L: TOOL.DIAMETER_COMP, R: __.number }, ({ P, R }) => {
        this.setToolDiameterComp(P, R);
      })
      .with({ L: TOOL.DIAMETER, R: __.number }, ({ P, R }) => {
        this.setToolDiameter(P, R);
      })
      .otherwise(v => {
        debug(v);
        throw Error("INVALID `L` ADDRESS");
      });
  }

  /**
   * Evaluate a G10 line to extract values
   */
  // evalG10(g10: G10Line) {
  //   const { L: group, P: register } = g10;

  //   // const macro = group.value + register.value;

  //   debug(group, register);
  // }

  /**
   * Get all tool offset values for a tool number
   */
  getToolOffsets(toolNum: number): ToolOffsetValues {
    return {
      length: this.getToolLength(toolNum),
      diameter: this.getToolDiameter(toolNum),
      lengthComp: this.getToolLengthComp(toolNum),
      diameterComp: this.getToolDiameterComp(toolNum)
    };
  }

  /**
   * Tool Length Offset Group (L11)
   */
  setToolLength(toolNum: number, value: number) {
    this._setToolOffsetValue(toolNum, OFFSET_GROUPS.TOOL.LENGTH, value);
  }

  /**
   * Get Tool Length value by tool number
   */
  getToolLength(toolNum: number) {
    return this._getToolOffsetValueByGroup(toolNum, OFFSET_GROUPS.TOOL.LENGTH);
  }

  /**
   * Tool Length Compensation Offset Group (L10)
   */
  setToolLengthComp(toolNum: number, value: number) {
    this._setToolOffsetValue(toolNum, OFFSET_GROUPS.TOOL.LENGTH_COMP, value);
  }

  /**
   * Get Tool Length Comp value by tool number
   */
  getToolLengthComp(toolNum: number) {
    return this._getToolOffsetValueByGroup(toolNum, OFFSET_GROUPS.TOOL.LENGTH_COMP);
  }

  /**
   * Tool Diameter Offset Group (L13)
   */
  setToolDiameter(toolNum: number, value: number) {
    this._setToolOffsetValue(toolNum, OFFSET_GROUPS.TOOL.DIAMETER, value);
  }

  /**
   * Get Tool diameter value by tool number
   */
  getToolDiameter(toolNum: number) {
    return this._getToolOffsetValueByGroup(toolNum, OFFSET_GROUPS.TOOL.DIAMETER);
  }

  /**
   * Tool Diameter Compensation. Offset Group (L12)
   */
  setToolDiameterComp(toolNum: number, value: number) {
    this._setToolOffsetValue(toolNum, OFFSET_GROUPS.TOOL.DIAMETER_COMP, value);
  }

  /**
   * Get Tool Diameter Comp value by tool number
   */
  getToolDiameterComp(toolNum: number) {
    return this._getToolOffsetValueByGroup(toolNum, OFFSET_GROUPS.TOOL.DIAMETER_COMP);
  }

  /**
   * Set axis values for a Work Offset Group (L2)
   *
   * G10 line sets:  `G10 G90 L2 P1 X0 Y0 Z0 B0`
   * Use in program: `G54 X0 Y0`
   */
  setCommonWorkOffset(offsetGroup: number, locations: Partial<AxisLocations>) {
    this._validateWorkOffset(offsetGroup);

    Object.entries(locations).forEach(([axis, value]) => {
      this.setWorkOffsetAxisValue(offsetGroup, axis, value);
    });
  }

  /**
   * Set axis values for a Work Offset Group (L2)
   *
   * G10 line sets:  `G10 G90 L2 P1 X0 Y0 Z0 B0`
   * Use in program: `G54 X0 Y0`
   */
  setAuxWorkOffset(P: number, locations: Partial<AxisLocations>) {
    throw new Error("Method not implemented.");

    Object.entries(locations).forEach(([axis, value]) => {
      this.setWorkOffsetAxisValue(offsetGroup, axis, value);
    });
  }

  /**
   * Set axis values for an Extended Work Offset Group (L20)
   *
   * The "P" address value will match between setting / using
   *
   * G10 line sets:  `G10 G90 L20 Pnnn X0 Y0 Z0 B0`
   * Use in program: `G54.1 Pnnn X0 Y0`
   */
  // setWorkExtendedOffset(extOffsetGroup: number, locations: Partial<AxisLocations>) {
  //   throw Error("NOT IMPLEMENTED YET");
  // }

  /**
   * Set the work offset axis value
   */
  setWorkOffsetAxisValue(offsetGroup: number, axis: string, value: number) {
    const target = this._composeWorkOffsetAxisRegister(offsetGroup, axis);

    this.write(target, value);
  }

  /**
   * Create an array of all the set macro variables
   */
  toArray() {
    const valueArr: [register: number, value: number][] = [];

    Object.entries(this._vars).forEach(([register, value]) => {
      if (!isNaN(value)) {
        valueArr.push([parseInt(register), value]);
      }
    });

    return valueArr;
  }

  private _getToolOffsetValueByGroup(toolNum: number, group: number) {
    const reg = this._composeToolOffsetRegister(group, toolNum);

    return this.read(reg);
  }

  private _getCommonWorkOffsetAxisLocations(commonOffset: number): AxisLocations {
    return ["X", "Y", "Z", "B"].reduce((locations, axis) => {
      const reg = this._composeWorkOffsetAxisRegister(commonOffset, axis);

      return {
        ...locations,
        [axis]: this.read(reg)
      };
    }, {} as AxisLocations);
  }

  /**
   * Set the group value for a tool by number
   */
  private _setToolOffsetValue(toolNum: number, offsetGroup: number, value: number) {
    debug("Setting tool offset value", { toolNum, offsetGroup, value });

    const reg = this._composeToolOffsetRegister(offsetGroup, toolNum);

    this.write(reg, value);
  }

  /**
   * Check the given tool number against validation rules
   */
  private _validateToolNumber(toolNum: number) {
    debug("Validating tool number", { toolNum });

    const maxToolNum = this._config.UPPER_TOOL_NUMBER_LIMIT;

    if (toolNum > maxToolNum) {
      throw Error(`(${toolNum}) exceeds configured maximum tool number (${maxToolNum}).`);
    } else if (toolNum <= 0) {
      throw Error(`${toolNum} is invalid, Tools must be positive.`);
    }
  }

  /**
   * Check the given offset number against validation rules
   */
  private _validateWorkOffset(workOffset: number) {
    debug("Validating offset number", { workOffset });

    if (workOffset >= 60) {
      throw Error(`(${workOffset}) exceeds configured maximum. (54 - 59)`);
    } else if (workOffset <= 52) {
      throw Error(`(${workOffset}) exceeds configured minimum. (54 - 59)`);
    }
  }

  /**
   * Compose a tool offset register number by group and tool num.
   */
  private _composeToolOffsetRegister(group: number, toolNum: number): number {
    this._validateToolNumber(toolNum);
    // eslint-disable-next-line prettier/prettier
    return (group * 1000) + toolNum;
  }

  /**
   * Compose a work offset axis register number by group and axis.
   *
   * The arguments `(54, "X")` will produce `5221`
   * The arguments `(56, "Z")` will produce `5263`
   */
  private _composeWorkOffsetAxisRegister(offset: number, axis: string): number {
    const WORK_OFFSET_MAP: Record<number, number> = {
      54: 22,
      55: 24,
      56: 26,
      57: 28,
      58: 30,
      59: 32
    } as const;

    const AXIS_MAP: Record<string, number> = {
      X: 1,
      Y: 2,
      Z: 3,
      B: 4
    } as const;

    // eslint-disable-next-line prettier/prettier
    return 5000 + (WORK_OFFSET_MAP[offset] * 10) + AXIS_MAP[axis];
  }
}
