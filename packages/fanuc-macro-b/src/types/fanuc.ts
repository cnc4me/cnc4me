import type { CstNode, ICstVisitor, IToken } from "chevrotain";

export interface ProgramsCstNode extends CstNode {
  name: "Programs";
  children: ProgramsCstChildren;
}

export type ProgramsCstChildren = {
  Program?: ProgramCstNode[];
  Newline?: IToken[];
};

export interface ProgramCstNode extends CstNode {
  name: "Program";
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
  VariableAssignment?: VariableAssignmentCstNode[];
  ConditionalExpression?: ConditionalExpressionCstNode[];
  Expression?: ExpressionCstNode[];
  Comment?: IToken[];
};

export interface VariableAssignmentCstNode extends CstNode {
  name: "VariableAssignment";
  children: VariableAssignmentCstChildren;
}

export type VariableAssignmentCstChildren = {
  VariableLiteral: VariableLiteralCstNode[];
  Equals: IToken[];
  Expression: ExpressionCstNode[];
};

export interface ConditionalExpressionCstNode extends CstNode {
  name: "ConditionalExpression";
  children: ConditionalExpressionCstChildren;
}

export type ConditionalExpressionCstChildren = {
  If: IToken[];
  AtomicBooleanExpression: AtomicBooleanExpressionCstNode[];
  Then?: IToken[];
  GotoLine?: IToken[];
};

export interface AtomicBooleanExpressionCstNode extends CstNode {
  name: "AtomicBooleanExpression";
  children: AtomicBooleanExpressionCstChildren;
}

export type AtomicBooleanExpressionCstChildren = {
  OpenBracket: IToken[];
  BooleanExpression: BooleanExpressionCstNode[];
  CloseBracket: IToken[];
};

export interface BooleanExpressionCstNode extends CstNode {
  name: "BooleanExpression";
  children: BooleanExpressionCstChildren;
}

export type BooleanExpressionCstChildren = {
  AtomicExpression: (AtomicExpressionCstNode)[];
  BooleanOperator: IToken[];
};

export interface AdditionExpressionCstNode extends CstNode {
  name: "AdditionExpression";
  children: AdditionExpressionCstChildren;
}

export type AdditionExpressionCstChildren = {
  lhs: MultiplicationExpressionCstNode[];
  AdditionOperator?: IToken[];
  rhs?: MultiplicationExpressionCstNode[];
};

export interface MultiplicationExpressionCstNode extends CstNode {
  name: "MultiplicationExpression";
  children: MultiplicationExpressionCstChildren;
}

export type MultiplicationExpressionCstChildren = {
  lhs: AtomicExpressionCstNode[];
  MultiplicationOperator?: IToken[];
  rhs?: AtomicExpressionCstNode[];
};

export interface FunctionExpressionCstNode extends CstNode {
  name: "FunctionExpression";
  children: FunctionExpressionCstChildren;
}

export type FunctionExpressionCstChildren = {
  FunctionName: IToken[];
  BracketExpression: BracketExpressionCstNode[];
};

export interface BracketExpressionCstNode extends CstNode {
  name: "BracketExpression";
  children: BracketExpressionCstChildren;
}

export type BracketExpressionCstChildren = {
  OpenBracket: IToken[];
  Expression: ExpressionCstNode[];
  CloseBracket: IToken[];
};

export interface AtomicExpressionCstNode extends CstNode {
  name: "AtomicExpression";
  children: AtomicExpressionCstChildren;
}

export type AtomicExpressionCstChildren = {
  FunctionExpression?: FunctionExpressionCstNode[];
  BracketExpression?: BracketExpressionCstNode[];
  NumericLiteral?: NumericLiteralCstNode[];
  VariableLiteral?: VariableLiteralCstNode[];
};

export interface ExpressionCstNode extends CstNode {
  name: "Expression";
  children: ExpressionCstChildren;
}

export type ExpressionCstChildren = {
  AdditionExpression: AdditionExpressionCstNode[];
};

export interface AddressedValueCstNode extends CstNode {
  name: "AddressedValue";
  children: AddressedValueCstChildren;
}

export type AddressedValueCstChildren = {
  Address: IToken[];
  Minus?: IToken[];
  NumericValue?: IToken[];
  BracketExpression?: BracketExpressionCstNode[];
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

export interface StartOfFileCstNode extends CstNode {
  name: "StartOfFile";
  children: StartOfFileCstChildren;
}

export type StartOfFileCstChildren = {
  Percent: IToken[];
  Newline: IToken[];
};

export interface ProgramNumberLineCstNode extends CstNode {
  name: "ProgramNumberLine";
  children: ProgramNumberLineCstChildren;
}

export type ProgramNumberLineCstChildren = {
  ProgramNumber: IToken[];
  Comment?: IToken[];
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
