[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / MacroInterpreter

# Class: MacroInterpreter

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:50](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L50)

Macro Interpreter

## Extends

- `BaseCstVisitor`

## Constructors

### new MacroInterpreter()

> **new MacroInterpreter**(): [`MacroInterpreter`](MacroInterpreter.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:62](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L62)

#### Returns

[`MacroInterpreter`](MacroInterpreter.md)

#### Overrides

`BaseCstVisitor.constructor`

## Properties

### on()

> **on**: \<`Name`\>(`eventName`, `listener`) => `UnsubscribeFunction`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:76](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L76)

Subscribe to one or more events.

Using the same listener multiple times for the same event will result in only one method call per emitted event.

#### Type Parameters

• **Name** *extends* keyof OmnipresentEventData \| `"LINE"` \| `"END_OF_PROGRAM"`

#### Parameters

##### eventName

`Name` | readonly `Name`[]

##### listener

(`eventData`) => `void` \| `Promise`\<`void`\>

#### Returns

`UnsubscribeFunction`

An unsubscribe method.

#### Example

```
import Emittery from 'emittery';

const emitter = new Emittery();

emitter.on('🦄', data => {
	console.log(data);
});

emitter.on(['🦄', '🐶'], data => {
	console.log(data);
});

emitter.emit('🦄', '🌈'); // log => '🌈' x2
emitter.emit('🐶', '🍖'); // log => '🍖'
```

***

### onAny()

> **onAny**: (`listener`) => `UnsubscribeFunction`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:77](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L77)

Subscribe to be notified about any event.

#### Parameters

##### listener

(`eventName`, `eventData`) => `void` \| `Promise`\<`void`\>

#### Returns

`UnsubscribeFunction`

A method to unsubscribe.

***

### EVENTS

> `static` **EVENTS**: `object`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:51](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L51)

#### END\_OF\_PROGRAM

> **END\_OF\_PROGRAM**: `undefined`

#### LINE

> **LINE**: [`IParsedLineData`](../interfaces/IParsedLineData.md)

## Accessors

### memory

#### Get Signature

> **get** **memory**(): [`MacroMemory`](MacroMemory.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:72](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L72)

Get the interpreter's [MacroMemory](MacroMemory.md)

##### Returns

[`MacroMemory`](MacroMemory.md)

## Methods

### AdditionExpression()

> **AdditionExpression**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:323](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L323)

This handles subtraction as well since both the
`Plus` and `Minus` tokens have the category `AdditionOperator`

#### Parameters

##### ctx

[`AdditionExpressionCstChildren`](../namespaces/CST/type-aliases/AdditionExpressionCstChildren.md)

#### Returns

`number`

***

### AddressedValue()

> **AddressedValue**(`ctx`, `gCodeFlags`): `AddressedValue`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:491](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L491)

Parse all possible info out of this address

#### Parameters

##### ctx

[`AddressedValueCstChildren`](../namespaces/CST/type-aliases/AddressedValueCstChildren.md)

##### gCodeFlags

`Record`\<`string`, `boolean`\> = `{}`

#### Returns

`AddressedValue`

***

### AtomicBooleanExpression()

> **AtomicBooleanExpression**(`ctx`): `boolean`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:446](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L446)

Evaluate a BooleanExpression into a boolean value

#### Parameters

##### ctx

[`AtomicBooleanExpressionCstChildren`](../namespaces/CST/type-aliases/AtomicBooleanExpressionCstChildren.md)

#### Returns

`boolean`

***

### AtomicExpression()

> **AtomicExpression**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:385](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L385)

#### Parameters

##### ctx

[`AtomicExpressionCstChildren`](../namespaces/CST/type-aliases/AtomicExpressionCstChildren.md)

#### Returns

`number`

***

### BracketExpression()

> **BracketExpression**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:406](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L406)

Ignore the brackets and return the children

#### Parameters

##### ctx

[`BracketExpressionCstChildren`](../namespaces/CST/type-aliases/BracketExpressionCstChildren.md)

#### Returns

`number`

***

### ConditionalExpression()

> **ConditionalExpression**(`ctx`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:429](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L429)

#### Parameters

##### ctx

[`ConditionalExpressionCstChildren`](../namespaces/CST/type-aliases/ConditionalExpressionCstChildren.md)

#### Returns

`void`

***

### DoStatement()

> **DoStatement**(`ctx`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:264](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L264)

#### Parameters

##### ctx

[`DoStatementCstChildren`](../namespaces/CST/type-aliases/DoStatementCstChildren.md)

#### Returns

`void`

***

### EndStatement()

> **EndStatement**(`ctx`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:276](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L276)

Move the pointer to the starting GOTO block number

#### Parameters

##### ctx

[`EndStatementCstChildren`](../namespaces/CST/type-aliases/EndStatementCstChildren.md)

#### Returns

`void`

***

### Expression()

> **Expression**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:315](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L315)

This addition -> multiplication -> atomic

#### Parameters

##### ctx

[`ExpressionCstChildren`](../namespaces/CST/type-aliases/ExpressionCstChildren.md)

#### Returns

`number`

***

### FunctionExpression()

> **FunctionExpression**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:413](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L413)

Evaluate one of the built-in functions

#### Parameters

##### ctx

[`FunctionExpressionCstChildren`](../namespaces/CST/type-aliases/FunctionExpressionCstChildren.md)

#### Returns

`number`

***

### getBlocks()

> **getBlocks**(): `BlockCollection`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:94](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L94)

#### Returns

`BlockCollection`

***

### getInsights()

> **getInsights**(): `InsightCollection`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:109](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L109)

#### Returns

`InsightCollection`

***

### getRawLines()

> **getRawLines**(): [`IParsedLineData`](../interfaces/IParsedLineData.md)[]

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:90](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L90)

#### Returns

[`IParsedLineData`](../interfaces/IParsedLineData.md)[]

***

### GoToStatement()

> **GoToStatement**(`ctx`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:288](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L288)

Move the pointer to the GOTO block number

#### Parameters

##### ctx

[`GoToStatementCstChildren`](../namespaces/CST/type-aliases/GoToStatementCstChildren.md)

#### Returns

`void`

***

### Line()

> **Line**(`ctx`): [`IParsedLineData`](../interfaces/IParsedLineData.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:167](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L167)

Get the complete contents of a line of G code

#### Parameters

##### ctx

[`LineCstChildren`](../namespaces/CST/type-aliases/LineCstChildren.md)

#### Returns

[`IParsedLineData`](../interfaces/IParsedLineData.md)

***

### Lines()

> **Lines**(`ctx`): [`IParsedLineData`](../interfaces/IParsedLineData.md)[]

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:141](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L141)

Iterate over the lines to extract the contents

#### Parameters

##### ctx

[`LinesCstChildren`](../namespaces/CST/type-aliases/LinesCstChildren.md)

#### Returns

[`IParsedLineData`](../interfaces/IParsedLineData.md)[]

***

### MultiplicationExpression()

> **MultiplicationExpression**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:354](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L354)

This handles division as well since both the
`Product` and `Divide` tokens have the category `MultiplicationOperator`

#### Parameters

##### ctx

[`MultiplicationExpressionCstChildren`](../namespaces/CST/type-aliases/MultiplicationExpressionCstChildren.md)

#### Returns

`number`

***

### NumericLiteral()

> **NumericLiteral**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:508](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L508)

A plain number, signed

#### Parameters

##### ctx

[`NumericLiteralCstChildren`](../namespaces/CST/type-aliases/NumericLiteralCstChildren.md)

#### Returns

`number`

***

### Program()

> **Program**(`ctx`): `NcProgram`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:116](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L116)

Root Node for valid NC Programs

#### Parameters

##### ctx

[`ProgramCstChildren`](../namespaces/CST/type-aliases/ProgramCstChildren.md)

#### Returns

`NcProgram`

***

### ProgramNumberLine()

> **ProgramNumberLine**(`ctx`): [`IProgramNumberLine`](../type-aliases/IProgramNumberLine.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:127](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L127)

Get the Program title and number

#### Parameters

##### ctx

[`ProgramNumberLineCstChildren`](../namespaces/CST/type-aliases/ProgramNumberLineCstChildren.md)

#### Returns

[`IProgramNumberLine`](../type-aliases/IProgramNumberLine.md)

***

### reset()

> **reset**(): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:84](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L84)

Reset the Interpreter

Clears lines and blocks, resets the [MacroMemory](MacroMemory.md)

#### Returns

`void`

***

### validateVisitor()

> **validateVisitor**(): `void`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:1917

Will throw an error if the visitor is missing any required methods
- `visitXYZ` for each `XYZ` grammar rule.

#### Returns

`void`

#### Inherited from

`BaseCstVisitor.validateVisitor`

***

### ValueLiteral()

> **ValueLiteral**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:530](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L530)

If a number, then the visit the node, otherwise evaluate the macro var

#### Parameters

##### ctx

[`ValueLiteralCstChildren`](../namespaces/CST/type-aliases/ValueLiteralCstChildren.md)

#### Returns

`number`

***

### VariableAssignment()

> **VariableAssignment**(`ctx`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:299](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L299)

Update a macro variable regsiter with a value

#### Parameters

##### ctx

[`VariableAssignmentCstChildren`](../namespaces/CST/type-aliases/VariableAssignmentCstChildren.md)

#### Returns

`void`

***

### VariableLiteral()

> **VariableLiteral**(`ctx`): `MacroVariable`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:518](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L518)

A Macro Variable, defined as a `#` and a number

#### Parameters

##### ctx

[`VariableLiteralCstChildren`](../namespaces/CST/type-aliases/VariableLiteralCstChildren.md)

#### Returns

`MacroVariable`

***

### visit()

> **visit**(`cstNode`, `param`?): `any`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:1911

#### Parameters

##### cstNode

`CstNode` | `CstNode`[]

##### param?

`any`

#### Returns

`any`

#### Inherited from

`BaseCstVisitor.visit`

***

### WhileDoExpression()

> **WhileDoExpression**(`ctx`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroInterpreter.ts:475](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/core/MacroInterpreter.ts#L475)

Interpret a while loop

#### Parameters

##### ctx

[`WhileDoExpressionCstChildren`](../namespaces/CST/type-aliases/WhileDoExpressionCstChildren.md)

#### Returns

`void`
