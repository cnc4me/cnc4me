import type { CstNode, ICstVisitor, IToken } from "chevrotain";

export interface ProgramCstNode extends CstNode {
  name: "program";
  children: ProgramCstChildren;
}

export type ProgramCstChildren = {
  StartOfFile: StartOfFileCstNode[];
  ProgramNumberLine: ProgramNumberLineCstNode[];
  Lines: LinesCstNode[];
  EndOfFile: EndOfFileCstNode[];
};

export interface LinesCstNode extends CstNode {
  name: "Lines";
  children: LinesCstChildren;
}

export type LinesCstChildren = {
  Line?: LineCstNode[];
  Newline?: IToken[];
};

export interface LineCstNode extends CstNode {
  name: "Line";
  children: LineCstChildren;
}

export type LineCstChildren = {
  LineNumber?: IToken[];
  G_Code?: IToken[];
  M_Code?: IToken[];
  AddressedValue?: AddressedValueCstNode[];
  variableAssignment?: VariableAssignmentCstNode[];
  conditionalExpression?: ConditionalExpressionCstNode[];
  Comment?: IToken[];
};

export interface AddressedValueCstNode extends CstNode {
  name: "AddressedValue";
  children: AddressedValueCstChildren;
}

export type AddressedValueCstChildren = {
  Address: IToken[];
  Minus?: IToken[];
  NumericValue?: IToken[];
  VariableLiteral?: VariableLiteralCstNode[];
  bracketExpression?: BracketExpressionCstNode[];
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

export interface ProgramNumberLineCstNode extends CstNode {
  name: "ProgramNumberLine";
  children: ProgramNumberLineCstChildren;
}

export type ProgramNumberLineCstChildren = {
  ProgramNumber: IToken[];
  Comment: IToken[];
  Newline: IToken[];
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
  atomicExpression: (AtomicExpressionCstNode)[];
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

export interface StartOfFileCstNode extends CstNode {
  name: "StartOfFile";
  children: StartOfFileCstChildren;
}

export type StartOfFileCstChildren = {
  Percent: IToken[];
  Newline: IToken[];
};

export interface EndOfFileCstNode extends CstNode {
  name: "EndOfFile";
  children: EndOfFileCstChildren;
}

export type EndOfFileCstChildren = {
  Percent: IToken[];
  Newline?: IToken[];
};

export interface ICstNodeVisitor<IN, OUT> extends ICstVisitor<IN, OUT> {
  program(children: ProgramCstChildren, param?: IN): OUT;
  Lines(children: LinesCstChildren, param?: IN): OUT;
  Line(children: LineCstChildren, param?: IN): OUT;
  AddressedValue(children: AddressedValueCstChildren, param?: IN): OUT;
  NumericLiteral(children: NumericLiteralCstChildren, param?: IN): OUT;
  VariableLiteral(children: VariableLiteralCstChildren, param?: IN): OUT;
  ValueLiteral(children: ValueLiteralCstChildren, param?: IN): OUT;
  ProgramNumberLine(children: ProgramNumberLineCstChildren, param?: IN): OUT;
  expression(children: ExpressionCstChildren, param?: IN): OUT;
  additionExpression(children: AdditionExpressionCstChildren, param?: IN): OUT;
  multiplicationExpression(children: MultiplicationExpressionCstChildren, param?: IN): OUT;
  functionExpression(children: FunctionExpressionCstChildren, param?: IN): OUT;
  booleanExpression(children: BooleanExpressionCstChildren, param?: IN): OUT;
  conditionalExpression(children: ConditionalExpressionCstChildren, param?: IN): OUT;
  atomicExpression(children: AtomicExpressionCstChildren, param?: IN): OUT;
  bracketExpression(children: BracketExpressionCstChildren, param?: IN): OUT;
  variableAssignment(children: VariableAssignmentCstChildren, param?: IN): OUT;
  StartOfFile(children: StartOfFileCstChildren, param?: IN): OUT;
  EndOfFile(children: EndOfFileCstChildren, param?: IN): OUT;
}
