[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / FanucMacroB

# Class: FanucMacroB

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:12](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L12)

## Implements

- [`ErrorProducer`](../interfaces/ErrorProducer.md)\<[`MacroLexerError`](../variables/Errors.md#macrolexererror) \| [`MacroParserError`](../variables/Errors.md#macroparsererror)\>

## Constructors

### new FanucMacroB()

> **new FanucMacroB**(`options`?): [`FanucMacroB`](FanucMacroB.md)

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:25](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L25)

#### Parameters

##### options?

`Partial`\<\{ `debug`: `boolean`; \}\>

#### Returns

[`FanucMacroB`](FanucMacroB.md)

## Properties

### interpreter

> **interpreter**: [`MacroInterpreter`](MacroInterpreter.md)

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:17](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L17)

***

### lexer

> **lexer**: [`MacroLexer`](MacroLexer.md)

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:15](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L15)

***

### options

> **options**: `object`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:19](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L19)

#### debug

> **debug**: `boolean` = `false`

***

### parser

> **parser**: [`MacroParser`](MacroParser.md)

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:16](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L16)

## Accessors

### hasErrors

#### Get Signature

> **get** **hasErrors**(): `boolean`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:43](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L43)

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

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:35](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L35)

##### Returns

[`MacroMemory`](MacroMemory.md)

## Methods

### eval()

> **eval**(`input`): `EvalResult`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:91](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L91)

Invoke the [MacroInterpreter](MacroInterpreter.md) starting from `lines()`

#### Parameters

##### input

`string`

#### Returns

`EvalResult`

***

### evalExpr()

> **evalExpr**(`input`): `object`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:113](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L113)

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

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:127](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L127)

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

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:101](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L101)

Run extract the G10 offsets from the results from [FanucMacroB.eval](FanucMacroB.md#eval)

#### Parameters

##### input

`string`

#### Returns

`object`

##### error

> **error**: `null` \| `Error`[]

##### result

> **result**: [`PossibleG10LineValues`](../type-aliases/PossibleG10LineValues.md)

***

### evalProgram()

> **evalProgram**(`input`): `object`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:141](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L141)

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

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:64](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L64)

#### Returns

([`LexingError`](../variables/Errors.md#lexingerror) \| [`ParsingError`](../variables/Errors.md#parsingerror))[]

#### Implementation of

[`ErrorProducer`](../interfaces/ErrorProducer.md).[`getErrors`](../interfaces/ErrorProducer.md#geterrors)

***

### getSetMemoryRegisters()

> **getSetMemoryRegisters**(`opts`?): `Record`\<`number`, `number`\>

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:75](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L75)

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

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:60](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L60)

Retrieve the internal token list

#### Returns

`IToken`[]

***

### reset()

> **reset**(): `void`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:50](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L50)

Clear internal token list, reset the Lexer and Parser, and clear the Interpreter memory

#### Returns

`void`

***

### tokenizeAndLoadParser()

> **tokenizeAndLoadParser**(`input`): `void`

Defined in: [packages/fanuc-macro-b/src/core/FanucMacroB.ts:151](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/FanucMacroB.ts#L151)

#### Parameters

##### input

`string`

#### Returns

`void`
