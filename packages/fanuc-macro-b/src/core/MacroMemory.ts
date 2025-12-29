import Emittery from "emittery";
import { match, Pattern } from "ts-pattern";
import { MemoryConstants, RegisterMap } from "../memory";
import { range } from "../utils/common";
import { Debuggers } from "../utils/debug";
import type { SystemVariable } from "../memory";
import type {
  G10ToolOffsets,
  G10WorkOffsets,
  MacroValueArray,
  ToolOffsetArray,
  ToolOffsetDict,
  WorkCoordinateArray,
  WorkCoordinateRecord,
} from "../types";

const { WORK, TOOL } = MemoryConstants.OFFSET_GROUPS;

export type MacroMemoryEvents = {
  REGISTER_UPDATE: Record<"previous" | "current" | "register", number>;
};

/**
 * A Representaion of a CNC machines' macro memory.
 */
export class MacroMemory {
  static ZERO = 0;
  static REGISTERS = [
    ...range(1, 33),
    ...range(100, 199),
    ...range(500, 9999),
    ...range(3000, 4999),
    ...range(5000, 14000),
  ];

  #vars: VariableDictionary = {};
  #events = new Emittery<MacroMemoryEvents>();
  #debug = Debuggers.Memory;

  /**
   * Construct a new instance of the MacroMemory class and initialize the variables
   */
  constructor() {
    this.#debug("initializing");
    // @TODO have a way to initialize code groups
    // this.write(M.GROUP_3, 90);
  }

  on = this.#events.on.bind(this.#events);

  /**
   * Clear all registers to reset the memory
   */
  reset(): void {
    for (const register of MacroMemory.REGISTERS) {
      this.clear(register);
    }
  }

  /**
   * Read a value from a register
   */
  read(register: number | SystemVariable): number {
    const value = this.#read(register);
    // debug(`[READ ] #${register}= ${value}`);
    return value;
  }

  /**
   * Write  a value to a register
   */
  write(
    register: number | SystemVariable,
    value: number,
  ): Omit<MacroMemoryEvents["REGISTER_UPDATE"], "register"> {
    const previous = this.#read(register);

    this.#write(register, value);

    const current = this.#vars[register];

    void this.#events.emit("REGISTER_UPDATE", { previous, current, register });

    return { previous, current };
  }

  /**
   * Clear a register value by writing {@link MacroMemory.ZERO}
   */
  clear(register: number | SystemVariable): void {
    this.#write(register, MacroMemory.ZERO);
  }

  /**
   * Evaluate a G10 line to apply values
   */
  g10(g10: G10ToolOffsets | G10WorkOffsets) {
    // debug("[ G10 ]", g10);

    return match(g10)
      .with({ L: WORK.COMMON }, ({ P, ...rest }) => {
        this.setCommonWorkOffset(P, rest);
      })
      .with({ L: WORK.AUX }, ({ P, ...rest }) => {
        this.setAuxWorkOffset(P, rest);
      })
      .with({ L: TOOL.LENGTH_COMP, R: Pattern.number }, ({ P, R }) => {
        this.setToolLengthComp(P, R);
      })
      .with({ L: TOOL.LENGTH, R: Pattern.number }, ({ P, R }) => {
        this.setToolLength(P, R);
      })
      .with({ L: TOOL.DIAMETER_COMP, R: Pattern.number }, ({ P, R }) => {
        this.setToolDiameterComp(P, R);
      })
      .with({ L: TOOL.DIAMETER, R: Pattern.number }, ({ P, R }) => {
        this.setToolDiameter(P, R);
      })
      .run();
  }

  /**
   * Get work coordinates as labeled axis locations for a common work offset
   * (G53, G54, G55, G56, G57, G58, G59)
   */
  getWorkCoordinateRecord(gOffset: number): WorkCoordinateRecord {
    if (gOffset < 53 || gOffset > 59) {
      throw Error(`${gOffset} is not a valid Work Coordinate Group`);
    }

    return this.#getCommonWorkOffsetWorkCoordinateRecord(gOffset);
  }

  /**
   * Get work coordinates for a common work offset (G53, G54, G55, G56, G57, G58, G59)
   */
  getWorkCoordinateArray(gOffset: number): WorkCoordinateArray {
    const { X, Y, Z, B } = this.getWorkCoordinateRecord(gOffset);

    return [X, Y, Z, B];
  }

  /**
   * Get auxiliary work coordinates for a G54.1 `P` group
   */
  getAuxWorkCoordinateRecord(pGroup: number): WorkCoordinateRecord {
    if (pGroup < 1 || pGroup > 299) {
      throw Error(`${pGroup} is not a valid Aux Work Coordinate Group`);
    }

    return this.#getAuxWorkOffsetWorkCoordinateRecord(pGroup);
  }

  /**
   * Get auxiliary work coordinates for a G54.1 `P` group
   */
  getAuxWorkCoordinateArray(pGroup: number): WorkCoordinateArray {
    const { X, Y, Z, B } = this.#getAuxWorkOffsetWorkCoordinateRecord(pGroup);

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
      diameterComp: this.getToolDiameterComp(toolNum),
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
    this.#setToolOffsetValue(toolNum, TOOL.LENGTH, value);
  }

  /**
   * Get Tool Length value by tool number
   */
  getToolLength(toolNum: number) {
    return this.#getToolOffsetValueByGroup(toolNum, TOOL.LENGTH);
  }

  /**
   * Tool Length Compensation Offset Group (L10)
   */
  setToolLengthComp(toolNum: number, value: number) {
    this.#setToolOffsetValue(toolNum, TOOL.LENGTH_COMP, value);
  }

  /**
   * Get Tool Length Comp value by tool number
   */
  getToolLengthComp(toolNum: number) {
    return this.#getToolOffsetValueByGroup(toolNum, TOOL.LENGTH_COMP);
  }

  /**
   * Tool Diameter Offset Group (L13)
   */
  setToolDiameter(toolNum: number, value: number) {
    this.#setToolOffsetValue(toolNum, TOOL.DIAMETER, value);
  }

  /**
   * Get Tool diameter value by tool number
   */
  getToolDiameter(toolNum: number) {
    return this.#getToolOffsetValueByGroup(toolNum, TOOL.DIAMETER);
  }

  /**
   * Tool Diameter Compensation. Offset Group (L12)
   */
  setToolDiameterComp(toolNum: number, value: number) {
    this.#setToolOffsetValue(toolNum, TOOL.DIAMETER_COMP, value);
  }

  /**
   * Get Tool Diameter Comp value by tool number
   */
  getToolDiameterComp(toolNum: number) {
    return this.#getToolOffsetValueByGroup(toolNum, TOOL.DIAMETER_COMP);
  }

  /**
   * Set axis values for a Work Offset Group (L2)
   *
   * G10 line sets:  `G10 G90 L2 P1 X0 Y0 Z0 B0`
   * Use in program: `G54 X0 Y0`
   */
  setCommonWorkOffset(group: number, locations: Partial<WorkCoordinateRecord>) {
    // debug("[O-SET]", `G${group + 53}=`, locations);

    Object.entries(locations).forEach(([axis, value]) => {
      const target = RegisterMap.WorkOffset(group, axis);

      this.write(target, value);
    });
  }

  /**
   * Set axis values for a Work Offset Group (L2)
   *
   * G10 line sets:  `G10 G90 L2 P1 X0 Y0 Z0 B0`
   * Use in program: `G54 X0 Y0`
   */
  setAuxWorkOffset(group: number, locations: Partial<WorkCoordinateRecord>) {
    // debug("[O-SET]", `G54.1 P${group}=`, locations);

    Object.entries(locations).forEach(([axis, value]) => {
      const target = RegisterMap.AuxWorkOffset(group, axis);

      this.write(target, value);
    });
  }

  /**
   * Create an array of all the set macro variables
   */
  toArray(opts?: CastingOptions): MacroValueArray {
    const values: MacroValueArray = [];

    Object.entries(this.#vars).forEach(([register, value]) => {
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
  toObject(opts?: CastingOptions): Record<number, number> {
    return Object.fromEntries(this.toArray(opts));
  }

  /**
   * Serialize all the MacroMemory into a JSON string
   */
  toJSON(): string {
    return JSON.stringify(this.#vars);
  }

  /**
   * Write a new value to a register
   */
  #write(register: number, value: number) {
    this.#vars[register] = value;
  }

  /**
   * If a register is not set then it returns `0`
   */
  #read(register: number): number {
    return this.#vars[register] ?? MacroMemory.ZERO;
  }

  /**
   * Set the group value for a tool by number
   */
  #setToolOffsetValue(toolNum: number, group: number, value: number) {
    const reg = RegisterMap.ToolOffset(group, toolNum);

    this.write(reg, value);
  }

  /**
   * Get a tool offset value by number and group.
   */
  #getToolOffsetValueByGroup(toolNum: number, group: number): number {
    const reg = RegisterMap.ToolOffset(group, toolNum);

    return this.read(reg);
  }

  /**
   * Get set axis locations for a given work offset
   */
  #getCommonWorkOffsetWorkCoordinateRecord(
    commonOffset: number,
  ): WorkCoordinateRecord {
    return ["X", "Y", "Z", "B"].reduce((locations, axis) => {
      const reg = RegisterMap.WorkOffset(commonOffset - 53, axis);

      return {
        ...locations,
        [axis]: this.#vars[reg],
        // [axis]: this.read(reg)
      };
    }, {} as WorkCoordinateRecord);
  }

  /**
   * Get set axis locations for a given work offset
   */
  #getAuxWorkOffsetWorkCoordinateRecord(pGroup: number): WorkCoordinateRecord {
    return ["X", "Y", "Z", "B"].reduce((locations, axis) => {
      const reg = RegisterMap.AuxWorkOffset(pGroup, axis);

      return {
        ...locations,
        [axis]: this.#vars[reg],
        // [axis]: this.read(reg)
      };
    }, {} as WorkCoordinateRecord);
  }
}

type VariableDictionary = Record<number, number>;
type CastingOptions = { includeUnset: boolean };
