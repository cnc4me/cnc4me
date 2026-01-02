[**Fanuc Macro B**](../../../../README.md)

***

[Fanuc Macro B](../../../../globals.md) / [CST](../README.md) / MacroNodeVisitor

# Interface: MacroNodeVisitor\<IN, OUT\>

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:302](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L302)

## Extends

- `ICstVisitor`\<`IN`, `OUT`\>

## Type Parameters

### IN

`IN`

### OUT

`OUT`

## Methods

### AdditionExpression()

> **AdditionExpression**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:317](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L317)

#### Parameters

##### children

[`AdditionExpressionCstChildren`](../type-aliases/AdditionExpressionCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### AddressedValue()

> **AddressedValue**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:322](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L322)

#### Parameters

##### children

[`AddressedValueCstChildren`](../type-aliases/AddressedValueCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### AtomicBooleanExpression()

> **AtomicBooleanExpression**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:314](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L314)

#### Parameters

##### children

[`AtomicBooleanExpressionCstChildren`](../type-aliases/AtomicBooleanExpressionCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### AtomicExpression()

> **AtomicExpression**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:315](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L315)

#### Parameters

##### children

[`AtomicExpressionCstChildren`](../type-aliases/AtomicExpressionCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### AtomicWhileExpression()

> **AtomicWhileExpression**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:313](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L313)

#### Parameters

##### children

[`AtomicWhileExpressionCstChildren`](../type-aliases/AtomicWhileExpressionCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### BooleanExpression()

> **BooleanExpression**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:316](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L316)

#### Parameters

##### children

[`BooleanExpressionCstChildren`](../type-aliases/BooleanExpressionCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### BracketExpression()

> **BracketExpression**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:320](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L320)

#### Parameters

##### children

[`BracketExpressionCstChildren`](../type-aliases/BracketExpressionCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### ConditionalExpression()

> **ConditionalExpression**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:311](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L311)

#### Parameters

##### children

[`ConditionalExpressionCstChildren`](../type-aliases/ConditionalExpressionCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### DoStatement()

> **DoStatement**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:308](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L308)

#### Parameters

##### children

[`DoStatementCstChildren`](../type-aliases/DoStatementCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### EndOfFile()

> **EndOfFile**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:329](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L329)

#### Parameters

##### children

[`EndOfFileCstChildren`](../type-aliases/EndOfFileCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### EndStatement()

> **EndStatement**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:309](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L309)

#### Parameters

##### children

[`EndStatementCstChildren`](../type-aliases/EndStatementCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### Expression()

> **Expression**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:321](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L321)

#### Parameters

##### children

[`ExpressionCstChildren`](../type-aliases/ExpressionCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### FunctionExpression()

> **FunctionExpression**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:319](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L319)

#### Parameters

##### children

[`FunctionExpressionCstChildren`](../type-aliases/FunctionExpressionCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### GoToStatement()

> **GoToStatement**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:310](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L310)

#### Parameters

##### children

[`GoToStatementCstChildren`](../type-aliases/GoToStatementCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### Line()

> **Line**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:306](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L306)

#### Parameters

##### children

[`LineCstChildren`](../type-aliases/LineCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### Lines()

> **Lines**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:305](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L305)

#### Parameters

##### children

[`LinesCstChildren`](../type-aliases/LinesCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### MultiplicationExpression()

> **MultiplicationExpression**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:318](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L318)

#### Parameters

##### children

[`MultiplicationExpressionCstChildren`](../type-aliases/MultiplicationExpressionCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### NumericLiteral()

> **NumericLiteral**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:323](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L323)

#### Parameters

##### children

[`NumericLiteralCstChildren`](../type-aliases/NumericLiteralCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### Program()

> **Program**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:304](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L304)

#### Parameters

##### children

[`ProgramCstChildren`](../type-aliases/ProgramCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### ProgramNumberLine()

> **ProgramNumberLine**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:328](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L328)

#### Parameters

##### children

[`ProgramNumberLineCstChildren`](../type-aliases/ProgramNumberLineCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### Programs()

> **Programs**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:303](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L303)

#### Parameters

##### children

[`ProgramsCstChildren`](../type-aliases/ProgramsCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### StartOfFile()

> **StartOfFile**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:327](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L327)

#### Parameters

##### children

[`StartOfFileCstChildren`](../type-aliases/StartOfFileCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

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

> **ValueLiteral**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:326](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L326)

#### Parameters

##### children

[`ValueLiteralCstChildren`](../type-aliases/ValueLiteralCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### VariableAssignment()

> **VariableAssignment**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:307](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L307)

#### Parameters

##### children

[`VariableAssignmentCstChildren`](../type-aliases/VariableAssignmentCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### VariableExpression()

> **VariableExpression**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:325](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L325)

#### Parameters

##### children

[`VariableExpressionCstChildren`](../type-aliases/VariableExpressionCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### VariableLiteral()

> **VariableLiteral**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:324](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L324)

#### Parameters

##### children

[`VariableLiteralCstChildren`](../type-aliases/VariableLiteralCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`

***

### visit()

> **visit**(`cstNode`, `param?`): `OUT`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:1911

#### Parameters

##### cstNode

`CstNode` | `CstNode`[]

##### param?

`IN`

#### Returns

`OUT`

#### Inherited from

`ICstVisitor.visit`

***

### WhileDoExpression()

> **WhileDoExpression**(`children`, `param?`): `OUT`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:312](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L312)

#### Parameters

##### children

[`WhileDoExpressionCstChildren`](../type-aliases/WhileDoExpressionCstChildren.md)

##### param?

`IN`

#### Returns

`OUT`
