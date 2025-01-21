[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / MacroRuntime

# Class: MacroRuntime

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:35](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L35)

MacroRuntime Class to hold multiple programs in memory

## Implements

- [`ErrorProducer`](../interfaces/ErrorProducer.md)\<[`MacroCombinedError`](../type-aliases/MacroCombinedError.md)\>

## Constructors

### new MacroRuntime()

> **new MacroRuntime**(`config`?): [`MacroRuntime`](MacroRuntime.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:48](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L48)

#### Parameters

##### config?

`Partial`\<[`MacroRuntimeConfig`](../interfaces/MacroRuntimeConfig.md)\>

#### Returns

[`MacroRuntime`](MacroRuntime.md)

## Properties

### on()

> **on**: \<`Name`\>(`eventName`, `listener`) => `UnsubscribeFunction`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:91](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L91)

Subscribe to one or more events.

Using the same listener multiple times for the same event will result in only one method call per emitted event.

#### Type Parameters

• **Name** *extends* keyof OmnipresentEventData \| `"MACHINE:FAULT"` \| `"MACHINE:RESET"` \| `"MACHINE:TRAVELING"` \| `"MACHINE:MOTION_COMPLETE"` \| `"INTERPRETER:LINE"` \| `"INTERPRETER:END_OF_PROGRAM"` \| `"ERROR"`

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

### EVENTS

> `static` **EVENTS**: [`PrefixObjectKeys`](../type-aliases/PrefixObjectKeys.md)\<`"MACHINE"`, `Omit`\<`AxisFsmEvents`, `"MOTION_COMPLETE"`\> & `object`\> & [`PrefixObjectKeys`](../type-aliases/PrefixObjectKeys.md)\<`"INTERPRETER"`, \{ `END_OF_PROGRAM`: `undefined`; `LINE`: [`IParsedLineData`](../interfaces/IParsedLineData.md); \}\> & `object`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:36](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L36)

#### Type declaration

##### ERROR

> **ERROR**: `Error`

## Accessors

### hasErrors

#### Get Signature

> **get** **hasErrors**(): `boolean`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:87](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L87)

##### Returns

`boolean`

#### Implementation of

[`ErrorProducer`](../interfaces/ErrorProducer.md).[`hasErrors`](../interfaces/ErrorProducer.md#haserrors)

***

### Interpreter

#### Get Signature

> **get** **Interpreter**(): [`MacroInterpreter`](MacroInterpreter.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:75](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L75)

##### Returns

[`MacroInterpreter`](MacroInterpreter.md)

***

### Lexer

#### Get Signature

> **get** **Lexer**(): [`MacroLexer`](MacroLexer.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:67](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L67)

##### Returns

[`MacroLexer`](MacroLexer.md)

***

### Machine

#### Get Signature

> **get** **Machine**(): [`CncMachine`](CncMachine.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:83](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L83)

##### Returns

[`CncMachine`](CncMachine.md)

***

### Memory

#### Get Signature

> **get** **Memory**(): [`MacroMemory`](MacroMemory.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:79](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L79)

##### Returns

[`MacroMemory`](MacroMemory.md)

***

### Parser

#### Get Signature

> **get** **Parser**(): [`MacroParser`](MacroParser.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:71](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L71)

##### Returns

[`MacroParser`](MacroParser.md)

## Methods

### getActiveProgram()

> **getActiveProgram**(): `string`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:222](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L222)

Return the active program content.

#### Returns

`string`

***

### getActiveProgramNumber()

> **getActiveProgramNumber**(): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:231](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L231)

Return the active program nmber.

#### Returns

`number`

***

### getErrorMessages()

> **getErrorMessages**(): `string`[]

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:245](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L245)

Retrieve a record of errors

#### Returns

`string`[]

***

### getErrors()

> **getErrors**(): ([`LexingError`](../variables/Errors.md#lexingerror) \| [`ParsingError`](../variables/Errors.md#parsingerror))[]

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:102](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L102)

#### Returns

([`LexingError`](../variables/Errors.md#lexingerror) \| [`ParsingError`](../variables/Errors.md#parsingerror))[]

#### Implementation of

[`ErrorProducer`](../interfaces/ErrorProducer.md).[`getErrors`](../interfaces/ErrorProducer.md#geterrors)

***

### getInsights()

> **getInsights**(): `InsightCollection`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:115](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L115)

#### Returns

`InsightCollection`

***

### getProgram()

> **getProgram**(`programNumber`): `string`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:257](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L257)

Return a program by number if loaded in memory.

#### Parameters

##### programNumber

`string` | `number`

#### Returns

`string`

***

### getProgramCount()

> **getProgramCount**(): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:129](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L129)

Count of loaded programs.

#### Returns

`number`

***

### getPrograms()

> **getPrograms**(): `Record`\<`number`, `string`\>

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:122](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L122)

Returns the loaded programs indexed by their program numbers.

#### Returns

`Record`\<`number`, `string`\>

***

### loadProgram()

> **loadProgram**(`input`, `options`?): `this`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:180](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L180)

Load a Program into memory

This method can create a program if given a string

#### Parameters

##### input

`string`

##### options?

[`ProgramLoadOptions`](../interfaces/ProgramLoadOptions.md)

#### Returns

`this`

***

### mdi()

> **mdi**(...`input`): `this`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:164](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L164)

Manual Data Input

This method can be used to run a "program" by wrapping it
with `%` delimiters and a special program number.

#### Parameters

##### input

...`string`[]

#### Returns

`this`

***

### onError()

> **onError**(`handler`): `UnsubscribeFunction`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:238](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L238)

Register a function to handle errors that occur in the runtime.

#### Parameters

##### handler

(`eventData`) => `void`

#### Returns

`UnsubscribeFunction`

***

### programIsLoaded()

> **programIsLoaded**(`programNumber`): `boolean`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:203](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L203)

Check if a program has been loaded and exists in the runtime.

#### Parameters

##### programNumber

`null` | `number`

#### Returns

`boolean`

***

### readRegister()

> **readRegister**(`register`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:111](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L111)

Read a variable from memory

#### Parameters

##### register

`number`

#### Returns

`number`

#### Example

```ts
readRegister(1) to read the value of "#1"
```

***

### reset()

> **reset**(): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:96](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L96)

Reset the runtime

#### Returns

`void`

***

### run()

> **run**(`lineCallback`?): `undefined` \| `NcProgram`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:136](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L136)

Main entry point to the runtime.

#### Parameters

##### lineCallback?

(`line`) => `void`

#### Returns

`undefined` \| `NcProgram`

***

### setActiveProgram()

> **setActiveProgram**(`programNumber`): `this`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:211](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L211)

Set a program number as `active` in the runtime.

#### Parameters

##### programNumber

`number`

#### Returns

`this`
