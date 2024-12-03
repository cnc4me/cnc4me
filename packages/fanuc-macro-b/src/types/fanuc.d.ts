import type { CstNode, ICstVisitor, IToken } from "chevrotain";

declare interface ProgramCstNode extends CstNode {
  name: "Program";
  children: ProgramCstChildren;
}

declare type ProgramCstChildren = {
  StartOfFile: StartOfFileCstNode[];
  ProgramNumberLine: ProgramNumberLineCstNode[];
  Lines: LinesCstNode[];
  EndOfFile: EndOfFileCstNode[];
};

declare interface LinesCstNode extends CstNode {
  name: "Lines";
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
  ConditionalExpression?: ConditionalExpressionCstNode[];
  Expression?: ExpressionCstNode[];
  Comment?: IToken[];
};

declare interface VariableAssignmentCstNode extends CstNode {
  name: "VariableAssignment";
  children: VariableAssignmentCstChildren;
}

declare type VariableAssignmentCstChildren = {
  VariableLiteral: VariableLiteralCstNode[];
  Equals: IToken[];
  Expression: ExpressionCstNode[];
};

declare interface ConditionalExpressionCstNode extends CstNode {
  name: "ConditionalExpression";
  children: ConditionalExpressionCstChildren;
}

declare type ConditionalExpressionCstChildren = {
  If: IToken[];
  AtomicBooleanExpression: AtomicBooleanExpressionCstNode[];
  Then?: IToken[];
  GotoLine?: IToken[];
};

declare interface AtomicBooleanExpressionCstNode extends CstNode {
  name: "AtomicBooleanExpression";
  children: AtomicBooleanExpressionCstChildren;
}

declare type AtomicBooleanExpressionCstChildren = {
  OpenBracket: IToken[];
  BooleanExpression: BooleanExpressionCstNode[];
  CloseBracket: IToken[];
};

declare interface BooleanExpressionCstNode extends CstNode {
  name: "BooleanExpression";
  children: BooleanExpressionCstChildren;
}

declare type BooleanExpressionCstChildren = {
  AtomicExpression: (AtomicExpressionCstNode)[];
  BooleanOperator: IToken[];
};

declare interface AdditionExpressionCstNode extends CstNode {
  name: "AdditionExpression";
  children: AdditionExpressionCstChildren;
}

declare type AdditionExpressionCstChildren = {
  lhs: MultiplicationExpressionCstNode[];
  AdditionOperator?: IToken[];
  rhs?: MultiplicationExpressionCstNode[];
};

declare interface MultiplicationExpressionCstNode extends CstNode {
  name: "MultiplicationExpression";
  children: MultiplicationExpressionCstChildren;
}

declare type MultiplicationExpressionCstChildren = {
  lhs: AtomicExpressionCstNode[];
  MultiplicationOperator?: IToken[];
  rhs?: AtomicExpressionCstNode[];
};

declare interface FunctionExpressionCstNode extends CstNode {
  name: "FunctionExpression";
  children: FunctionExpressionCstChildren;
}

declare type FunctionExpressionCstChildren = {
  FunctionName: IToken[];
  BracketExpression: BracketExpressionCstNode[];
};

declare interface BracketExpressionCstNode extends CstNode {
  name: "BracketExpression";
  children: BracketExpressionCstChildren;
}

declare type BracketExpressionCstChildren = {
  OpenBracket: IToken[];
  Expression: ExpressionCstNode[];
  CloseBracket: IToken[];
};

declare interface AtomicExpressionCstNode extends CstNode {
  name: "AtomicExpression";
  children: AtomicExpressionCstChildren;
}

declare type AtomicExpressionCstChildren = {
  FunctionExpression?: FunctionExpressionCstNode[];
  BracketExpression?: BracketExpressionCstNode[];
  NumericLiteral?: NumericLiteralCstNode[];
  VariableLiteral?: VariableLiteralCstNode[];
};

declare interface ExpressionCstNode extends CstNode {
  name: "Expression";
  children: ExpressionCstChildren;
}

declare type ExpressionCstChildren = {
  AdditionExpression: AdditionExpressionCstNode[];
};

declare interface AddressedValueCstNode extends CstNode {
  name: "AddressedValue";
  children: AddressedValueCstChildren;
}

declare type AddressedValueCstChildren = {
  Address: IToken[];
  Minus?: IToken[];
  NumericValue?: IToken[];
  BracketExpression?: BracketExpressionCstNode[];
  VariableLiteral?: VariableLiteralCstNode[];
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
  EndOfFile(children: EndOfFileCstChildren, param?: IN): OUT;
  ProgramNumberLine(children: ProgramNumberLineCstChildren, param?: IN): OUT;
}
