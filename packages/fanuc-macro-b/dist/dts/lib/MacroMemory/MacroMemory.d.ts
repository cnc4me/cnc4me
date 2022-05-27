import type { MacroValueArray, PossibleG10LineValues, ToolOffsetArray, ToolOffsetDict, UpdatedValue, WorkCoordinateArray, WorkCoordinateHash } from "../../types";
/**
 * A Representaion of a CNC machines' macro memory.
 */
export declare class MacroMemory {
    static REGISTERS: number[];
    private _vars;
    /**
     * Construct a new instance of the MacroMemory class and initialize the variables
     */
    constructor();
    /**
     * Read a value from a register
     */
    read(register: number): number;
    /**
     * Read a range of values from a starting register
     */
    readBlocks(from: number, count: number): number[];
    /**
     * Write  a value to a register
     */
    write(register: number, value: number): UpdatedValue;
    /**
     * Clear a register value by writing `NaN`
     */
    clear(register: number): void;
    /**
     * Clear all registers to reset the memory
     */
    reset(): void;
    /**
     * Evaluate a G10 line to extract values
     */
    g10(g10: PossibleG10LineValues): void;
    /**
     * Evaluate and read into memory offsets from a G10 line
     */
    evalG10(input: string): void;
    /**
     * Get work coordinates as labeled axis locations for a common work offset
     * (G53, G54, G55, G56, G57, G58, G59)
     */
    getWorkCoordinateHash(gOffset: number): WorkCoordinateHash;
    /**
     * Get work coordinates for a common work offset (G53, G54, G55, G56, G57, G58, G59)
     */
    getWorkCoordinateArray(gOffset: number): WorkCoordinateArray;
    /**
     * Get auxiliary work coordinates for a G54.1 `P` group
     */
    getAuxWorkCoordinateHash(pGroup: number): WorkCoordinateHash;
    /**
     * Get auxiliary work coordinates for a G54.1 `P` group
     */
    getAuxWorkCoordinateArray(pGroup: number): WorkCoordinateArray;
    /**
     * Get all tool offset values for a tool number
     */
    getToolOffsets(toolNum: number): ToolOffsetDict;
    /**
     * Get all tool offset values as an array of values
     */
    getToolOffsetArray(toolNum: number): ToolOffsetArray;
    /**
     * Tool Length Offset Group (L11)
     */
    setToolLength(toolNum: number, value: number): void;
    /**
     * Get Tool Length value by tool number
     */
    getToolLength(toolNum: number): number;
    /**
     * Tool Length Compensation Offset Group (L10)
     */
    setToolLengthComp(toolNum: number, value: number): void;
    /**
     * Get Tool Length Comp value by tool number
     */
    getToolLengthComp(toolNum: number): number;
    /**
     * Tool Diameter Offset Group (L13)
     */
    setToolDiameter(toolNum: number, value: number): void;
    /**
     * Get Tool diameter value by tool number
     */
    getToolDiameter(toolNum: number): number;
    /**
     * Tool Diameter Compensation. Offset Group (L12)
     */
    setToolDiameterComp(toolNum: number, value: number): void;
    /**
     * Get Tool Diameter Comp value by tool number
     */
    getToolDiameterComp(toolNum: number): number;
    /**
     * Set axis values for a Work Offset Group (L2)
     *
     * G10 line sets:  `G10 G90 L2 P1 X0 Y0 Z0 B0`
     * Use in program: `G54 X0 Y0`
     */
    setCommonWorkOffset(group: number, locations: Partial<WorkCoordinateHash>): void;
    /**
     * Set axis values for a Work Offset Group (L2)
     *
     * G10 line sets:  `G10 G90 L2 P1 X0 Y0 Z0 B0`
     * Use in program: `G54 X0 Y0`
     */
    setAuxWorkOffset(group: number, locations: Partial<WorkCoordinateHash>): void;
    /**
     * Create an array of all the set macro variables
     */
    /**
     * Create an array of all the set macro variables
     */
    toArray(opts?: {
        includeUnset: boolean;
    }): MacroValueArray;
    /**
     * Collect all the set registers into a POJO for further processing
     */
    toObject(opts?: Parameters<MacroMemory["toArray"]>[0]): Record<number, number>;
    /**
     * Serialize all the set registers to a JSON string
     */
    serialize(): string;
    private _write;
    private _read;
    /**
     * Set the group value for a tool by number
     */
    private _setToolOffsetValue;
    /**
     * Get a tool offset value by number and group.
     */
    private _getToolOffsetValueByGroup;
    /**
     * Get set axis locations for a given work offset
     */
    private _getCommonWorkOffsetWorkCoordinateHash;
    /**
     * Get set axis locations for a given work offset
     */
    private _getAuxWorkOffsetWorkCoordinateHash;
    /**
     * Increment the value of a register instead of writing the value.
     */
    private _increment;
}
