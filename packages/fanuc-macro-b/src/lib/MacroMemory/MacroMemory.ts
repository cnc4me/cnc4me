import Debug from "debug";
import { pick } from "lodash";
import { __, match } from "ts-pattern";

import { MEMORY } from "../../PackageConfig";
import type {
  AxisLocations,
  PossibleG10LineValues,
  ToolOffsetValues,
  UpdatedValue
} from "../../types";
import { range } from "../../utils";
import {
  composeAuxWorkOffsetAxisRegister,
  composeToolOffsetRegister,
  composeWorkOffsetAxisRegister
} from "./composer";
import { G10Line } from "./G10Line";
import { GROUP_3, OFFSET_GROUPS } from "./MemoryMap";

const { WORK, TOOL } = OFFSET_GROUPS;

const getPositions = (partialG10: Partial<AxisLocations>) => pick(partialG10, ["X", "Y", "Z", "B"]);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const debug = Debug("macro:memory");

// debug.enabled = true;

/**
 * A Representaion of a CNC machines' macro memory.
 */
export class MacroMemory {
  private _config = MEMORY;
  private _vars: Record<number, number> = {};

  /**
   * Construct a new instance of the MacroMemory class and initialize the variables
   */
  constructor(mode?: number) {
    this.write(GROUP_3, mode ?? 90);

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
   * Clear a register value by writing `NaN`
   */
  clear(register: number | string): void {
    this._vars[typeof register === "string" ? parseInt(register) : register] = NaN;
  }

  /**
   * Clear all registers and reset the memory
   */
  reset(): void {
    Object.keys(this._vars).forEach(register => this.clear(register));
  }

  /**
   * Evaluate and read into memory offsets from a G10 line
   */
  evalG10(input: string) {
    const { error, result } = G10Line.parse(input);

    if (result) {
      this.g10(result);
    } else {
      throw Error(error);
    }
  }

  /**
   * Evaluate a G10 line to extract values
   */
  g10(g10: PossibleG10LineValues) {
    debug("Evaluating G10 line", g10);

    return match<PossibleG10LineValues>(g10)
      .with({ L: WORK.COMMON }, ({ P, ...rest }) => {
        this.setCommonWorkOffset(P, getPositions(rest));
      })
      .with({ L: WORK.AUX }, ({ P, ...rest }) => {
        this.setAuxWorkOffset(P, getPositions(rest));
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
   * Get locations from a `G54.1 Pnnn` work offset
   */
  G54_1(group: number): AxisLocations {
    const axisReg = (axis: string) => composeAuxWorkOffsetAxisRegister(group, axis);

    return {
      X: this.read(axisReg("X")),
      Y: this.read(axisReg("Y")),
      Z: this.read(axisReg("Z")),
      B: this.read(axisReg("B"))
    };
  }

  /**
   * Create an array of all the set macro variables
   */
  toArray(): [register: number, value: number][] {
    const valueArr: [register: number, value: number][] = [];

    Object.entries(this._vars).forEach(([register, value]) => {
      if (!isNaN(value)) {
        valueArr.push([parseInt(register), value]);
      }
    });

    return valueArr;
  }

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
  setCommonWorkOffset(group: number, locations: Partial<AxisLocations>) {
    Object.entries(locations).forEach(([axis, value]) => {
      const target = composeWorkOffsetAxisRegister(group, axis);

      this.write(target, value);
    });
  }

  /**
   * Set axis values for a Work Offset Group (L2)
   *
   * G10 line sets:  `G10 G90 L2 P1 X0 Y0 Z0 B0`
   * Use in program: `G54 X0 Y0`
   */
  setAuxWorkOffset(group: number, locations: Partial<AxisLocations>) {
    Object.entries(locations).forEach(([axis, value]) => {
      const target = composeAuxWorkOffsetAxisRegister(group, axis);

      this.write(target, value);
    });
  }

  get G53(): AxisLocations {
    return this._getCommonWorkOffsetAxisLocations(53);
  }

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

  /**
   * Set the group value for a tool by number
   */
  private _setToolOffsetValue(toolNum: number, offsetGroup: number, value: number) {
    const reg = composeToolOffsetRegister(offsetGroup, toolNum);

    debug("Setting tool offset value", { toolNum, offsetGroup, value });

    this.write(reg, value);
  }

  /**
   * Get a tool offset value by number and group.
   */
  private _getToolOffsetValueByGroup(toolNum: number, group: number): number {
    const reg = composeToolOffsetRegister(group, toolNum);

    debug("Fetching tool offset value", { toolNum, group });

    return this.read(reg);
  }

  /**
   * Get set axis locations for a given work offset
   */
  private _getCommonWorkOffsetAxisLocations(commonOffset: number): AxisLocations {
    return ["X", "Y", "Z", "B"].reduce((locations, axis) => {
      const reg = composeWorkOffsetAxisRegister(commonOffset, axis);

      return {
        ...locations,
        [axis]: this.read(reg)
      };
    }, {} as AxisLocations);
  }

  /**
   * Increment the value of a register instead of writing the value.
   */
  private _increment(key: number, increment: number): UpdatedValue {
    const prev = this._vars[key];

    this._vars[key] = prev + increment;

    return {
      prev,
      curr: this._vars[key]
    };
  }

  /**
   * Check the given tool number against validation rules
   */
  // private _validateToolNumber(toolNum: number) {
  //   debug("Validating tool number", { toolNum });

  //   const maxToolNum = this._config.UPPER_TOOL_NUMBER_LIMIT;

  //   if (toolNum > maxToolNum) {
  //     throw Error(`(${toolNum}) exceeds configured maximum tool number (${maxToolNum}).`);
  //   } else if (toolNum <= 0) {
  //     throw Error(`${toolNum} is invalid, Tools must be positive.`);
  //   }
  // }

  /**
   * Check the given offset number against validation rules
   */
  // private _validateWorkOffset(workOffset: number) {
  //   debug("Validating offset number", { workOffset });

  //   if (workOffset >= 60) {
  //     throw Error(`(${workOffset}) exceeds configured maximum. (54 - 59)`);
  //   } else if (workOffset <= 52) {
  //     throw Error(`(${workOffset}) exceeds configured minimum. (54 - 59)`);
  //   }
  // }
}
