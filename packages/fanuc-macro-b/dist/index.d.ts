import { Callback } from 'typescript-fsm';
import { ConsumeMethodOpts } from 'chevrotain';
import { CstNode } from 'chevrotain';
import { CstParser } from 'chevrotain';
import { ICstVisitor } from 'chevrotain';
import { ILexerDefinitionError } from 'chevrotain';
import { ILexingError } from 'chevrotain';
import { ILexingResult } from 'chevrotain';
import { IRecognitionException } from 'chevrotain';
import { IToken } from 'chevrotain';
import { ITransition } from 'typescript-fsm';
import { OmnipresentEventData } from 'emittery';
import { ParserMethod } from 'chevrotain';
import { StateMachine } from 'typescript-fsm';
import { TokenType } from 'chevrotain';
import { UnsubscribeFunction } from 'emittery';

declare type ActualCallback = NonNullable<Callback>;

declare type AdditionExpressionCstChildren = {
    lhs: MultiplicationExpressionCstNode[];
    AdditionOperator?: IToken[];
    rhs?: MultiplicationExpressionCstNode[];
};

declare interface AdditionExpressionCstNode extends CstNode {
    name: "AdditionExpression";
    children: AdditionExpressionCstChildren;
}

declare const AdditionOperator: Omit<TokenType, "name"> & {
    name: string;
};

declare const Address: Omit<TokenType, "name"> & {
    name: "Address";
};

declare class AddressedValue {
    value: number;
    private _address;
    private _isNegative;
    static create(ctx: AddressedValueCstChildren): AddressedValue;
    static valueOf(input: string): number;
    constructor(ctx: AddressedValueCstChildren);
    get prefix(): string;
    get image(): string;
}

declare type AddressedValueCstChildren = {
    Address: IToken[];
    Minus?: IToken[];
    NumericValue?: IToken[];
    BracketExpression?: BracketExpressionCstNode[];
    VariableLiteral?: VariableLiteralCstNode[];
};

declare interface AddressedValueCstNode extends CstNode {
    name: "AddressedValue";
    children: AddressedValueCstChildren;
}

declare class AddressInsight implements IBaseInsight {
    ctx: string;
    value: number;
    /**
     * This the address to collect insights on, such as `X`, `Y`, `G10`, or `M6`
     */
    constructor(address: AddressedValue);
}

declare const And: Omit<TokenType, "name"> & {
    name: "And";
};

declare type AtomicBooleanExpressionCstChildren = {
    OpenBracket: IToken[];
    BooleanExpression: BooleanExpressionCstNode[];
    CloseBracket: IToken[];
};

declare interface AtomicBooleanExpressionCstNode extends CstNode {
    name: "AtomicBooleanExpression";
    children: AtomicBooleanExpressionCstChildren;
}

declare type AtomicExpressionCstChildren = {
    FunctionExpression?: FunctionExpressionCstNode[];
    BracketExpression?: BracketExpressionCstNode[];
    NumericLiteral?: NumericLiteralCstNode[];
    VariableLiteral?: VariableLiteralCstNode[];
};

declare interface AtomicExpressionCstNode extends CstNode {
    name: "AtomicExpression";
    children: AtomicExpressionCstChildren;
}

export declare class AxisFSM extends StateMachine<States, Events, ICallbacks> {
    #private;
    constructor(label: AxisLabel, config: AxisFsmConfig);
    get limits(): AxisLimits;
    get position(): number;
    setLimits(limits: AxisLimitsInput): void;
    on: <Name extends keyof OmnipresentEventData | keyof AxisFsmEvents>(eventName: Name | readonly Name[], listener: (eventData: (AxisFsmEvents & OmnipresentEventData)[Name]) => void | Promise<void>) => UnsubscribeFunction;
    onAny: (listener: (eventName: keyof AxisFsmEvents, eventData: string | number | (Record<"to" | "from", number> & {
        type: MotionType;
    }) | undefined) => void | Promise<void>) => UnsubscribeFunction;
    /**
     * Generic state testing method
     */
    is(state: keyof typeof States): boolean;
    isValidPosition(position: number): boolean;
    reset(): Promise<void>;
    moveTo(position: number, command?: MotionType): Promise<void>;
    /**
     * Rapid Move
     */
    G0(position: number): Promise<void>;
    /**
     * Feed Move
     */
    G1(position: number): Promise<void>;
    setConfig(opts: Partial<AxisFsmConfig>): void;
}

declare interface AxisFsmConfig {
    limits: AxisLimitsInput;
    travelTimeout?: number;
    throwOnFault?: boolean;
}

declare type AxisFsmEvents = {
    FAULT: string;
    RESET: undefined;
    MOTION_COMPLETE: number;
    TRAVELING: Record<"to" | "from", number> & {
        type: MotionType;
    };
};

declare type AxisLabel = "X" | "Y" | "Z";

declare type AxisLimits = Record<"min" | "max", number>;

declare type AxisLimitsInput = number | [negative: number, positive: number] | AxisLimits;

declare const BaseCstVisitor: new (...args: any[]) => ICstVisitor<any, any>;

declare type BooleanExpressionCstChildren = {
    AtomicExpression: (AtomicExpressionCstNode)[];
    BooleanOperator: IToken[];
};

declare interface BooleanExpressionCstNode extends CstNode {
    name: "BooleanExpression";
    children: BooleanExpressionCstChildren;
}

declare const BooleanOperator: Omit<TokenType, "name"> & {
    name: string;
};

declare type BracketExpressionCstChildren = {
    OpenBracket: IToken[];
    Expression: ExpressionCstNode[];
    CloseBracket: IToken[];
};

declare interface BracketExpressionCstNode extends CstNode {
    name: "BracketExpression";
    children: BracketExpressionCstChildren;
}

declare const BuiltinFunction: Omit<TokenType, "name"> & {
    name: "BuiltinFunction";
};

declare type CallbackName<T extends string> = `on${Capitalize<T>}`;

declare type CastingOptions = {
    includeUnset: boolean;
};

declare const CloseBracket: Omit<TokenType, "name"> & {
    name: "CloseBracket";
};

declare const CloseParen: Omit<TokenType, "name"> & {
    name: "CloseParen";
};

export declare class CncMachine {
    #private;
    static EVENTS: Omit<AxisFsmEvents, "MOTION_COMPLETE"> & {
        MOTION_COMPLETE: Position;
    };
    axes: {
        X: AxisFSM;
        Y: AxisFSM;
        Z: AxisFSM;
    };
    spindle: SpindleFSM;
    activeMotionType: MotionType;
    constructor(config?: Partial<{
        home: Partial<Record<AxisLabel, number>>;
        limits: Partial<Record<AxisLabel, AxisLimitsInput>>;
        throwOnFault: boolean;
        axisTravelTimeout: number;
        spindle: ConstructorParameters<typeof SpindleFSM>[0];
    }>);
    on: <Name extends keyof OmnipresentEventData | "FAULT" | "RESET" | "MOTION_COMPLETE" | "TRAVELING">(eventName: Name | readonly Name[], listener: (eventData: (Omit<AxisFsmEvents, "MOTION_COMPLETE"> & {
        MOTION_COMPLETE: Position;
    } & OmnipresentEventData)[Name]) => void | Promise<void>) => UnsubscribeFunction;
    onAny: (listener: (eventName: "FAULT" | "RESET" | "MOTION_COMPLETE" | "TRAVELING", eventData: string | Partial<Record<"X" | "Y" | "Z", number>> | (Record<"to" | "from", number> & {
        type: MotionType;
    }) | undefined) => void | Promise<void>) => UnsubscribeFunction;
    /** Spindle Forward */
    M3: (rpm: number) => Promise<void>;
    /** Spindle Reverse  */
    M4: (rpm: number) => Promise<void>;
    /** Spindle Stop */
    M5: () => Promise<void>;
    /** Rapid Move */
    G0: (position: Position) => Promise<void>;
    /** Feed Move */
    G1: (position: Position) => Promise<void>;
    /** Travel to a new position with the active motion type */
    travel: (position: Position) => Promise<void>;
    getPosition(): Position;
    getStats(): {
        positions: Partial<Record<"X" | "Y" | "Z", number>>;
        spindle: {
            currentRPM: number;
            directon: string;
        };
    };
    setHome(axis: keyof typeof CncMachine.axes, location: number | ((limits: AxisLimits) => number)): void;
    reset(): Promise<[void, void, void]>;
    /**
     * Handle lines from the interpreter to simulate the machine
     *
     * @TODO: I don't think this is the right way to have the G0/G1 be "modal" but it works?
     */
    queueLine(line: IParsedLineData): void;
}

declare type _CncMachineEvents = PrefixObjectKeys<"MACHINE", typeof CncMachine.EVENTS>;

/**
 * Comments as a whole token
 */
declare const Comment: Omit<TokenType, "name"> & {
    name: "Comment";
};

declare type ConditionalExpressionCstChildren = {
    If: IToken[];
    AtomicBooleanExpression: AtomicBooleanExpressionCstNode[];
    Then?: IToken[];
    GotoLine?: IToken[];
};

declare interface ConditionalExpressionCstNode extends CstNode {
    name: "ConditionalExpression";
    children: ConditionalExpressionCstChildren;
}

/**
 * @todo use envvars?
 */
export declare const CONFIG: {
    MEMORY: {
        readonly UPPER_TOOL_NUMBER_LIMIT: 299;
    };
    INTERPRETER: {
        readonly USE_CONSTRUCTOR_WITH_DEFAULTS: true;
    };
};

declare const ControlFlowKeyword: Omit<TokenType, "name"> & {
    name: string;
};

declare namespace CST {
    export {
        ProgramsCstNode,
        ProgramsCstChildren,
        ProgramCstNode,
        ProgramCstChildren,
        LinesCstNode,
        LinesCstChildren,
        LineCstNode,
        LineCstChildren,
        VariableAssignmentCstNode,
        VariableAssignmentCstChildren,
        ConditionalExpressionCstNode,
        ConditionalExpressionCstChildren,
        AtomicBooleanExpressionCstNode,
        AtomicBooleanExpressionCstChildren,
        BooleanExpressionCstNode,
        BooleanExpressionCstChildren,
        AdditionExpressionCstNode,
        AdditionExpressionCstChildren,
        MultiplicationExpressionCstNode,
        MultiplicationExpressionCstChildren,
        FunctionExpressionCstNode,
        FunctionExpressionCstChildren,
        BracketExpressionCstNode,
        BracketExpressionCstChildren,
        AtomicExpressionCstNode,
        AtomicExpressionCstChildren,
        ExpressionCstNode,
        ExpressionCstChildren,
        AddressedValueCstNode,
        AddressedValueCstChildren,
        NumericLiteralCstNode,
        NumericLiteralCstChildren,
        VariableLiteralCstNode,
        VariableLiteralCstChildren,
        ValueLiteralCstNode,
        ValueLiteralCstChildren,
        StartOfFileCstNode,
        StartOfFileCstChildren,
        ProgramNumberLineCstNode,
        ProgramNumberLineCstChildren,
        EndOfFileCstNode,
        EndOfFileCstChildren,
        ICstNodeVisitor
    }
}
export { CST }

declare const Decimal: Omit<TokenType, "name"> & {
    name: "Decimal";
};

export declare type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

declare const Divide: Omit<TokenType, "name"> & {
    name: "Divide";
};

declare const Do: Omit<TokenType, "name"> & {
    name: "Do";
};

declare const Dot: Omit<TokenType, "name"> & {
    name: "Dot";
};

declare type EndOfFileCstChildren = {
    Percent: IToken[];
    Newline?: IToken[];
};

declare interface EndOfFileCstNode extends CstNode {
    name: "EndOfFile";
    children: EndOfFileCstChildren;
}

declare const Equals: Omit<TokenType, "name"> & {
    name: "Equals";
};

declare const EqualTo: Omit<TokenType, "name"> & {
    name: "EqualTo";
};

export declare type ErrorHandler<E, R> = (err: E, result: R) => void;

export declare interface ErrorProducer<E> {
    hasErrors: boolean;
    getErrors(): E[];
}

export declare const Errors: {
    MacroRuntimeError: typeof RuntimeErrors.MacroRuntimeError;
    NoActiveProgram: typeof RuntimeErrors.NoActiveProgram;
    ProgramNumberNotFound: typeof RuntimeErrors.ProgramNumberNotFound;
    InvalidProgramNumber: typeof RuntimeErrors.InvalidProgramNumber;
    MacroParserError: typeof ParserErrors.MacroParserError;
    ParsingError: typeof ParserErrors.ParsingError;
    MacroLexerError: typeof LexerErrors.MacroLexerError;
    LexingError: typeof LexerErrors.LexingError;
    InputUndefined: typeof LexerErrors.InputUndefined;
    InvalidInput: typeof LexerErrors.InvalidInput;
};

declare type EvalResult = {
    error: Error[] | null;
    result: IParsedLineData[];
};

declare type EventHandlers = {
    onReachedTargetRPM(): void;
};

declare enum Events {
    Move = "Move",
    Reset = "Reset",
    MoveComplete = "MoveComplete",
    FaultOccurred = "FaultOccurred"
}

declare enum Events_2 {
    Stop = "Stop",
    Forward = "Forward",
    Reverse = "Reverse",
    FaultOccurred = "FaultOccurred",
    ReachedTargetRPM = "ReachedTargetRPM"
}

declare enum Events_3 {
    start = "start",
    stop = "stop",
    pause = "pause",
    resume = "resume",
    reset = "reset",
    finish = "finish",
    error = "error"
}

declare type ExpressionCstChildren = {
    AdditionExpression: AdditionExpressionCstNode[];
};

declare interface ExpressionCstNode extends CstNode {
    name: "Expression";
    children: ExpressionCstChildren;
}

declare const FANUC_MACRO_B_FNS: readonly ["ABS", "ACOS", "ASIN", "ATAN", "BCD", "BIN", "COS", "EXP", "FIX", "FUP", "LN", "ROUND", "SIN", "SQRT", "TAN"];

/**
 * The order of tokens is important because token
 * matches are applied sequentially
 */
export declare const FANUC_MACRO_B_GRAMMAR: (Omit<TokenType, "name"> & {
    name: string;
})[];

export declare class FanucMacroB implements ErrorProducer<MacroLexerError | MacroParserError> {
    #private;
    lexer: MacroLexer;
    parser: MacroParser;
    interpreter: MacroInterpreter;
    options: {
        debug: boolean;
    };
    /**
     * @TODO fix this flag here, move it global?
     */
    constructor(options?: Partial<{
        debug: boolean;
    }>);
    get memory(): MacroMemory;
    /**
     * If either the {@link MacroLexer} or {@link MacroParser} encountered errors
     * then this property will be `true`
     */
    get hasErrors(): boolean;
    /**
     * Clear internal token list, reset the Lexer and Parser, and clear the Interpreter memory
     */
    reset(): void;
    /**
     * Retrieve the internal token list
     */
    getTokens(): IToken[];
    getErrors(): (LexingError | ParsingError)[];
    /**
     * Returns an object where the keys are variable register numbers
     * and the value is it's currently set value.
     */
    getSetMemoryRegisters(opts?: Partial<GetMemoryOptions>): Record<number, number>;
    /**
     * Invoke the {@link MacroInterpreter} starting from `lines()`
     */
    eval(input: string): EvalResult;
    /**
     * Run {@link extractOffsets} on the results from #eval()
     */
    evalG10(input: string): {
        error: Error[] | null;
        result: PossibleG10LineValues;
    };
    /**
     * Invoke the {@link MacroInterpreter} starting from `expression()`
     */
    evalExpr(input: string): {
        error: null;
        result: number;
    };
    /**
     * Invoke the {@link MacroInterpreter} starting from `expression()`
     */
    evalFunctionExpr(input: string): {
        error: null;
        result: number;
    };
    /**
     * Invoke the {@link MacroInterpreter} starting from `program()`
     */
    evalProgram(input: string): {
        error: null;
        result: NcProgram;
    };
    tokenizeAndLoadParser(input: string): void;
}

declare const Fences: Omit<TokenType, "name"> & {
    name: string;
};

declare type FsmCallback<T = unknown> = ((arg: T) => Promise<void>) | ((arg: T) => void) | ((...args: T[]) => Promise<void>) | ((...args: T[]) => void) | undefined;

declare type FunctionExpressionCstChildren = {
    FunctionName: IToken[];
    BracketExpression: BracketExpressionCstNode[];
};

declare interface FunctionExpressionCstNode extends CstNode {
    name: "FunctionExpression";
    children: FunctionExpressionCstChildren;
}

declare interface G10LineBase {
    L: number;
    P: number;
}

export declare interface G10ParseResult {
    error: MacroCombinedError[];
    result: PossibleG10LineValues;
}

export declare interface G10ToolOffsets extends G10LineBase {
    L: ValidG10ToolOffsetGroup;
    R?: number;
}

export declare interface G10WorkOffsets extends G10LineBase {
    L: ValidG10WorkOffsetGroup;
    X?: number;
    Y?: number;
    Z?: number;
    B?: number;
}

declare const Gcode: Omit<TokenType, "name"> & {
    name: "G_Code";
};

/**
 * Compose an aux work offset axis register number by coordinate group and axis.
 *
 * - The arguments `(1, "X")` will produce `7001`
 * - The arguments `(2, "Y")` will produce `7022`
 * - The arguments `(3, "Z")` will produce `7043`
 * - The arguments `(4, "B")` will produce `7064`
 * - The arguments `(48, "X")` will produce `7941`
 */
declare function getAuxWorkOffsetAxisRegister(group: number, axis: string): number;

declare type GetMemoryOptions = {
    range: [start: number, end: number];
};

/**
 * Compose a tool offset register number by group and tool num.
 */
declare function getToolOffsetRegister(group: number, toolNum: number): number;

/**
 * Compose a work offset axis register number by group and axis.
 *
 * - The arguments `(1, "X")` will produce `5221`
 * - The arguments `(2, "Y")` will produce `5242`
 * - The arguments `(3, "Z")` will produce `5263`
 * - The arguments `(4, "B")` will produce `5284`
 */
declare function getWorkOffsetAxisRegister(group: number, axis: string): number;

declare const GotoLine: Omit<TokenType, "name"> & {
    name: "GotoLine";
};

declare const GreaterThan: Omit<TokenType, "name"> & {
    name: "GreaterThan";
};

declare const GreaterThanOrEq: Omit<TokenType, "name"> & {
    name: "GreaterThanOrEq";
};

export declare interface IBaseInsight {
    ctx: string;
    value: number;
}

declare interface ICallbacks extends Record<Events, FsmCallback<MotionType>> {
    [Events.Reset]: Callback;
    [Events.MoveComplete]: Callback;
    [Events.FaultOccurred]: (message: string) => void;
    [Events.Move]: (command: MotionType) => Promise<void>;
}

declare interface ICallbacks_2 extends Record<Events_2, Callback | NumberCallback | StringCallback> {
    [Events_2.FaultOccurred]: (fault: string) => void;
}

declare interface ICstNodeVisitor<IN, OUT> extends ICstVisitor<IN, OUT> {
    Programs(children: ProgramsCstChildren, param?: IN): OUT;
    Program(children: ProgramCstChildren, param?: IN): OUT;
    Lines(children: LinesCstChildren, param?: IN): OUT;
    Line(children: LineCstChildren, param?: IN): OUT;
    VariableAssignment(children: VariableAssignmentCstChildren, param?: IN): OUT;
    ConditionalExpression(children: ConditionalExpressionCstChildren, param?: IN): OUT;
    AtomicBooleanExpression(children: AtomicBooleanExpressionCstChildren, param?: IN): OUT;
    BooleanExpression(children: BooleanExpressionCstChildren, param?: IN): OUT;
    AdditionExpression(children: AdditionExpressionCstChildren, param?: IN): OUT;
    MultiplicationExpression(children: MultiplicationExpressionCstChildren, param?: IN): OUT;
    FunctionExpression(children: FunctionExpressionCstChildren, param?: IN): OUT;
    BracketExpression(children: BracketExpressionCstChildren, param?: IN): OUT;
    AtomicExpression(children: AtomicExpressionCstChildren, param?: IN): OUT;
    Expression(children: ExpressionCstChildren, param?: IN): OUT;
    AddressedValue(children: AddressedValueCstChildren, param?: IN): OUT;
    NumericLiteral(children: NumericLiteralCstChildren, param?: IN): OUT;
    VariableLiteral(children: VariableLiteralCstChildren, param?: IN): OUT;
    ValueLiteral(children: ValueLiteralCstChildren, param?: IN): OUT;
    StartOfFile(children: StartOfFileCstChildren, param?: IN): OUT;
    ProgramNumberLine(children: ProgramNumberLineCstChildren, param?: IN): OUT;
    EndOfFile(children: EndOfFileCstChildren, param?: IN): OUT;
}

declare const If: Omit<TokenType, "name"> & {
    name: "If";
};

declare class InputUndefined extends MacroLexerError {
    constructor();
}

declare class InsightCollection {
    private _entries;
    /**
     * Push an {@link AddressInsight} into the collection
     *
     * If the collection has not been started, and empty array
     * will be created first.
     *
     * @returns The current number of insights in the contexts' collection
     */
    collect(insight: AddressInsight): number;
    /**
     * Get insights by context
     */
    get(ctx: string): AddressInsight[];
    /**
     * Get insight values, by context
     */
    values(ctx: string): number[];
    /**
     * Get all unique values from an array of insight values, by context
     */
    uniqValues(ctx: string): number[];
    /**
     * Get the minimum value from an array of insight values, by context
     */
    min(ctx: string): number;
    /**
     * Get the maximum value from an array of insight values, by context
     */
    max(ctx: string): number;
}

declare const Integer: Omit<TokenType, "name"> & {
    name: "Integer";
};

declare type _InterpreterEvents = PrefixObjectKeys<"INTERPRETER", typeof MacroInterpreter.EVENTS>;

declare class InvalidInput extends MacroLexerError {
    constructor(o: unknown);
}

declare class InvalidProgramNumber extends MacroRuntimeError {
    constructor(programNumber: string);
}

export declare interface IParsedLineData {
    /**
     * Parsed `N` line number (this is not the literal line, but explicit Nnnnn )
     */
    N: number;
    /**
     * Collection of all the `G` codes on the line
     */
    gCodes: IToken[];
    /**
     * Collection of all the `M` codes on the line
     */
    mCodes: IToken[];
    /**
     * Collection of all the ( comments ) found on the line
     */
    comments: string[];
    /**
     * Collection of all the non `G` & `M` codes on the line
     */
    addresses: AddressedValue[];
    gCodeMap: Record<string, boolean>;
    mCodeMap: Record<string, boolean>;
    /**
     * Map of letter addresses and their parsed values
     */
    addressMap: Record<string, number>;
}

export declare type IProgramNumberLine = {
    number: number;
    title?: string;
};

declare const Keyword: Omit<TokenType, "name"> & {
    name: string;
};

declare const LessThan: Omit<TokenType, "name"> & {
    name: "LessThan";
};

declare const LessThanOrEq: Omit<TokenType, "name"> & {
    name: "LessThanOrEq";
};

declare namespace LexerErrors {
    export {
        MacroLexerError,
        LexingError,
        InputUndefined,
        InvalidInput
    }
}

declare class LexingError extends MacroLexerError {
    constructor(err: ILexingError);
}

declare type LineCstChildren = {
    LineNumber?: IToken[];
    G_Code?: IToken[];
    M_Code?: IToken[];
    AddressedValue?: AddressedValueCstNode[];
    VariableAssignment?: VariableAssignmentCstNode[];
    ConditionalExpression?: ConditionalExpressionCstNode[];
    Expression?: ExpressionCstNode[];
    Comment?: IToken[];
};

declare interface LineCstNode extends CstNode {
    name: "Line";
    children: LineCstChildren;
}

declare const LineNumber: Omit<TokenType, "name"> & {
    name: "LineNumber";
};

declare type LinesCstChildren = {
    Line?: LineCstNode[];
    Newline?: IToken[];
};

declare interface LinesCstNode extends CstNode {
    name: "Lines";
    children: LinesCstChildren;
}

export declare interface MachineCommand {
    motion?: MotionType;
    position?: Partial<Record<AxisLabel, number>>;
}

export declare type MacroBuiltinFunctionNames = (typeof FANUC_MACRO_B_FNS)[number];

export declare type MacroCombinedError = MacroLexerError | MacroParserError;

/**
 * Macro Interpreter
 */
export declare class MacroInterpreter extends BaseCstVisitor {
    #private;
    static EVENTS: {
        LINE: IParsedLineData;
    };
    constructor();
    /**
     * Get the interpreter's {@link MacroMemory}
     */
    get memory(): MacroMemory;
    on: <Name extends keyof OmnipresentEventData | "LINE">(eventName: Name | readonly Name[], listener: (eventData: ({
        LINE: IParsedLineData;
    } & OmnipresentEventData)[Name]) => void | Promise<void>) => UnsubscribeFunction;
    onAny: (listener: (eventName: "LINE", eventData: IParsedLineData) => void | Promise<void>) => UnsubscribeFunction;
    /**
     * Reset the {@link MarcoInterpreter} by clearing any lines and the {@link MacroMemory}
     */
    reset(): void;
    getInsights(): InsightCollection;
    /**
     * Root Node for valid NC Programs
     */
    Program(ctx: CST.ProgramCstChildren): NcProgram;
    /**
     * Get the Program title and number
     */
    ProgramNumberLine(ctx: CST.ProgramNumberLineCstChildren): IProgramNumberLine;
    /**
     * Iterate over the {@link LineCstChildren} to extract the contents
     */
    Lines(ctx: CST.LinesCstChildren): IParsedLineData[];
    /**
     * Get the complete contents of a line of G code
     */
    Line(ctx: CST.LineCstChildren): IParsedLineData;
    /**
     * Parse all possible info out of this address
     */
    AddressedValue(ctx: CST.AddressedValueCstChildren, gCodeFlags?: Record<string, boolean>): AddressedValue;
    /**
     * A plain number, signed
     */
    NumericLiteral(ctx: CST.NumericLiteralCstChildren): number;
    /**
     * A Macro Variable, defined as a `#` and a number
     */
    VariableLiteral(ctx: CST.VariableLiteralCstChildren): MacroVariable;
    /**
     * If a number, then the visit the node, otherwise evaluate the macro var
     */
    ValueLiteral(ctx: CST.ValueLiteralCstChildren): number;
    /**
     * Update a macro variable regsiter with a value
     */
    VariableAssignment(ctx: CST.VariableAssignmentCstChildren): void;
    /**
     * This addition -> multiplication -> atomic
     */
    Expression(ctx: CST.ExpressionCstChildren): number;
    /**
     * This handles subtraction as well since both the
     * {@link Plus} and {@link Minus} tokens have
     * the category {@link AdditionOperator}
     */
    AdditionExpression(ctx: CST.AdditionExpressionCstChildren): number;
    /**
     * This handles division as well since both the
     * {@link Product} and {@link Divide} tokens have
     * the category {@link MultiplicationOperator}
     */
    MultiplicationExpression(ctx: CST.MultiplicationExpressionCstChildren): number;
    AtomicExpression(ctx: CST.AtomicExpressionCstChildren): number;
    /**
     * Ignore the brackets and return the children
     */
    BracketExpression(ctx: CST.BracketExpressionCstChildren): number;
    /**
     * Evaluate one of the built-in functions
     */
    FunctionExpression(ctx: CST.FunctionExpressionCstChildren): number;
}

export declare class MacroLexer implements ErrorProducer<LexingError> {
    #private;
    constructor();
    get hasTokens(): boolean;
    get hasErrors(): boolean;
    get definitionErrors(): ILexerDefinitionError[];
    tokenize(input: string, initialMode?: string): IToken[];
    getGroups(): ILexingResult["groups"];
    getTokens(): IToken[];
    getErrors(): LexingError[];
    reset(): void;
}

declare class MacroLexerError extends Error {
}

/**
 * A Representaion of a CNC machines' macro memory.
 */
export declare class MacroMemory {
    #private;
    static ZERO: number;
    static REGISTERS: number[];
    /**
     * Construct a new instance of the MacroMemory class and initialize the variables
     * @TODO have a way to initialize code groups
     */
    constructor();
    on: <Name extends "REGISTER_UPDATE" | keyof OmnipresentEventData>(eventName: Name | readonly Name[], listener: (eventData: (MacroMemoryEvents & OmnipresentEventData)[Name]) => void | Promise<void>) => UnsubscribeFunction;
    /**
     * Clear all registers to reset the memory
     */
    reset(): void;
    /**
     * Read a value from a register
     */
    read(register: number | SystemVariable): number;
    /**
     * Write  a value to a register
     */
    write(register: number | SystemVariable, value: number): Omit<MacroMemoryEvents["REGISTER_UPDATE"], "register">;
    /**
     * Clear a register value by writing {@link MacroMemory.ZERO}
     */
    clear(register: number | SystemVariable): void;
    /**
     * Evaluate a G10 line to apply values
     */
    g10(g10: G10ToolOffsets | G10WorkOffsets): void;
    /**
     * Get work coordinates as labeled axis locations for a common work offset
     * (G53, G54, G55, G56, G57, G58, G59)
     */
    getWorkCoordinateRecord(gOffset: number): WorkCoordinateRecord;
    /**
     * Get work coordinates for a common work offset (G53, G54, G55, G56, G57, G58, G59)
     */
    getWorkCoordinateArray(gOffset: number): WorkCoordinateArray;
    /**
     * Get auxiliary work coordinates for a G54.1 `P` group
     */
    getAuxWorkCoordinateRecord(pGroup: number): WorkCoordinateRecord;
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
    setCommonWorkOffset(group: number, locations: Partial<WorkCoordinateRecord>): void;
    /**
     * Set axis values for a Work Offset Group (L2)
     *
     * G10 line sets:  `G10 G90 L2 P1 X0 Y0 Z0 B0`
     * Use in program: `G54 X0 Y0`
     */
    setAuxWorkOffset(group: number, locations: Partial<WorkCoordinateRecord>): void;
    /**
     * Create an array of all the set macro variables
     */
    toArray(opts?: CastingOptions): MacroValueArray;
    /**
     * Collect all the set registers into a POJO for further processing
     */
    toObject(opts?: CastingOptions): Record<number, number>;
    /**
     * Serialize all the MacroMemory into a JSON string
     */
    toJSON(): string;
}

declare type MacroMemoryEvents = {
    REGISTER_UPDATE: Record<"previous" | "current" | "register", number>;
};

export declare class MacroParser extends MacroParserRuleTree implements ErrorProducer<ParsingError> {
    #private;
    static getBaseCstVisitor(opts: {
        useConstructorDefaults: boolean;
    }): new (...args: any[]) => ICstVisitor<any, any>;
    get hasErrors(): boolean;
    reset(): void;
    setInput(tokens: IToken[]): void;
    getErrors(): ParsingError[];
}

declare class MacroParserError extends Error {
}

declare class MacroParserRuleTree extends CstParser {
    /**
     * Utilize the generic to get the token name
     * @link https://github.com/Chevrotain/chevrotain/issues/1987#issuecomment-1709854026
     */
    CONSUME<S extends TokenType>(token: S, options?: ConsumeMethodOpts): Omit<IToken, "tokenType"> & {
        tokenType: S;
    };
    constructor();
    /**
     * Multiple NC Programs
     */
    Programs: ParserMethod<[], CstNode>;
    /**
     * Defining a valid NC Program
     */
    Program: ParserMethod<[], CstNode>;
    /**
     *
     */
    Lines: ParserMethod<[], CstNode>;
    /**
     * Any number of valid addresses, comments, and/or Expressions
     */
    Line: ParserMethod<[], CstNode>;
    /**
     * Assigning a variable with a value
     *
     * @example
     *   #500 = 12.3456
     *   #501 = [2 + 0.5]
     *   #502 = [#501 / 2]
     */
    VariableAssignment: ParserMethod<[], CstNode>;
    /**
     * If Expression to branch control flow
     */
    ConditionalExpression: ParserMethod<[], CstNode>;
    AtomicBooleanExpression: ParserMethod<[], CstNode>;
    /**
     * Making a comparison between two values
     */
    BooleanExpression: ParserMethod<[], CstNode>;
    /**
     * Lowest precedence thus it is first in the rule chain
     * The precedence of binary Expressions is determined by how far down the Parse Tree
     * The binary Expression appears.
     */
    AdditionExpression: ParserMethod<[], CstNode>;
    /**
     *
     */
    MultiplicationExpression: ParserMethod<[], CstNode>;
    /**
     * Calling a Built-In function
     */
    FunctionExpression: ParserMethod<[], CstNode>;
    /**
     * Any Expression wrapped in brackets
     *
     * @example [#3 + 4.5]
     */
    BracketExpression: ParserMethod<[], CstNode>;
    /**
     * `BracketExpression` has the highest precedence and thus it appears
     * in the "lowest" leaf in the Expression ParseTree.
     */
    AtomicExpression: ParserMethod<[], CstNode>;
    /**
     *
     */
    Expression: ParserMethod<[], CstNode>;
    /**
     * A single, capital letter followed by number or
     * macro variable reference
     *
     * @example H#518, X1.2345, Z1., M1, G90
     */
    AddressedValue: ParserMethod<[], CstNode>;
    /**
     * A signed, decimal or integer
     *
     * @example 5, 1.2345, -1., 3000
     */
    NumericLiteral: ParserMethod<[], CstNode>;
    /**
     * Pound sign `#` followed by an integer representing a variable register
     *
     * @TODO variable Expressions!
     * @example "#518" or "#152"
     */
    VariableLiteral: ParserMethod<[], CstNode>;
    /**
     * Number or Macro variable
     */
    ValueLiteral: ParserMethod<[], CstNode>;
    /**
     * Start of a valid NC File
     */
    StartOfFile: ParserMethod<[], CstNode>;
    /**
     * A line consisting of a program number and optional comment
     */
    ProgramNumberLine: ParserMethod<[], CstNode>;
    /**
     * End of a valid NC File
     */
    EndOfFile: ParserMethod<[], CstNode>;
}

/**
 * MacroRuntime Class to hold multiple programs in memory
 */
export declare class MacroRuntime implements ErrorProducer<MacroCombinedError> {
    #private;
    static EVENTS: _CncMachineEvents & _InterpreterEvents & {
        ERROR: Error;
    };
    constructor(config?: Partial<MacroRuntimeConfig>);
    get Lexer(): MacroLexer;
    get Parser(): MacroParser;
    get Interpreter(): MacroInterpreter;
    get Memory(): MacroMemory;
    get Machine(): CncMachine;
    get hasErrors(): boolean;
    on: <Name extends keyof OmnipresentEventData | "MACHINE:FAULT" | "MACHINE:RESET" | "MACHINE:TRAVELING" | "MACHINE:MOTION_COMPLETE" | "INTERPRETER:LINE" | "ERROR">(eventName: Name | readonly Name[], listener: (eventData: (PrefixObjectKeys<"MACHINE", Omit<AxisFsmEvents, "MOTION_COMPLETE"> & {
        MOTION_COMPLETE: Position;
    }> & PrefixObjectKeys<"INTERPRETER", {
        LINE: IParsedLineData;
    }> & {
        ERROR: Error;
    } & OmnipresentEventData)[Name]) => void | Promise<void>) => UnsubscribeFunction;
    /**
     * Reset the runtime
     */
    reset(): void;
    getErrors(): (LexingError | ParsingError)[];
    getInsights(): InsightCollection;
    /**
     * Returns the loaded programs indexed by their program numbers.
     */
    getPrograms(): Record<number, string>;
    /**
     * Count of loaded programs.
     */
    getProgramCount(): number;
    /**
     * Main entry point to the runtime.
     */
    run(lineCallback?: (line: IParsedLineData) => void): NcProgram;
    /**
     * Load a Program into memory
     *
     * This method can create a program if given a string
     *
     * @TODO wrap "programs" if they don't have a program number
     */
    loadProgram(input: string, options?: ProgramLoadOptions): void;
    /**
     * Batch load programs into memory
     */
    loadPrograms(programs: string[]): void;
    /**
     * Check if a program has been loaded and exists in the runtime.
     */
    programIsLoaded(programNumber: number | null): boolean;
    /**
     * Set a program number as `active` in the runtime.
     *
     * @TODO add error handling to check if program is loaded
     */
    setActiveProgram(programNumber: number): boolean;
    /**
     * Return the active program content.
     */
    getActiveProgram(): string;
    /**
     * Return the active program nmber.
     */
    getActiveProgramNumber(): number;
    /**
     * Register a function to handle errors that occur in the runtime.
     */
    onError(handler: (eventData: MacroCombinedError) => void): UnsubscribeFunction;
    /**
     * Retrieve a record of errors
     */
    getErrorMessages(): string[];
    /**
     * Return a program by number if loaded in memory.
     */
    getProgram(programNumber: number | string): string;
}

export declare interface MacroRuntimeConfig {
    machine?: CncMachine;
}

declare class MacroRuntimeError extends Error {
}

export declare class MacroRuntimeFSM extends StateMachine<States_3, Events_3> {
    static STATES: typeof States_3;
    static EVENTS: typeof Events_3;
    callbacks: StateHandlerMap<StateName>;
    constructor(callbacks?: Partial<StateHandlerMap<StateName>>);
    getTransitions(): ITransition<States_3, Events_3, Callback>[];
    trigger(event: keyof typeof Events_3): Promise<void>;
    on<T extends StateName>(stateName: T, callback: NonNullable<Callback>): void;
}

export declare type MacroValueArray = [register: number, value: number][];

declare class MacroVariable {
    register: number;
    value: number;
    static create(init: {
        register: number;
        value: number;
    }): MacroVariable;
    constructor(register: number, value?: number);
}

declare const Mcode: Omit<TokenType, "name"> & {
    name: "M_Code";
};

export declare const MemoryConstants: {
    FORBIDDEN_AREA_ALARM_TIMING: 1300;
    MICROTIMER: 3001;
    GROUP_1: 4001;
    GROUP_2: 4002;
    GROUP_3: 4003;
    GROUP_4: 4004;
    GROUP_5: 4005;
    GROUP_6: 4006;
    GROUP_7: 4007;
    GROUP_8: 4008;
    GROUP_9: 4009;
    GROUP_10: 4010;
    GROUP_11: 4011;
    GROUP_12: 4012;
    GROUP_13: 4013;
    GROUP_14: 4014;
    GROUP_15: 4015;
    GROUP_16: 4016;
    GROUP_22: 4022;
    CURRENT_B: 4102;
    CURRENT_D: 4107;
    CURRENT_F: 4109;
    CURRENT_H: 4111;
    CURRENT_M: 4113;
    CURRENT_N_LINE: 4114;
    CURRENT_PROGRAM_NUMBER: 4115;
    CURRENT_S: 4119;
    CURRENT_T: 4120;
    OFFSET_GROUPS: {
        readonly TOOL: {
            readonly LENGTH_COMP: 10;
            readonly LENGTH: 11;
            readonly DIAMETER_COMP: 12;
            readonly DIAMETER: 13;
        };
        readonly WORK: {
            readonly COMMON: 2;
            readonly AUX: 20;
        };
    };
    G10_L_GROUPS: Record<string, "LENGTH_COMP" | "LENGTH" | "DIAMETER_COMP" | "DIAMETER" | "COMMON" | "AUX">;
    ONE_GROUP_OF_OFFSET_REGISTERS: 20;
    AXIS_ADRRESS_INDEX: Record<string, number>;
    WORK_OFFSET_ADDRESS_MAP: Record<number, number>;
};

declare const Minus: Omit<TokenType, "name"> & {
    name: "Minus";
};

declare const Modulus: Omit<TokenType, "name"> & {
    name: "Modulus";
};

declare type MotionType = "G0" | "G1";

declare type MultiplicationExpressionCstChildren = {
    lhs: AtomicExpressionCstNode[];
    MultiplicationOperator?: IToken[];
    rhs?: AtomicExpressionCstNode[];
};

declare interface MultiplicationExpressionCstNode extends CstNode {
    name: "MultiplicationExpression";
    children: MultiplicationExpressionCstChildren;
}

declare const MultiplicationOperator: Omit<TokenType, "name"> & {
    name: string;
};

declare class NcProgram {
    #private;
    id: number;
    title: string;
    static create(init: NcProgramCreateConfig): NcProgram;
    constructor(id: number, title: string);
    get lineCount(): number;
    getLines(): IParsedLineData[];
    setLines(lines: IParsedLineData[]): void;
}

declare type NcProgramCreateConfig = {
    id: number;
    title?: string;
    lines: IParsedLineData[];
};

declare const Newline: Omit<TokenType, "name"> & {
    name: "Newline";
};

declare class NoActiveProgram extends MacroRuntimeError {
    constructor();
}

declare const NotEqualTo: Omit<TokenType, "name"> & {
    name: "NotEqualTo";
};

declare type NumberCallback = (arg: number) => void;

declare type NumericLiteralCstChildren = {
    Minus?: IToken[];
    NumericValue: IToken[];
};

declare interface NumericLiteralCstNode extends CstNode {
    name: "NumericLiteral";
    children: NumericLiteralCstChildren;
}

declare const NumericValue: Omit<TokenType, "name"> & {
    name: string;
};

export declare type OneOrMany<T> = T | T[];

declare const OpenBracket: Omit<TokenType, "name"> & {
    name: "OpenBracket";
};

declare const OpenParen: Omit<TokenType, "name"> & {
    name: "OpenParen";
};

declare const Or: Omit<TokenType, "name"> & {
    name: "Or";
};

export declare interface ParsedAddressData {
    image: string;
    value: number;
    address: string;
    isNegative: boolean;
}

declare namespace ParserErrors {
    export {
        MacroParserError,
        ParsingError
    }
}

declare class ParsingError extends MacroParserError {
    constructor(err: IRecognitionException);
}

declare const Percent: Omit<TokenType, "name"> & {
    name: "Percent";
};

declare const Plus: Omit<TokenType, "name"> & {
    name: "Plus";
};

declare type Position = Partial<Record<"X" | "Y" | "Z", number>>;

export declare type PossibleG10LineValues = G10ToolOffsets | G10WorkOffsets;

export declare type PrefixObjectKeys<Prefix extends string, T> = {
    [K in keyof T as `${Prefix}:${string & K}`]: T[K];
};

declare const Product: Omit<TokenType, "name"> & {
    name: "Product";
};

declare type ProgramCstChildren = {
    StartOfFile: StartOfFileCstNode[];
    ProgramNumberLine: ProgramNumberLineCstNode[];
    Lines: LinesCstNode[];
    EndOfFile: EndOfFileCstNode[];
};

declare interface ProgramCstNode extends CstNode {
    name: "Program";
    children: ProgramCstChildren;
}

export declare interface ProgramLoadOptions {
    setActive: boolean;
    programNumber?: number;
}

/**
 * @TODO investigate if the custom matcher is needed. Can the parser turn an address token
 * with image "O" and a number into a "program number"?
 */
declare const ProgramNumber: Omit<TokenType, "name"> & {
    name: "ProgramNumber";
};

declare type ProgramNumberLineCstChildren = {
    ProgramNumber: IToken[];
    Comment?: IToken[];
    Newline: IToken[];
};

declare interface ProgramNumberLineCstNode extends CstNode {
    name: "ProgramNumberLine";
    children: ProgramNumberLineCstChildren;
}

declare class ProgramNumberNotFound extends MacroRuntimeError {
    constructor(programNumber: number | string | null);
}

declare type ProgramsCstChildren = {
    Program?: ProgramCstNode[];
    Newline?: IToken[];
};

declare interface ProgramsCstNode extends CstNode {
    name: "Programs";
    children: ProgramsCstChildren;
}

export declare const RegisterMap: {
    ToolOffset: typeof getToolOffsetRegister;
    WorkOffset: typeof getWorkOffsetAxisRegister;
    AuxWorkOffset: typeof getAuxWorkOffsetAxisRegister;
};

declare namespace RuntimeErrors {
    export {
        MacroRuntimeError,
        NoActiveProgram,
        ProgramNumberNotFound,
        InvalidProgramNumber
    }
}

export declare interface RuntimeOutput<T> {
    result: T;
    timing: number;
}

declare const SemiColon: Omit<TokenType, "name"> & {
    name: "SemiColon";
};

declare type SpindleEventEmitter = {
    M3: undefined;
    M4: undefined;
    M5: undefined;
    FAULT: string;
    AT_TARGET_RPM: number;
    RPM_CHANGED: {
        target: number;
        current: number;
    };
};

export declare class SpindleFSM extends StateMachine<States_2, Events_2, ICallbacks_2> {
    #private;
    handlers: Partial<EventHandlers>;
    constructor(config?: DeepPartial<SpindleFsmConfig>);
    on: <Name extends keyof OmnipresentEventData | keyof SpindleEventEmitter>(eventName: Name | readonly Name[], listener: (eventData: (SpindleEventEmitter & OmnipresentEventData)[Name]) => void | Promise<void>) => UnsubscribeFunction;
    get hasFault(): boolean;
    get direction(): string;
    get rpms(): number;
    get config(): SpindleFsmConfig;
    get stats(): {
        currentRPM: number;
        directon: string;
    };
    get simulation(): boolean;
    set simulation(state: boolean);
    /**
     * Generic state testing method
     */
    is(state: keyof typeof States_2): boolean;
    /**
     * Spindle Forward (CW)
     */
    M3(targetRPM: number): Promise<void>;
    /**
     * Spindle Reverse (CCW)
     */
    M4(targetRPM: number): Promise<void>;
    /**
     * Spindle Stop
     */
    M5(): Promise<void>;
    stop: () => Promise<void>;
    forward: (targetRPM: number) => Promise<void>;
    reverse: (targetRPM: number) => Promise<void>;
}

declare interface SpindleFsmConfig {
    throwOnFault: boolean;
    rpm: {
        max: number;
        onExceedMaxRPM: "fault" | "clamp";
    };
    acceleration: {
        simulate: boolean;
        timeout: number;
    };
}

declare type StartOfFileCstChildren = {
    Percent: IToken[];
    Newline: IToken[];
};

declare interface StartOfFileCstNode extends CstNode {
    name: "StartOfFile";
    children: StartOfFileCstChildren;
}

declare type StateHandlerMap<T extends string> = Record<CallbackName<T>, ActualCallback>;

declare type StateName = keyof typeof States_3;

declare enum States {
    Idle = "Idle",
    Fault = "Fault",
    Traveling = "Traveling"
}

declare enum States_2 {
    Idle = "Idle",
    Fault = "Fault",
    Running = "Running",
    Accelerating = "Accelerating",
    Decelerating = "Decelerating"
}

declare enum States_3 {
    finished = "finished",
    error = "error",
    stopped = "stopped",
    paused = "paused",
    running = "running"
}

/**
 * These are built in language functions for Fanuc Macro B
 */
export declare const STDLIB: Record<MacroBuiltinFunctionNames, (x: number) => number>;

declare type StringCallback = (arg: string) => void;

export declare enum SystemVariable {
    "_DATE" = 3011,// Year/Month/Date
    "_TIME" = 3012,//Hour/Minute/Second
    "_PRTSA" = 3901,// Total number of parts
    "_PRTSN" = 3902,// Number of required part
    "_OFSMEM" = 3980,
    "_MAINO" = 4000,
    "_TOFSWX" = 5081,// X-axis tool offset (wear)
    "_TOFSWZ" = 5082,// Y-axis tool offset (wear)
    "_TOFSWY" = 5083,// Z-axis tool offset (wear)
    "_TOFSGX" = 5121,// X-axis tool offset (geometry)
    "_TOFSGZ" = 5122,// Y-axis tool offset (geometry)
    "_TOFSGY" = 5123
}

declare namespace T {
    export {
        Gcode,
        Mcode,
        LineNumber,
        ProgramNumber,
        Address,
        Or,
        And,
        XOr,
        EqualTo,
        NotEqualTo,
        LessThan,
        LessThanOrEq,
        GreaterThan,
        GreaterThanOrEq,
        OpenParen,
        CloseParen,
        OpenBracket,
        CloseBracket,
        GotoLine,
        If,
        Then,
        Do,
        While,
        FANUC_MACRO_B_FNS,
        BuiltinFunction,
        MacroBuiltinFunctionNames,
        Integer,
        Decimal,
        Plus,
        Minus,
        Product,
        Divide,
        Modulus,
        WhiteSpace,
        Comment,
        Var,
        Dot,
        Equals,
        Percent,
        Newline,
        SemiColon,
        Fences,
        Keyword,
        NumericValue,
        BooleanOperator,
        AdditionOperator,
        ControlFlowKeyword,
        MultiplicationOperator
    }
}
export { T }

declare const Then: Omit<TokenType, "name"> & {
    name: "Then";
};

export declare type ToolOffsetArray = [
toolNumber: number,
lengthGeom: number,
lengthWear: number,
diamGeom: number,
diamWear: number
];

export declare interface ToolOffsetDict {
    length: number;
    lengthComp: number;
    diameter: number;
    diameterComp: number;
}

export declare type ValidG10OffsetGroups = ValidG10WorkOffsetGroup | ValidG10ToolOffsetGroup;

export declare type ValidG10ToolOffsetGroup = 10 | 11 | 12 | 13;

export declare type ValidG10WorkOffsetGroup = 2 | 20;

declare type ValueLiteralCstChildren = {
    VariableLiteral?: VariableLiteralCstNode[];
    NumericLiteral?: NumericLiteralCstNode[];
};

declare interface ValueLiteralCstNode extends CstNode {
    name: "ValueLiteral";
    children: ValueLiteralCstChildren;
}

/**
 * @TODO this should be more complex and handle the variable number capture?
 * @TODO have it evaluate expressions into var numbers?
 */
declare const Var: Omit<TokenType, "name"> & {
    name: "Var";
};

declare type VariableAssignmentCstChildren = {
    VariableLiteral: VariableLiteralCstNode[];
    Equals: IToken[];
    Expression: ExpressionCstNode[];
};

declare interface VariableAssignmentCstNode extends CstNode {
    name: "VariableAssignment";
    children: VariableAssignmentCstChildren;
}

declare type VariableLiteralCstChildren = {
    Var: IToken[];
    Integer: IToken[];
};

declare interface VariableLiteralCstNode extends CstNode {
    name: "VariableLiteral";
    children: VariableLiteralCstChildren;
}

declare const While: Omit<TokenType, "name"> & {
    name: "While";
};

declare const WhiteSpace: Omit<TokenType, "name"> & {
    name: "WhiteSpace";
};

export declare type WithInput<T, I> = T & {
    input: I;
};

export declare type WithResult<T, R> = T & {
    result: R;
};

export declare type WorkCoordinateArray = [X: number, Y: number, Z: number, B: number];

export declare interface WorkCoordinateRecord {
    X: number;
    Y: number;
    Z: number;
    B: number;
}

declare const XOr: Omit<TokenType, "name"> & {
    name: "XOr";
};

export { }
