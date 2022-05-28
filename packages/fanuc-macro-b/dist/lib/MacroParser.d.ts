import { CstParser } from "chevrotain";
export declare class MacroParser extends CstParser {
    constructor();
    /**
     * Defining a valid NC program
     */
    program: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    /**
     *
     */
    lines: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    /**
     * Any number of valid addresses, comments, and/or expressions
     */
    Line: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    /**
     * A single, capital letter followed by a macro variable
     *
     * @example H#518, X1.2345, Z1., M1, G90
     */
    private AddressedValue;
    /**
     * A signed, decimal or integer
     *
     * @example 5, 1.2345, -1., 3000
     */
    private NumericLiteral;
    /**
     * Pound sign `#` followed by an integer representing a variable register
     *
     * @TODO variable expressions!
     * @example "#518" or "#152"
     */
    private VariableLiteral;
    /**
     * Number or Macro variable
     */
    protected ValueLiteral: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    /**
     *
     */
    ProgramNumberLine: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    /**
     *
     */
    private expression;
    /**
     *
     */
    private additionExpression;
    /**
     *
     */
    private multiplicationExpression;
    /**
     * Calling a Built-In function
     */
    private functionExpression;
    /**
     * Making a comparison between two values
     */
    private booleanExpression;
    /**
     * If expression to branch control flow
     */
    private conditionalExpression;
    /**
     * `bracketExpression` has the highest precedence and thus it appears
     * in the "lowest" leaf in the expression ParseTree.
     */
    private atomicExpression;
    /**
     * Any expression wrapped in brackets
     *
     * @example [#3 + 4.5]
     */
    private bracketExpression;
    /**
     * Assigning a variable with a value
     *
     * @example
     *   #500 = 12.3456
     *   #501 = [2 + 0.5]
     *   #502 = [#501 / 2]
     */
    private variableAssignment;
    /**
     * Start of a valid NC File
     */
    private StartOfFile;
    /**
     * End of a valid NC File
     */
    private EndOfFile;
}
export declare const parser: MacroParser;
