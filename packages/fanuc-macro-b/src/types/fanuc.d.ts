import type { CstNode, ICstVisitor, IToken } from "chevrotain";

export interface ProgramCstNode extends CstNode {
  name: "program";
  children: ProgramCstChildren;
}

export type ProgramCstChildren = {
  Percent: IToken[];
  Newline: IToken[];
  ProgramNumber: IToken[];
  Comment?: IToken[];
  lines: LinesCstNode[];
};

export interface LinesCstNode extends CstNode {
  name: "lines";
  children: LinesCstChildren;
}

export type LinesCstChildren = {
  line?: LineCstNode[];
  Newline?: IToken[];
};

export interface LineCstNode extends CstNode {
  name: "line";
  children: LineCstChildren;
}

export type LineCstChildren = {
  Percent?: IToken[];
  Comment?: IToken[];
  conditionalExpression?: ConditionalExpressionCstNode[];
  variableAssignment?: VariableAssignmentCstNode[];
  addresses?: AddressesCstNode[];
};

export interface ExpressionCstNode extends CstNode {
  name: "expression";
  children: ExpressionCstChildren;
}

export type ExpressionCstChildren = {
  additionExpression: AdditionExpressionCstNode[];
};

export interface AdditionExpressionCstNode extends CstNode {
  name: "additionExpression";
  children: AdditionExpressionCstChildren;
}

export type AdditionExpressionCstChildren = {
  lhs: MultiplicationExpressionCstNode[];
  AdditionOperator?: IToken[];
  rhs?: MultiplicationExpressionCstNode[];
};

export interface MultiplicationExpressionCstNode extends CstNode {
  name: "multiplicationExpression";
  children: MultiplicationExpressionCstChildren;
}

export type MultiplicationExpressionCstChildren = {
  lhs: AtomicExpressionCstNode[];
  MultiplicationOperator?: IToken[];
  rhs?: AtomicExpressionCstNode[];
};

export interface FunctionExpressionCstNode extends CstNode {
  name: "functionExpression";
  children: FunctionExpressionCstChildren;
}

export type FunctionExpressionCstChildren = {
  BuiltinFunctions: IToken[];
  OpenBracket: IToken[];
  atomicExpression: AtomicExpressionCstNode[];
  CloseBracket: IToken[];
};

export interface BooleanExpressionCstNode extends CstNode {
  name: "booleanExpression";
  children: BooleanExpressionCstChildren;
}

export type BooleanExpressionCstChildren = {
  atomicExpression: AtomicExpressionCstNode[];
  BooleanOperator: IToken[];
};

export interface ConditionalExpressionCstNode extends CstNode {
  name: "conditionalExpression";
  children: ConditionalExpressionCstChildren;
}

export type ConditionalExpressionCstChildren = {
  If: IToken[];
  OpenBracket: IToken[];
  booleanExpression: BooleanExpressionCstNode[];
  CloseBracket: IToken[];
  Then?: IToken[];
  GotoLine?: IToken[];
};

export interface AtomicExpressionCstNode extends CstNode {
  name: "atomicExpression";
  children: AtomicExpressionCstChildren;
}

export type AtomicExpressionCstChildren = {
  bracketExpression?: BracketExpressionCstNode[];
  functionExpression?: FunctionExpressionCstNode[];
  NumericLiteral?: NumericLiteralCstNode[];
  VariableLiteral?: VariableLiteralCstNode[];
};

export interface BracketExpressionCstNode extends CstNode {
  name: "bracketExpression";
  children: BracketExpressionCstChildren;
}

export type BracketExpressionCstChildren = {
  OpenBracket: IToken[];
  expression: ExpressionCstNode[];
  CloseBracket: IToken[];
};

export interface VariableAssignmentCstNode extends CstNode {
  name: "variableAssignment";
  children: VariableAssignmentCstChildren;
}

export type VariableAssignmentCstChildren = {
  VariableLiteral: VariableLiteralCstNode[];
  Equals: IToken[];
  expression: ExpressionCstNode[];
};

export interface AddressesCstNode extends CstNode {
  name: "addresses";
  children: AddressesCstChildren;
}

export type AddressesCstChildren = {
  AddressedValue?: AddressedValueCstNode[];
};

export interface AddressedValueCstNode extends CstNode {
  name: "AddressedValue";
  children: AddressedValueCstChildren;
}

export type AddressedValueCstChildren = {
  Address: IToken[];
  Minus?: IToken[];
  bracketExpression?: BracketExpressionCstNode[];
  VariableLiteral?: VariableLiteralCstNode[];
};

export interface NumericLiteralCstNode extends CstNode {
  name: "NumericLiteral";
  children: NumericLiteralCstChildren;
}

export type NumericLiteralCstChildren = {
  Minus?: IToken[];
  NumericValue: IToken[];
};

export interface VariableLiteralCstNode extends CstNode {
  name: "VariableLiteral";
  children: VariableLiteralCstChildren;
}

export type VariableLiteralCstChildren = {
  Var: IToken[];
  Integer: IToken[];
};

export interface ValueLiteralCstNode extends CstNode {
  name: "ValueLiteral";
  children: ValueLiteralCstChildren;
}

export type ValueLiteralCstChildren = {
  VariableLiteral?: VariableLiteralCstNode[];
  NumericLiteral?: NumericLiteralCstNode[];
};

export interface ICstNodeVisitor<IN, OUT> extends ICstVisitor<IN, OUT> {
  program(children: ProgramCstChildren, param?: IN): OUT;
  lines(children: LinesCstChildren, param?: IN): OUT;
  line(children: LineCstChildren, param?: IN): OUT;
  expression(children: ExpressionCstChildren, param?: IN): OUT;
  additionExpression(children: AdditionExpressionCstChildren, param?: IN): OUT;
  multiplicationExpression(
    children: MultiplicationExpressionCstChildren,
    param?: IN
  ): OUT;
  functionExpression(children: FunctionExpressionCstChildren, param?: IN): OUT;
  booleanExpression(children: BooleanExpressionCstChildren, param?: IN): OUT;
  conditionalExpression(
    children: ConditionalExpressionCstChildren,
    param?: IN
  ): OUT;
  atomicExpression(children: AtomicExpressionCstChildren, param?: IN): OUT;
  bracketExpression(children: BracketExpressionCstChildren, param?: IN): OUT;
  variableAssignment(children: VariableAssignmentCstChildren, param?: IN): OUT;
  addresses(children: AddressesCstChildren, param?: IN): OUT;
  AddressedValue(children: AddressedValueCstChildren, param?: IN): OUT;
  NumericLiteral(children: NumericLiteralCstChildren, param?: IN): OUT;
  VariableLiteral(children: VariableLiteralCstChildren, param?: IN): OUT;
  ValueLiteral(children: ValueLiteralCstChildren, param?: IN): OUT;
}
