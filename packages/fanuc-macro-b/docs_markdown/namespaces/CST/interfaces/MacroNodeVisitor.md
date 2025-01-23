[**Fanuc Macro B**](../../../README.md)

***

[Fanuc Macro B](../../../globals.md) / [CST](../README.md) / MacroNodeVisitor

# Interface: MacroNodeVisitor\<IN, OUT\>

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:302](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L302)

## Extends

- `ICstVisitor`\<[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in), [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)\>

## Type Parameters

• **IN**

• **OUT**

## Methods

### AdditionExpression()

> **AdditionExpression**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:317](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L317)

#### Parameters

##### children

[`AdditionExpressionCstChildren`](../type-aliases/AdditionExpressionCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### AddressedValue()

> **AddressedValue**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:322](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L322)

#### Parameters

##### children

[`AddressedValueCstChildren`](../type-aliases/AddressedValueCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### AtomicBooleanExpression()

> **AtomicBooleanExpression**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:314](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L314)

#### Parameters

##### children

[`AtomicBooleanExpressionCstChildren`](../type-aliases/AtomicBooleanExpressionCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### AtomicExpression()

> **AtomicExpression**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:315](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L315)

#### Parameters

##### children

[`AtomicExpressionCstChildren`](../type-aliases/AtomicExpressionCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### AtomicWhileExpression()

> **AtomicWhileExpression**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:313](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L313)

#### Parameters

##### children

[`AtomicWhileExpressionCstChildren`](../type-aliases/AtomicWhileExpressionCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### BooleanExpression()

> **BooleanExpression**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:316](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L316)

#### Parameters

##### children

[`BooleanExpressionCstChildren`](../type-aliases/BooleanExpressionCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### BracketExpression()

> **BracketExpression**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:320](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L320)

#### Parameters

##### children

[`BracketExpressionCstChildren`](../type-aliases/BracketExpressionCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### ConditionalExpression()

> **ConditionalExpression**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:311](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L311)

#### Parameters

##### children

[`ConditionalExpressionCstChildren`](../type-aliases/ConditionalExpressionCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### DoStatement()

> **DoStatement**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:308](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L308)

#### Parameters

##### children

[`DoStatementCstChildren`](../type-aliases/DoStatementCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### EndOfFile()

> **EndOfFile**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:329](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L329)

#### Parameters

##### children

[`EndOfFileCstChildren`](../type-aliases/EndOfFileCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### EndStatement()

> **EndStatement**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:309](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L309)

#### Parameters

##### children

[`EndStatementCstChildren`](../type-aliases/EndStatementCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### Expression()

> **Expression**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:321](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L321)

#### Parameters

##### children

[`ExpressionCstChildren`](../type-aliases/ExpressionCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### FunctionExpression()

> **FunctionExpression**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:319](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L319)

#### Parameters

##### children

[`FunctionExpressionCstChildren`](../type-aliases/FunctionExpressionCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### GoToStatement()

> **GoToStatement**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:310](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L310)

#### Parameters

##### children

[`GoToStatementCstChildren`](../type-aliases/GoToStatementCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### Line()

> **Line**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:306](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L306)

#### Parameters

##### children

[`LineCstChildren`](../type-aliases/LineCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### Lines()

> **Lines**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:305](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L305)

#### Parameters

##### children

[`LinesCstChildren`](../type-aliases/LinesCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### MultiplicationExpression()

> **MultiplicationExpression**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:318](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L318)

#### Parameters

##### children

[`MultiplicationExpressionCstChildren`](../type-aliases/MultiplicationExpressionCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### NumericLiteral()

> **NumericLiteral**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:323](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L323)

#### Parameters

##### children

[`NumericLiteralCstChildren`](../type-aliases/NumericLiteralCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### Program()

> **Program**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:304](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L304)

#### Parameters

##### children

[`ProgramCstChildren`](../type-aliases/ProgramCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### ProgramNumberLine()

> **ProgramNumberLine**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:328](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L328)

#### Parameters

##### children

[`ProgramNumberLineCstChildren`](../type-aliases/ProgramNumberLineCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### Programs()

> **Programs**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:303](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L303)

#### Parameters

##### children

[`ProgramsCstChildren`](../type-aliases/ProgramsCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### StartOfFile()

> **StartOfFile**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:327](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L327)

#### Parameters

##### children

[`StartOfFileCstChildren`](../type-aliases/StartOfFileCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### validateVisitor()

> **validateVisitor**(): `void`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:1917

Will throw an error if the visitor is missing any required methods
- `visitXYZ` for each `XYZ` grammar rule.

#### Returns

`void`

#### Inherited from

`ICstVisitor.validateVisitor`

***

### ValueLiteral()

> **ValueLiteral**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:326](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L326)

#### Parameters

##### children

[`ValueLiteralCstChildren`](../type-aliases/ValueLiteralCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### VariableAssignment()

> **VariableAssignment**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:307](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L307)

#### Parameters

##### children

[`VariableAssignmentCstChildren`](../type-aliases/VariableAssignmentCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### VariableExpression()

> **VariableExpression**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:325](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L325)

#### Parameters

##### children

[`VariableExpressionCstChildren`](../type-aliases/VariableExpressionCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### VariableLiteral()

> **VariableLiteral**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:324](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L324)

#### Parameters

##### children

[`VariableLiteralCstChildren`](../type-aliases/VariableLiteralCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

***

### visit()

> **visit**(`cstNode`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:1911

#### Parameters

##### cstNode

`CstNode` | `CstNode`[]

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

#### Inherited from

`ICstVisitor.visit`

***

### WhileDoExpression()

> **WhileDoExpression**(`children`, `param`?): [`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:312](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L312)

#### Parameters

##### children

[`WhileDoExpressionCstChildren`](../type-aliases/WhileDoExpressionCstChildren.md)

##### param?

[`IN`](../../../interfaces/CST.MacroNodeVisitor.html#in)

#### Returns

[`OUT`](../../../interfaces/CST.MacroNodeVisitor.html#out)
