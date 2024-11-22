import type { CstNode, ICstVisitor, IToken } from "chevrotain";

declare interface ProgramCstNode extends CstNode {
  name: "program";
  children: ProgramCstChildren;
}

declare type ProgramCstChildren = {
  StartOfFile: StartOfFileCstNode[];
  ProgramNumberLine: ProgramNumberLineCstNode[];
  lines: LinesCstNode[];
  EndOfFile: EndOfFileCstNode[];
};

declare interface LinesCstNode extends CstNode {
  name: "lines";
  children: LinesCstChildren;
}

declare type LinesCstChildren = {
  Line?: LineCstNode[];
  Newline?: IToken[];
};

declare interface LineCstNode extends CstNode {
  name: "Line";
  children: LineCstChildren;
}

declare type LineCstChildren = {
  LineNumber?: IToken[];
  G_Code?: IToken[];
  M_Code?: IToken[];
  AddressedValue?: AddressedValueCstNode[];
  VariableAssignment?: VariableAssignmentCstNode[];
  conditionalExpression?: ConditionalExpressionCstNode[];
  Comment?: IToken[];
};

declare interface VariableAssignmentCstNode extends CstNode {
  name: "VariableAssignment";
  children: VariableAssignmentCstChildren;
}

declare type VariableAssignmentCstChildren = {
  VariableLiteral: VariableLiteralCstNode[];
  Equals: IToken[];
  expression: ExpressionCstNode[];
};

declare interface AddressedValueCstNode extends CstNode {
  name: "AddressedValue";
  children: AddressedValueCstChildren;
}

declare type AddressedValueCstChildren = {
  Address: IToken[];
  Minus?: IToken[];
  NumericValue?: IToken[];
  VariableLiteral?: VariableLiteralCstNode[];
  bracketExpression?: BracketExpressionCstNode[];
};

declare interface NumericLiteralCstNode extends CstNode {
  name: "NumericLiteral";
  children: NumericLiteralCstChildren;
}

declare type NumericLiteralCstChildren = {
  Minus?: IToken[];
  NumericValue: IToken[];
};

declare interface VariableLiteralCstNode extends CstNode {
  name: "VariableLiteral";
  children: VariableLiteralCstChildren;
}

declare type VariableLiteralCstChildren = {
  Var: IToken[];
  Integer: IToken[];
};

declare interface ValueLiteralCstNode extends CstNode {
  name: "ValueLiteral";
  children: ValueLiteralCstChildren;
}

declare type ValueLiteralCstChildren = {
  VariableLiteral?: VariableLiteralCstNode[];
  NumericLiteral?: NumericLiteralCstNode[];
};

declare interface ExpressionCstNode extends CstNode {
  name: "expression";
  children: ExpressionCstChildren;
}

declare type ExpressionCstChildren = {
  additionExpression: AdditionExpressionCstNode[];
};

declare interface AdditionExpressionCstNode extends CstNode {
  name: "additionExpression";
  children: AdditionExpressionCstChildren;
}

declare type AdditionExpressionCstChildren = {
  lhs: MultiplicationExpressionCstNode[];
  AdditionOperator?: IToken[];
  rhs?: MultiplicationExpressionCstNode[];
};

declare interface MultiplicationExpressionCstNode extends CstNode {
  name: "multiplicationExpression";
  children: MultiplicationExpressionCstChildren;
}

declare type MultiplicationExpressionCstChildren = {
  lhs: AtomicExpressionCstNode[];
  MultiplicationOperator?: IToken[];
  rhs?: AtomicExpressionCstNode[];
};

declare interface FunctionExpressionCstNode extends CstNode {
  name: "functionExpression";
  children: FunctionExpressionCstChildren;
}

declare type FunctionExpressionCstChildren = {
  BuiltinFunction: IToken[];
  OpenBracket: IToken[];
  atomicExpression: AtomicExpressionCstNode[];
  CloseBracket: IToken[];
};

declare interface BooleanExpressionCstNode extends CstNode {
  name: "booleanExpression";
  children: BooleanExpressionCstChildren;
}

declare type BooleanExpressionCstChildren = {
  atomicExpression: (AtomicExpressionCstNode)[];
  BooleanOperator: IToken[];
};

declare interface ConditionalExpressionCstNode extends CstNode {
  name: "conditionalExpression";
  children: ConditionalExpressionCstChildren;
}

declare type ConditionalExpressionCstChildren = {
  If: IToken[];
  OpenBracket: IToken[];
  booleanExpression: BooleanExpressionCstNode[];
  CloseBracket: IToken[];
  Then?: IToken[];
  GotoLine?: IToken[];
};

declare interface AtomicExpressionCstNode extends CstNode {
  name: "atomicExpression";
  children: AtomicExpressionCstChildren;
}

declare type AtomicExpressionCstChildren = {
  bracketExpression?: BracketExpressionCstNode[];
  functionExpression?: FunctionExpressionCstNode[];
  NumericLiteral?: NumericLiteralCstNode[];
  VariableLiteral?: VariableLiteralCstNode[];
};

declare interface BracketExpressionCstNode extends CstNode {
  name: "bracketExpression";
  children: BracketExpressionCstChildren;
}

declare type BracketExpressionCstChildren = {
  OpenBracket: IToken[];
  expression: ExpressionCstNode[];
  CloseBracket: IToken[];
};

declare interface StartOfFileCstNode extends CstNode {
  name: "StartOfFile";
  children: StartOfFileCstChildren;
}

declare type StartOfFileCstChildren = {
  Percent: IToken[];
  Newline: IToken[];
};

declare interface EndOfFileCstNode extends CstNode {
  name: "EndOfFile";
  children: EndOfFileCstChildren;
}

declare type EndOfFileCstChildren = {
  Percent: IToken[];
  Newline?: IToken[];
};

declare interface ProgramNumberLineCstNode extends CstNode {
  name: "ProgramNumberLine";
  children: ProgramNumberLineCstChildren;
}

declare type ProgramNumberLineCstChildren = {
  ProgramNumber: IToken[];
  Comment: IToken[];
  Newline: IToken[];
};

declare interface ICstNodeVisitor<IN, OUT> extends ICstVisitor<IN, OUT> {
  program(children: ProgramCstChildren, param?: IN): OUT;
  lines(children: LinesCstChildren, param?: IN): OUT;
  Line(children: LineCstChildren, param?: IN): OUT;
  VariableAssignment(children: VariableAssignmentCstChildren, param?: IN): OUT;
  AddressedValue(children: AddressedValueCstChildren, param?: IN): OUT;
  NumericLiteral(children: NumericLiteralCstChildren, param?: IN): OUT;
  VariableLiteral(children: VariableLiteralCstChildren, param?: IN): OUT;
  ValueLiteral(children: ValueLiteralCstChildren, param?: IN): OUT;
  expression(children: ExpressionCstChildren, param?: IN): OUT;
  additionExpression(children: AdditionExpressionCstChildren, param?: IN): OUT;
  multiplicationExpression(children: MultiplicationExpressionCstChildren, param?: IN): OUT;
  functionExpression(children: FunctionExpressionCstChildren, param?: IN): OUT;
  booleanExpression(children: BooleanExpressionCstChildren, param?: IN): OUT;
  conditionalExpression(children: ConditionalExpressionCstChildren, param?: IN): OUT;
  atomicExpression(children: AtomicExpressionCstChildren, param?: IN): OUT;
  bracketExpression(children: BracketExpressionCstChildren, param?: IN): OUT;
  StartOfFile(children: StartOfFileCstChildren, param?: IN): OUT;
  EndOfFile(children: EndOfFileCstChildren, param?: IN): OUT;
  ProgramNumberLine(children: ProgramNumberLineCstChildren, param?: IN): OUT;
}
