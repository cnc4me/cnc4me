[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / MacroRuntime

# Class: MacroRuntime

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:33](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L33)

MacroRuntime Class to hold multiple programs in memory

## Implements

- [`ErrorProducer`](../interfaces/ErrorProducer.md)\<[`MacroCombinedError`](../type-aliases/MacroCombinedError.md)\>

## Constructors

### Constructor

> **new MacroRuntime**(`config?`): `MacroRuntime`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:60](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L60)

#### Parameters

##### config?

`Partial`\<[`MacroRuntimeConfig`](../interfaces/MacroRuntimeConfig.md)\>

#### Returns

`MacroRuntime`

## Properties

### on()

> **on**: \<`Name`\>(`eventName`, `listener`, `options?`) => `UnsubscribeFunction`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:103](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L103)

Subscribe to one or more events.

Using the same listener multiple times for the same event will result in only one method call per emitted event.

#### Type Parameters

##### Name

`Name` *extends* keyof OmnipresentEventData \| `"MACHINE:FAULT"` \| `"MACHINE:RESET"` \| `"MACHINE:TRAVELING"` \| `"MACHINE:MOTION_COMPLETE"` \| `"INTERPRETER:LINE"` \| `"INTERPRETER:END_OF_PROGRAM"` \| `"ERROR"`

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

### EVENTS

> `static` **EVENTS**: [`PrefixObjectKeys`](../type-aliases/PrefixObjectKeys.md)\<`"MACHINE"`, `Omit`\<`AxisFsmEvents`, `"MOTION_COMPLETE"`\> & `object`\> & [`PrefixObjectKeys`](../type-aliases/PrefixObjectKeys.md)\<`"INTERPRETER"`, \{ `END_OF_PROGRAM`: `undefined`; `LINE`: [`IParsedLineData`](../interfaces/IParsedLineData.md); \}\> & `object`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:34](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L34)

#### Type Declaration

##### ERROR

> **ERROR**: `Error`

## Accessors

### hasErrors

#### Get Signature

> **get** **hasErrors**(): `boolean`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:99](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L99)

##### Returns

`boolean`

#### Implementation of

[`ErrorProducer`](../interfaces/ErrorProducer.md).[`hasErrors`](../interfaces/ErrorProducer.md#haserrors)

***

### Interpreter

#### Get Signature

> **get** **Interpreter**(): [`MacroInterpreter`](MacroInterpreter.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:87](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L87)

##### Returns

[`MacroInterpreter`](MacroInterpreter.md)

***

### Lexer

#### Get Signature

> **get** **Lexer**(): [`MacroLexer`](MacroLexer.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:79](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L79)

##### Returns

[`MacroLexer`](MacroLexer.md)

***

### Machine

#### Get Signature

> **get** **Machine**(): [`CncMachine`](CncMachine.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:95](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L95)

##### Returns

[`CncMachine`](CncMachine.md)

***

### Memory

#### Get Signature

> **get** **Memory**(): [`MacroMemory`](MacroMemory.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:91](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L91)

##### Returns

[`MacroMemory`](MacroMemory.md)

***

### Parser

#### Get Signature

> **get** **Parser**(): [`MacroParser`](MacroParser.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:83](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L83)

##### Returns

[`MacroParser`](MacroParser.md)

## Methods

### configure()

> **configure**(`config?`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:114](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L114)

#### Parameters

##### config?

`Partial`\<[`MacroRuntimeConfig`](../interfaces/MacroRuntimeConfig.md)\>

#### Returns

`void`

***

### getActiveProgram()

> **getActiveProgram**(): `string`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:248](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L248)

Return the active program content.

#### Returns

`string`

***

### getActiveProgramNumber()

> **getActiveProgramNumber**(): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:257](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L257)

Return the active program nmber.

#### Returns

`number`

***

### getErrorMessages()

> **getErrorMessages**(): `string`[]

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:271](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L271)

Retrieve a record of errors

#### Returns

`string`[]

***

### getErrors()

> **getErrors**(): ([`LexingError`](../variables/Errors.md#lexingerror) \| [`ParsingError`](../variables/Errors.md#parsingerror))[]

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:128](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L128)

#### Returns

([`LexingError`](../variables/Errors.md#lexingerror) \| [`ParsingError`](../variables/Errors.md#parsingerror))[]

#### Implementation of

[`ErrorProducer`](../interfaces/ErrorProducer.md).[`getErrors`](../interfaces/ErrorProducer.md#geterrors)

***

### getInsights()

> **getInsights**(): `InsightCollection`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:141](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L141)

#### Returns

`InsightCollection`

***

### getProgram()

> **getProgram**(`programNumber`): `string`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:283](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L283)

Return a program by number if loaded in memory.

#### Parameters

##### programNumber

`string` | `number`

#### Returns

`string`

***

### getProgramCount()

> **getProgramCount**(): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:155](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L155)

Count of loaded programs.

#### Returns

`number`

***

### getPrograms()

> **getPrograms**(): `Record`\<`number`, `string`\>

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:148](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L148)

Returns the loaded programs indexed by their program numbers.

#### Returns

`Record`\<`number`, `string`\>

***

### loadProgram()

> **loadProgram**(`input`, `options?`): `this`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:206](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L206)

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

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:190](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L190)

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

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:264](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L264)

Register a function to handle errors that occur in the runtime.

#### Parameters

##### handler

(`eventData`) => `void`

#### Returns

`UnsubscribeFunction`

***

### programIsLoaded()

> **programIsLoaded**(`programNumber`): `boolean`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:229](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L229)

Check if a program has been loaded and exists in the runtime.

#### Parameters

##### programNumber

`number` | `null`

#### Returns

`boolean`

***

### readRegister()

> **readRegister**(`register`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:137](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L137)

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

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:108](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L108)

Reset the runtime

#### Returns

`void`

***

### run()

> **run**(`lineCallback?`): `NcProgram` \| `undefined`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:162](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L162)

Main entry point to the runtime.

#### Parameters

##### lineCallback?

(`line`) => `void`

#### Returns

`NcProgram` \| `undefined`

***

### setActiveProgram()

> **setActiveProgram**(`programNumber`): `this`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:237](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L237)

Set a program number as `active` in the runtime.

#### Parameters

##### programNumber

`number`

#### Returns

`this`

***

### create()

> `static` **create**(`opts?`): `MacroRuntime`

Defined in: [packages/fanuc-macro-b/src/core/MacroRuntime.ts:46](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroRuntime.ts#L46)

#### Parameters

##### opts?

`Partial`\<[`MacroRuntimeConfig`](../interfaces/MacroRuntimeConfig.md)\> & `object`

#### Returns

`MacroRuntime`
