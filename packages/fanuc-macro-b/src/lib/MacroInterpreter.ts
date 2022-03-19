/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { tokenMatcher } from "chevrotain";
import Emittery from "emittery";
import { match } from "ts-pattern";

import { INTERPRETER } from "../PackageConfig";
import type { ProgramIdentifier, VariableRegister } from "../types";
import type {
  AdditionExpressionCstChildren,
  AtomicExpressionCstChildren,
  BracketExpressionCstChildren,
  ExpressionCstChildren,
  FunctionExpressionCstChildren,
  LineCstChildren,
  LineCstNode,
  LinesCstChildren,
  MultiplicationExpressionCstChildren,
  NumericLiteralCstChildren,
  ProgramCstChildren,
  ProgramNumberLineCstChildren,
  ValueLiteralCstChildren,
  VariableAssignmentCstChildren,
  VariableLiteralCstChildren
} from "../types/fanuc";
import { getImage, unbox, unwrap } from "../utils";
import { degreeToRadian, radianToDegree } from "../utils/trig";
import { LoggerConfig, MacroLogger } from "./MacroLogger";
import { parser } from "./MacroParser";
import { MacroVariables } from "./MacroVariables";
import { Plus, Product } from "./Tokens";

interface WatcherValuePayload {
  prev: number;
  curr: number;
  register: number;
}

const BaseCstVisitor = INTERPRETER.USE_CONSTRUCTOR_WITH_DEFAULTS
  ? parser.getBaseCstVisitorConstructorWithDefaults()
  : parser.getBaseCstVisitorConstructor();

/**
 * Macro Interpreter
 */
export class MacroInterpreter extends BaseCstVisitor {
  logger: MacroLogger;

  vars: MacroVariables;
  varStack: MacroVariables[] = [];
  varWatches: Array<(payload: WatcherValuePayload) => unknown> = [];

  events: Emittery;

  constructor() {
    super();

    this.events = new Emittery();

    /**
     * @todo lets replace this with the new {@link MacroRuntime}
     */
    this.vars = new MacroVariables(1, 10);

    // Logger Configuration
    this.logger = new MacroLogger();

    // Keep This Last!
    this.validateVisitor();
  }

  onLog(listener: LoggerConfig["listener"]) {
    this.logger.tap(listener);
  }

  /**
   * Root Node for valid NC Programs
   */
  program(ctx: ProgramCstChildren) {
    const lines = [];

    let prgId: ProgramIdentifier = { programNumber: 0, programTitle: "" };

    if (ctx.ProgramNumberLine) {
      prgId = this.visit(ctx.ProgramNumberLine);
    }

    if (ctx.Lines) {
      const lineNodes: ReturnType<MacroInterpreter["Lines"]> = this.visit(ctx.Lines);

      for (const line of lineNodes) {
        const vLine: ReturnType<MacroInterpreter["Line"]> = this.visit(line);
        lines.push(vLine);
      }
    }

    return { ...prgId, lines };
  }

  /**
   * Returning the {@link LineCstNode} while ignoring the trailing `\n`
   */
  Lines(ctx: LinesCstChildren): LineCstNode[] {
    return ctx.Line;
  }

  /**
   * Get the complete contents of a line of G code
   */
  Line(ctx: LineCstChildren) {
    const gCodes = [];
    const mCodes = [];
    const comments = [];
    const addresses = [];

    if (ctx?.Comment) {
      for (const comment of ctx.Comment) {
        comments.push(unwrap(getImage(comment)));
      }
    }

    if (ctx?.G_Code) {
      gCodes.push(...ctx.G_Code);
    }

    if (ctx?.M_Code) {
      mCodes.push(...ctx.M_Code);
    }

    if (ctx?.LineNumber) {
      addresses.push(...ctx.LineNumber);
    }

    if (ctx?.AddressedValue) {
      addresses.push(...ctx.AddressedValue);
    }

    return { comments, gCodes, mCodes, addresses };
  }

  /**
   * Get the Program title and number
   */
  ProgramNumberLine(ctx: ProgramNumberLineCstChildren): ProgramIdentifier {
    const node = unbox(ctx.ProgramNumber);
    const comment = ctx?.Comment ? getImage(ctx.Comment) : "";

    return {
      programTitle: unwrap(comment),
      programNumber: parseInt(node.payload)
    };
  }

  /**
   * A plain number, signed
   */
  NumericLiteral(ctx: NumericLiteralCstChildren): number {
    const image = getImage(ctx.NumericValue);
    const value = `${ctx.Minus ? "-" : ""}${image}`;

    return image.includes(".") ? parseFloat(value) : parseInt(value);
  }

  /**
   * A Macro Variable, defined as a `#` and a number
   */
  VariableLiteral(ctx: VariableLiteralCstChildren) {
    const register = parseInt(getImage(ctx.Integer));

    return this.getMacro(register);
  }

  ValueLiteral(ctx: ValueLiteralCstChildren) {
    if (ctx.VariableLiteral) {
      const macro: VariableRegister = this.visit(ctx.VariableLiteral);

      return macro.value;
    }

    if (ctx.NumericLiteral) {
      return this.visit(ctx.NumericLiteral);
    }
  }

  expression(ctx: ExpressionCstChildren) {
    return this.visit(ctx.additionExpression) as ReturnType<this["additionExpression"]>;
  }

  functionExpression(ctx: FunctionExpressionCstChildren): number {
    const func = getImage(ctx.BuiltinFunctions);
    const value = this.visit(ctx.atomicExpression) as ReturnType<this["atomicExpression"]>;

    // prettier-ignore
    const result = match(func)
      .with("LN",    () => Math.log(value))
      .with("ABS",   () => Math.abs(value))
      .with("FUP",   () => Math.ceil(value))
      .with("SQRT",  () => Math.sqrt(value))
      .with("FIX",   () => Math.floor(value))
      .with("ROUND", () => Math.round(value))
      .with("SIN",   () => Math.sin(degreeToRadian(value)))
      .with("COS",   () => Math.cos(degreeToRadian(value)))
      .with("TAN",   () => Math.tan(degreeToRadian(value)))
      .with("ASIN",  () => radianToDegree(Math.asin(value)))
      .with("ACOS",  () => radianToDegree(Math.acos(value)))
      .with("ATAN",  () => radianToDegree(Math.atan(value)))
      .otherwise(() => NaN);

    return result;
  }

  /**
   * Update a macro variable regsiter with a value
   */
  variableAssignment(ctx: VariableAssignmentCstChildren) {
    const macro = this.visit(ctx.VariableLiteral) as ReturnType<this["VariableLiteral"]>;
    const values: WatcherValuePayload = {
      register: macro.register,
      curr: NaN,
      prev: macro.value
    };

    const value = this.visit(ctx.expression);

    values.curr = value;

    this.setMacroValue(macro.register, value);

    /**
     * @TODO remove the watches for events
     */
    if (this.varWatches[macro.register]) {
      this.varWatches[macro.register](values);
    }
  }

  additionExpression(ctx: AdditionExpressionCstChildren) {
    let result = this.visit(ctx.lhs);

    // "rhs" key may be undefined as the grammar defines it as
    // optional(MANY === zero or more).
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        // there will be one operator for each rhs operand
        const rhsValue = this.visit(rhsOperand);

        if (ctx?.AdditionOperator) {
          const operator = ctx.AdditionOperator[idx];

          if (tokenMatcher(operator, Plus)) {
            this.logger.operation(result, "+", rhsValue);
            result += rhsValue;
          } else {
            this.logger.operation(result, "-", rhsValue);
            result -= rhsValue;
          }
        }
      });
    }

    return result;
  }

  multiplicationExpression(ctx: MultiplicationExpressionCstChildren) {
    let result = this.visit(ctx.lhs);

    // "rhs" key may be undefined as the grammar defines it as optional (MANY === zero or more).
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        // there will be one operator for each rhs operand
        const rhsValue = this.visit(rhsOperand);

        if (ctx?.MultiplicationOperator) {
          const operator = ctx.MultiplicationOperator[idx];

          if (tokenMatcher(operator, Product)) {
            this.logger.operation(result, "*", rhsValue);
            result *= rhsValue;
          } else {
            this.logger.operation(result, "/", rhsValue);
            result /= rhsValue;
          }
        }
      });
    }

    return result;
  }

  atomicExpression(ctx: AtomicExpressionCstChildren) {
    if (ctx.bracketExpression) {
      return this.visit(ctx.bracketExpression) as ReturnType<this["bracketExpression"]>;
    } else if (ctx.NumericLiteral) {
      return this.visit(ctx.NumericLiteral) as ReturnType<this["NumericLiteral"]>;
    } else if (ctx.functionExpression) {
      return this.visit(ctx.functionExpression) as ReturnType<this["functionExpression"]>;
    } else if (ctx.VariableLiteral) {
      const macroVar = this.visit(ctx.VariableLiteral) as ReturnType<this["VariableLiteral"]>;
      return macroVar.value;
    } else {
      return ctx;
    }
  }

  bracketExpression(ctx: BracketExpressionCstChildren) {
    return this.visit(ctx.expression) as ReturnType<this["expression"]>;
  }

  /**
   * Macro Variable Methods
   */

  /**
   * Retrieve a single macro variable register
   */
  getMacro(register: number): VariableRegister {
    const macro = {
      register,
      value: this.vars.getMap().get(register) ?? NaN
    };

    return macro;
  }

  /**
   * Retrieve the macro variable map
   */
  getMacros(): Map<number, number> {
    return this.vars.getMap();
  }

  /**
   * Preload a macro variable register with a value
   */
  setMacroValue(register: number, value: number): VariableRegister {
    this.vars.write(register, value);

    this.logger.operation(`#${register}`, "=", value);

    return this.getMacro(register);
  }

  /**
   * Preload multiple macro variable registers with values
   */
  setMacroVars(registerValues: [register: number, value: number][]) {
    for (const [register, value] of registerValues) {
      this.setMacroValue(register, value);
    }
  }

  /**
   * Attach a method to observe the value changes for a macro register
   */
  watchMacroVar(macroRegister: number, handler: (payload: WatcherValuePayload) => unknown) {
    this.varWatches[macroRegister] = handler;
  }
}

export const interpreter = new MacroInterpreter();
