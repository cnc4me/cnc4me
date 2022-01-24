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
  Blocks?: LineCstNode[];
};

export interface LineCstNode extends CstNode {
  name: "line";
  children: LineCstChildren;
}

export type LineCstChildren = {
  conditionalExpression?: ConditionalExpressionCstNode[];
  variableAssignment?: VariableAssignmentCstNode[];
  addresses?: AddressesCstNode[];
};

export interface VariableAssignmentCstNode extends CstNode {
  name: "variableAssignment";
  children: VariableAssignmentCstChildren;
}

export type VariableAssignmentCstChildren = {
  lhs: VariableLiteralCstNode[];
  Equals: IToken[];
  rhs?: ValueExpressionCstNode[];
};

export interface BracketValueExpressionCstNode extends CstNode {
  name: "bracketValueExpression";
  children: BracketValueExpressionCstChildren;
}

export type BracketValueExpressionCstChildren = {
  OpenBracket: IToken[];
  valueExpression: ValueExpressionCstNode[];
  CloseBracket: IToken[];
};

export interface ValueExpressionCstNode extends CstNode {
  name: "valueExpression";
  children: ValueExpressionCstChildren;
}

export type ValueExpressionCstChildren = {
  lhs: ValueLiteralCstNode[];
  AdditionOperator?: IToken[];
  MultiplicationOperator?: IToken[];
  rhs: ValueLiteralCstNode[];
};

export interface BooleanExpressionCstNode extends CstNode {
  name: "booleanExpression";
  children: BooleanExpressionCstChildren;
}

export type BooleanExpressionCstChildren = {
  ValueLiteral: ValueLiteralCstNode[];
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

export interface AddressesCstNode extends CstNode {
  name: "addresses";
  children: AddressesCstChildren;
}

export type AddressesCstChildren = {
  AddressedValue?: AddressedValueCstNode[];
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

export interface AddressLiteralCstNode extends CstNode {
  name: "AddressLiteral";
  children: AddressLiteralCstChildren;
}

export type AddressLiteralCstChildren = {
  Address: IToken[];
  NumericLiteral: NumericLiteralCstNode[];
};

export interface NumericLiteralCstNode extends CstNode {
  name: "NumericLiteral";
  children: NumericLiteralCstChildren;
}

export type NumericLiteralCstChildren = {
  Minus?: IToken[];
  NumericValue: IToken[];
};

export interface AddressedValueCstNode extends CstNode {
  name: "AddressedValue";
  children: AddressedValueCstChildren;
}

export type AddressedValueCstChildren = {
  Address: IToken[];
  Minus?: IToken[];
  bracketValueExpression?: BracketValueExpressionCstNode[];
  VariableLiteral?: VariableLiteralCstNode[];
  NumericValue?: IToken[];
};

export interface ICstNodeVisitor<IN, OUT> extends ICstVisitor<IN, OUT> {
  program(children: ProgramCstChildren, param?: IN): OUT;
  line(children: LineCstChildren, param?: IN): OUT;
  variableAssignment(children: VariableAssignmentCstChildren, param?: IN): OUT;
  bracketValueExpression(children: BracketValueExpressionCstChildren, param?: IN): OUT;
  valueExpression(children: ValueExpressionCstChildren, param?: IN): OUT;
  booleanExpression(children: BooleanExpressionCstChildren, param?: IN): OUT;
  conditionalExpression(children: ConditionalExpressionCstChildren, param?: IN): OUT;
  addresses(children: AddressesCstChildren, param?: IN): OUT;
  VariableLiteral(children: VariableLiteralCstChildren, param?: IN): OUT;
  ValueLiteral(children: ValueLiteralCstChildren, param?: IN): OUT;
  AddressLiteral(children: AddressLiteralCstChildren, param?: IN): OUT;
  NumericLiteral(children: NumericLiteralCstChildren, param?: IN): OUT;
  AddressedValue(children: AddressedValueCstChildren, param?: IN): OUT;
}
