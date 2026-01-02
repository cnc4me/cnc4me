[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / FanucMacroB

# Class: FanucMacroB

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:11](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L11)

## Implements

- [`ErrorProducer`](../interfaces/ErrorProducer.md)\<[`MacroLexerError`](../variables/Errors.md#macrolexererror) \| [`MacroParserError`](../variables/Errors.md#macroparsererror)\>

## Constructors

### Constructor

> **new FanucMacroB**(`options?`): `FanucMacroB`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:24](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L24)

#### Parameters

##### options?

`Partial`\<\{ `debug`: `boolean`; \}\>

#### Returns

`FanucMacroB`

## Properties

### interpreter

> **interpreter**: [`MacroInterpreter`](MacroInterpreter.md)

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:16](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L16)

***

### lexer

> **lexer**: [`MacroLexer`](MacroLexer.md)

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:14](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L14)

***

### options

> **options**: `object`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:18](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L18)

#### debug

> **debug**: `boolean` = `false`

***

### parser

> **parser**: [`MacroParser`](MacroParser.md)

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:15](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L15)

## Accessors

### hasErrors

#### Get Signature

> **get** **hasErrors**(): `boolean`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:42](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L42)

If either the [MacroLexer](MacroLexer.md) or [MacroParser](MacroParser.md) encountered errors
then this property will be `true`

##### Returns

`boolean`

#### Implementation of

[`ErrorProducer`](../interfaces/ErrorProducer.md).[`hasErrors`](../interfaces/ErrorProducer.md#haserrors)

***

### memory

#### Get Signature

> **get** **memory**(): [`MacroMemory`](MacroMemory.md)

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:34](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L34)

##### Returns

[`MacroMemory`](MacroMemory.md)

## Methods

### eval()

> **eval**(`input`): `EvalResult`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:90](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L90)

Invoke the [MacroInterpreter](MacroInterpreter.md) starting from `lines()`

#### Parameters

##### input

`string`

#### Returns

`EvalResult`

***

### evalExpr()

> **evalExpr**(`input`): `object`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:112](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L112)

Invoke the [MacroInterpreter.Expression](MacroInterpreter.md#expression) starting from `expression()`

#### Parameters

##### input

`string`

#### Returns

`object`

##### error

> **error**: `null` = `null`

##### result

> **result**: `number`

***

### evalFunctionExpr()

> **evalFunctionExpr**(`input`): `object`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:126](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L126)

Invoke the [MacroInterpreter](MacroInterpreter.md) starting from `expression()`

#### Parameters

##### input

`string`

#### Returns

`object`

##### error

> **error**: `null` = `null`

##### result

> **result**: `number`

***

### evalG10()

> **evalG10**(`input`): `object`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:100](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L100)

Run extract the G10 offsets from the results from [FanucMacroB.eval](#eval)

#### Parameters

##### input

`string`

#### Returns

`object`

##### error

> **error**: `Error`[] \| `null`

##### result

> **result**: [`PossibleG10LineValues`](../type-aliases/PossibleG10LineValues.md)

***

### evalProgram()

> **evalProgram**(`input`): `object`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:140](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L140)

Invoke the [MacroInterpreter](MacroInterpreter.md) starting from `program()`

#### Parameters

##### input

`string`

#### Returns

`object`

##### error

> **error**: `null` = `null`

##### result

> **result**: `NcProgram`

***

### getErrors()

> **getErrors**(): ([`LexingError`](../variables/Errors.md#lexingerror) \| [`ParsingError`](../variables/Errors.md#parsingerror))[]

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:63](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L63)

#### Returns

([`LexingError`](../variables/Errors.md#lexingerror) \| [`ParsingError`](../variables/Errors.md#parsingerror))[]

#### Implementation of

[`ErrorProducer`](../interfaces/ErrorProducer.md).[`getErrors`](../interfaces/ErrorProducer.md#geterrors)

***

### getSetMemoryRegisters()

> **getSetMemoryRegisters**(`opts?`): `Record`\<`number`, `number`\>

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:74](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L74)

Returns an object where the keys are variable register numbers
and the value is it's currently set value.

#### Parameters

##### opts?

`Partial`\<`GetMemoryOptions`\>

#### Returns

`Record`\<`number`, `number`\>

***

### getTokens()

> **getTokens**(): `IToken`[]

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:59](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L59)

Retrieve the internal token list

#### Returns

`IToken`[]

***

### reset()

> **reset**(): `void`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:49](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L49)

Clear internal token list, reset the Lexer and Parser, and clear the Interpreter memory

#### Returns

`void`

***

### tokenizeAndLoadParser()

> **tokenizeAndLoadParser**(`input`): `void`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:150](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L150)

#### Parameters

##### input

`string`

#### Returns

`void`
