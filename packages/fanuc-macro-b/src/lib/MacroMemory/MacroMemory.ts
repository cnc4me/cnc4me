import { pick } from "lodash";
import { __, match } from "ts-pattern";

import type {
  MacroValueArray,
  PossibleG10LineValues,
  ToolOffsetArray,
  ToolOffsetDict,
  UpdatedValue,
  WorkCoordinateArray,
  WorkCoordinateHash
} from "../../types";
import { range } from "../../utils";
// import { range } from "../../utils";
import { memory as debug } from "../debuggers";
import {
  composeAuxWorkOffsetAxisRegister,
  composeToolOffsetRegister,
  composeWorkOffsetAxisRegister
} from "./composer";
import { OFFSET_GROUPS } from "./constants";
import { parseG10 } from "./g10-tools";
import { GROUP_3 } from "./register-map";

const { WORK, TOOL } = OFFSET_GROUPS;

/**
 * Helper function to extract axis locations from an object of addresses
 */
function getPositions(locations: Partial<WorkCoordinateHash>) {
  return pick(locations, ["X", "Y", "Z", "B"]);
}

/**
 * A Representaion of a CNC machines' macro memory.
 */
export class MacroMemory {
  static REGISTERS: number[] = [
    ...range(1, 33),
    ...range(100, 199),
    ...range(500, 9999),
    ...range(3000, 4999),
    ...range(5000, 14000)
  ];

  private _vars: Record<number, number> = {};

  /**
   * Construct a new instance of the MacroMemory class and initialize the variables
   */
  constructor() {
    this.write(GROUP_3, 90);
    this.reset();
  }

  /**
   * Read a value from a register
   */
  read(register: number): number {
    const value = this._read(register);

    // debug(`[READ ] #${register}= ${value}`);

    return value;
  }

  /**
   * Read a range of values from a starting register
   */
  readBlocks(from: number, count: number): number[] {
    return range(from, from + count).map(i => this.read(i));
  }

  /**
   * Write  a value to a register
   */
  write(register: number, value: number): UpdatedValue {
    const prev = this._read(register);

    this._write(register, value);

    // debug(`[WRITE] #${register}= ${value}`);

    return {
      prev,
      curr: this._vars[register]
    };
  }

  /**
   * Clear a register value by writing `NaN`
   */
  clear(register: number): void {
    this._write(register, NaN);
  }

  /**
   * Clear all registers to reset the memory
   */
  reset(): void {
    MacroMemory.REGISTERS.forEach(idx => this.clear(idx));
  }

  /**
   * Evaluate a G10 line to extract values
   */
  g10(g10: PossibleG10LineValues) {
    // debug("[ G10 ]", g10);

    return match(g10)
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
      .run();
  }

  /**
   * Evaluate and read into memory offsets from a G10 line
   */
  evalG10(input: string) {
    const { error, result } = parseG10(input);

    if (result) {
      this.g10(result);
    } else {
      throw Error(error);
    }
  }

  /**
   * Get work coordinates as labeled axis locations for a common work offset
   * (G53, G54, G55, G56, G57, G58, G59)
   */
  getWorkCoordinateHash(gOffset: number): WorkCoordinateHash {
    if (gOffset < 53 || gOffset > 59) {
      throw Error(`${gOffset} is not a valid Work Coordinate Group`);
    }

    return this._getCommonWorkOffsetWorkCoordinateHash(gOffset);
  }

  /**
   * Get work coordinates for a common work offset (G53, G54, G55, G56, G57, G58, G59)
   */
  getWorkCoordinateArray(gOffset: number): WorkCoordinateArray {
    const { X, Y, Z, B } = this.getWorkCoordinateHash(gOffset);

    return [X, Y, Z, B];
  }

  /**
   * Get auxiliary work coordinates for a G54.1 `P` group
   */
  getAuxWorkCoordinateHash(pGroup: number): WorkCoordinateHash {
    if (pGroup < 1 || pGroup > 299) {
      throw Error(`${pGroup} is not a valid Aux Work Coordinate Group`);
    }

    return this._getAuxWorkOffsetWorkCoordinateHash(pGroup);
  }

  /**
   * Get auxiliary work coordinates for a G54.1 `P` group
   */
  getAuxWorkCoordinateArray(pGroup: number): WorkCoordinateArray {
    const { X, Y, Z, B } = this._getAuxWorkOffsetWorkCoordinateHash(pGroup);

    return [X, Y, Z, B];
  }

  /**
   * Get all tool offset values for a tool number
   */
  getToolOffsets(toolNum: number): ToolOffsetDict {
    return {
      length: this.getToolLength(toolNum),
      diameter: this.getToolDiameter(toolNum),
      lengthComp: this.getToolLengthComp(toolNum),
      diameterComp: this.getToolDiameterComp(toolNum)
    };
  }

  /**
   * Get all tool offset values as an array of values
   */
  getToolOffsetArray(toolNum: number): ToolOffsetArray {
    const { length, diameter, lengthComp, diameterComp } =
      this.getToolOffsets(toolNum);
    return [toolNum, length, diameter, lengthComp, diameterComp];
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
    return this._getToolOffsetValueByGroup(
      toolNum,
      OFFSET_GROUPS.TOOL.LENGTH_COMP
    );
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
    return this._getToolOffsetValueByGroup(
      toolNum,
      OFFSET_GROUPS.TOOL.DIAMETER
    );
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
    return this._getToolOffsetValueByGroup(
      toolNum,
      OFFSET_GROUPS.TOOL.DIAMETER_COMP
    );
  }

  /**
   * Set axis values for a Work Offset Group (L2)
   *
   * G10 line sets:  `G10 G90 L2 P1 X0 Y0 Z0 B0`
   * Use in program: `G54 X0 Y0`
   */
  setCommonWorkOffset(group: number, locations: Partial<WorkCoordinateHash>) {
    // debug("[O-SET]", `G${group + 53}=`, locations);

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
  setAuxWorkOffset(group: number, locations: Partial<WorkCoordinateHash>) {
    // debug("[O-SET]", `G54.1 P${group}=`, locations);

    Object.entries(locations).forEach(([axis, value]) => {
      const target = composeAuxWorkOffsetAxisRegister(group, axis);

      this.write(target, value);
    });
  }

  /**
   * Create an array of all the set macro variables
   */
  // get forEach() {
  //   return Object.entries(this._vars);
  // }

  /**
   * Create an array of all the set macro variables
   */
  toArray(opts?: { includeUnset: boolean }): MacroValueArray {
    const values: MacroValueArray = [];

    Object.entries(this._vars).forEach(([register, value]) => {
      const valueIsNotSet = value === null || isNaN(value);

      if (value || (valueIsNotSet && opts?.includeUnset)) {
        values.push([parseInt(register), value]);
      }
    });

    return values;
  }

  /**
   * Collect all the set registers into a POJO for further processing
   */
  toObject(
    opts?: Parameters<MacroMemory["toArray"]>[0]
  ): Record<number, number> {
    const valueMap: Record<string, number> = {};

    for (const [register, value] of this.toArray(opts)) {
      valueMap[register] = value;
    }

    return valueMap;
  }

  /**
   * Serialize all the set registers to a JSON string
   */
  serialize(): string {
    return JSON.stringify(this._vars);
  }

  private _write(register: number, value: number) {
    this._vars[register] = value;
  }

  private _read(register: number): number {
    return this._vars[register] ?? NaN;
  }

  /**
   * Set the group value for a tool by number
   */
  private _setToolOffsetValue(toolNum: number, group: number, value: number) {
    const reg = composeToolOffsetRegister(group, toolNum);

    this.write(reg, value);
  }

  /**
   * Get a tool offset value by number and group.
   */
  private _getToolOffsetValueByGroup(toolNum: number, group: number): number {
    const reg = composeToolOffsetRegister(group, toolNum);

    return this.read(reg);
  }

  /**
   * Get set axis locations for a given work offset
   */
  private _getCommonWorkOffsetWorkCoordinateHash(
    commonOffset: number
  ): WorkCoordinateHash {
    return ["X", "Y", "Z", "B"].reduce((locations, axis) => {
      const reg = composeWorkOffsetAxisRegister(commonOffset - 53, axis);

      return {
        ...locations,
        [axis]: this._vars[reg]
        // [axis]: this.read(reg)
      };
    }, {} as WorkCoordinateHash);
  }

  /**
   * Get set axis locations for a given work offset
   */
  private _getAuxWorkOffsetWorkCoordinateHash(
    pGroup: number
  ): WorkCoordinateHash {
    return ["X", "Y", "Z", "B"].reduce((locations, axis) => {
      const reg = composeAuxWorkOffsetAxisRegister(pGroup, axis);

      return {
        ...locations,
        [axis]: this._vars[reg]
        // [axis]: this.read(reg)
      };
    }, {} as WorkCoordinateHash);
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
}
