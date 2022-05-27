import type { InterpretedProgram, ParsedLineData, ProgramIdentifier, VariableRegister } from "../types";
import type { AdditionExpressionCstChildren, AddressedValueCstChildren, AtomicExpressionCstChildren, BracketExpressionCstChildren, ExpressionCstChildren, FunctionExpressionCstChildren, LineCstChildren, LinesCstChildren, MultiplicationExpressionCstChildren, NumericLiteralCstChildren, ProgramCstChildren, ProgramNumberLineCstChildren, ValueLiteralCstChildren, VariableAssignmentCstChildren, VariableLiteralCstChildren } from "../types/fanuc";
import { InsightCollection } from "./Insights";
import { MacroMemory } from "./MacroMemory";
import { NcAddress } from "./NcAddress";
declare const BaseVisitor: new (...args: any[]) => import("chevrotain").ICstVisitor<any, any>;
/**
 * Macro Interpreter
 */
export declare class MacroInterpreter extends BaseVisitor {
    private _mem;
    private _insights;
    get Memory(): MacroMemory;
    set Memory(mem: MacroMemory);
    get Insights(): InsightCollection;
    constructor(opts?: {
        memory: MacroMemory;
    });
    /**
     * Root Node for valid NC Programs
     */
    program(ctx: ProgramCstChildren): InterpretedProgram;
    /**
     * Itterate over the {@link LineCstChildren} to extract the contents
     */
    lines(ctx: LinesCstChildren): ParsedLineData[];
    /**
     * Get the Program title and number
     */
    ProgramNumberLine(ctx: ProgramNumberLineCstChildren): ProgramIdentifier;
    /**
     * Get the complete contents of a line of G code
     */
    Line(ctx: LineCstChildren): ParsedLineData;
    /**
     * Parse all possible info out of this address
     */
    AddressedValue(ctx: AddressedValueCstChildren, gCodeFlags?: Record<string, boolean>): NcAddress;
    /**
     * A plain number, signed
     */
    NumericLiteral(ctx: NumericLiteralCstChildren): number;
    /**
     * A Macro Variable, defined as a `#` and a number
     */
    VariableLiteral(ctx: VariableLiteralCstChildren): VariableRegister;
    /**
     * If a number, then the visit the node, otherwise evaluate the macro var
     */
    ValueLiteral(ctx: ValueLiteralCstChildren): number;
    /**
     * Update a macro variable regsiter with a value
     */
    variableAssignment(ctx: VariableAssignmentCstChildren): void;
    /**
     *
     */
    expression(ctx: ExpressionCstChildren): number;
    /**
     * Evaluate one of the built-in functions proivided by the system
     */
    functionExpression(ctx: FunctionExpressionCstChildren): number;
    additionExpression(ctx: AdditionExpressionCstChildren): number;
    multiplicationExpression(ctx: MultiplicationExpressionCstChildren): number;
    atomicExpression(ctx: AtomicExpressionCstChildren): number;
    /**
     * Ignore the brackets and return the children
     */
    bracketExpression(ctx: BracketExpressionCstChildren): number;
}
export {};
