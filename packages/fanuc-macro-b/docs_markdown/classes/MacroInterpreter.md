[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / MacroInterpreter

# Class: MacroInterpreter

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:52](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L52)

Macro Interpreter

## Extends

- `BaseCstVisitor`

## Constructors

### Constructor

> **new MacroInterpreter**(): `MacroInterpreter`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:67](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L67)

#### Returns

`MacroInterpreter`

#### Overrides

`BaseCstVisitor.constructor`

## Properties

### on()

> **on**: \<`Name`\>(`eventName`, `listener`, `options?`) => `UnsubscribeFunction`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:85](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L85)

Subscribe to one or more events.

Using the same listener multiple times for the same event will result in only one method call per emitted event.

#### Type Parameters

##### Name

`Name` *extends* keyof OmnipresentEventData \| `"LINE"` \| `"END_OF_PROGRAM"`

#### Parameters

##### eventName

`Name` | readonly `Name`[]

##### listener

(`eventData`) => `void` \| `Promise`\<`void`\>

##### options?

###### signal?

`AbortSignal`

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

> **onAny**: (`listener`, `options?`) => `UnsubscribeFunction`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:86](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L86)

Subscribe to be notified about any event.

#### Parameters

##### listener

(`eventName`, `eventData`) => `void` \| `Promise`\<`void`\>

##### options?

###### signal?

`AbortSignal`

#### Returns

`UnsubscribeFunction`

A method to unsubscribe.

***

### EVENTS

> `static` **EVENTS**: `object`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:53](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L53)

#### END\_OF\_PROGRAM

> **END\_OF\_PROGRAM**: `undefined`

#### LINE

> **LINE**: [`IParsedLineData`](../interfaces/IParsedLineData.md)

## Accessors

### memory

#### Get Signature

> **get** **memory**(): [`MacroMemory`](MacroMemory.md)

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:81](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L81)

Get the interpreter's [MacroMemory](MacroMemory.md)

##### Returns

[`MacroMemory`](MacroMemory.md)

## Methods

### AdditionExpression()

> **AdditionExpression**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:336](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L336)

This handles subtraction as well since both the
`Plus` and `Minus` tokens have the category `AdditionOperator`

#### Parameters

##### ctx

[`AdditionExpressionCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/AdditionExpressionCstChildren.md)

#### Returns

`number`

***

### AddressedValue()

> **AddressedValue**(`ctx`, `gCodeFlags`): `AddressedValue`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:522](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L522)

Parse all possible info out of this address

#### Parameters

##### ctx

[`AddressedValueCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/AddressedValueCstChildren.md)

##### gCodeFlags

`Record`\<`string`, `boolean`\> = `{}`

#### Returns

`AddressedValue`

***

### AtomicBooleanExpression()

> **AtomicBooleanExpression**(`ctx`): `boolean`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:463](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L463)

Evaluate a BooleanExpression into a boolean value

#### Parameters

##### ctx

[`AtomicBooleanExpressionCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/AtomicBooleanExpressionCstChildren.md)

#### Returns

`boolean`

***

### AtomicExpression()

> **AtomicExpression**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:398](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L398)

#### Parameters

##### ctx

[`AtomicExpressionCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/AtomicExpressionCstChildren.md)

#### Returns

`number`

***

### BracketExpression()

> **BracketExpression**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:418](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L418)

Ignore the brackets and return the children

#### Parameters

##### ctx

[`BracketExpressionCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/BracketExpressionCstChildren.md)

#### Returns

`number`

***

### ConditionalExpression()

> **ConditionalExpression**(`ctx`): `void`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:443](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L443)

#### Parameters

##### ctx

[`ConditionalExpressionCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/ConditionalExpressionCstChildren.md)

#### Returns

`void`

***

### DoStatement()

> **DoStatement**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:271](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L271)

#### Parameters

##### ctx

[`DoStatementCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/DoStatementCstChildren.md)

#### Returns

`number`

***

### EndStatement()

> **EndStatement**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:285](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L285)

Move the pointer to the starting GOTO block number

#### Parameters

##### ctx

[`EndStatementCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/EndStatementCstChildren.md)

#### Returns

`number`

#### TODO

This needs to update the pointer back to the WHILE/DO

***

### Expression()

> **Expression**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:327](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L327)

This addition -> multiplication -> atomic

#### Parameters

##### ctx

[`ExpressionCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/ExpressionCstChildren.md)

#### Returns

`number`

***

### FunctionExpression()

> **FunctionExpression**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:426](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L426)

Evaluate one of the built-in functions

#### Parameters

##### ctx

[`FunctionExpressionCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/FunctionExpressionCstChildren.md)

#### Returns

`number`

***

### getBlocks()

> **getBlocks**(): `BlockManager`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:103](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L103)

#### Returns

`BlockManager`

***

### getInsights()

> **getInsights**(): `InsightCollection`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:107](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L107)

#### Returns

`InsightCollection`

***

### getRawLines()

> **getRawLines**(): [`IParsedLineData`](../interfaces/IParsedLineData.md)[]

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:99](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L99)

#### Returns

[`IParsedLineData`](../interfaces/IParsedLineData.md)[]

***

### GoToStatement()

> **GoToStatement**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:298](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L298)

Move the pointer to the GOTO block number

#### Parameters

##### ctx

[`GoToStatementCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/GoToStatementCstChildren.md)

#### Returns

`number`

***

### Line()

> **Line**(`ctx`): [`IParsedLineData`](../interfaces/IParsedLineData.md)

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:156](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L156)

Get the complete contents of a line of G code

#### Parameters

##### ctx

[`LineCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/LineCstChildren.md)

#### Returns

[`IParsedLineData`](../interfaces/IParsedLineData.md)

***

### LineNumber()

> **LineNumber**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:263](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L263)

#### Parameters

##### ctx

`IToken`[]

#### Returns

`number`

***

### Lines()

> **Lines**(`ctx`): [`IParsedLineData`](../interfaces/IParsedLineData.md)[]

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:140](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L140)

Iterate over the lines to extract the contents

#### Parameters

##### ctx

[`LinesCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/LinesCstChildren.md)

#### Returns

[`IParsedLineData`](../interfaces/IParsedLineData.md)[]

***

### MultiplicationExpression()

> **MultiplicationExpression**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:367](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L367)

This handles division as well since both the
`Product` and `Divide` tokens have the category `MultiplicationOperator`

#### Parameters

##### ctx

[`MultiplicationExpressionCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/MultiplicationExpressionCstChildren.md)

#### Returns

`number`

***

### NumericLiteral()

> **NumericLiteral**(`ctx`): `number`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:539](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L539)

A plain number, signed

#### Parameters

##### ctx

[`NumericLiteralCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/NumericLiteralCstChildren.md)

#### Returns

`number`

***

### Program()

> **Program**(`ctx`): `NcProgram`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:114](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L114)

Root Node for valid NC Programs

#### Parameters

##### ctx

[`ProgramCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/ProgramCstChildren.md)

#### Returns

`NcProgram`

***

### ProgramNumberLine()

> **ProgramNumberLine**(`ctx`): [`IProgramNumberLine`](../type-aliases/IProgramNumberLine.md)

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:126](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L126)

Get the Program title and number

#### Parameters

##### ctx

[`ProgramNumberLineCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/ProgramNumberLineCstChildren.md)

#### Returns

[`IProgramNumberLine`](../type-aliases/IProgramNumberLine.md)

***

### reset()

> **reset**(): `void`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:93](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L93)

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

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:561](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L561)

If a number, then the visit the node, otherwise evaluate the macro var

#### Parameters

##### ctx

[`ValueLiteralCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/ValueLiteralCstChildren.md)

#### Returns

`number`

***

### VariableAssignment()

> **VariableAssignment**(`ctx`): `void`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:309](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L309)

Update a macro variable regsiter with a value

#### Parameters

##### ctx

[`VariableAssignmentCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/VariableAssignmentCstChildren.md)

#### Returns

`void`

***

### VariableLiteral()

> **VariableLiteral**(`ctx`): `MacroVariable`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:549](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L549)

A Macro Variable, defined as a `#` and a number

#### Parameters

##### ctx

[`VariableLiteralCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/VariableLiteralCstChildren.md)

#### Returns

`MacroVariable`

***

### visit()

> **visit**(`cstNode`, `param?`): `any`

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

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:505](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L505)

Interpret a while loop

#### Parameters

##### ctx

[`WhileDoExpressionCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/WhileDoExpressionCstChildren.md)

#### Returns

`void`

***

### WhileLoopPredicate()

> **WhileLoopPredicate**(`ctx`): `boolean`

Defined in: [packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts:494](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/interpreter/MacroInterpreter.ts#L494)

Interpret the conditional of a While loop

#### Parameters

##### ctx

[`AtomicWhileExpressionCstChildren`](../Fanuc-Macro-B/namespaces/CST/type-aliases/AtomicWhileExpressionCstChildren.md)

#### Returns

`boolean`
