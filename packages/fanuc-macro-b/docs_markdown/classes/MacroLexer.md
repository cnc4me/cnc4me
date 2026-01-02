[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / MacroLexer

# Class: MacroLexer

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:8](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroLexer.ts#L8)

## Implements

- [`ErrorProducer`](../interfaces/ErrorProducer.md)\<[`LexingError`](../variables/Errors.md#lexingerror)\>

## Constructors

### Constructor

> **new MacroLexer**(): `MacroLexer`

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:13](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroLexer.ts#L13)

#### Returns

`MacroLexer`

## Accessors

### definitionErrors

#### Get Signature

> **get** **definitionErrors**(): `ILexerDefinitionError`[]

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:31](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroLexer.ts#L31)

##### Returns

`ILexerDefinitionError`[]

***

### hasErrors

#### Get Signature

> **get** **hasErrors**(): `boolean`

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:27](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroLexer.ts#L27)

##### Returns

`boolean`

#### Implementation of

[`ErrorProducer`](../interfaces/ErrorProducer.md).[`hasErrors`](../interfaces/ErrorProducer.md#haserrors)

***

### hasTokens

#### Get Signature

> **get** **hasTokens**(): `boolean`

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:23](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroLexer.ts#L23)

##### Returns

`boolean`

## Methods

### getErrors()

> **getErrors**(): [`LexingError`](../variables/Errors.md#lexingerror)[]

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:55](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroLexer.ts#L55)

#### Returns

[`LexingError`](../variables/Errors.md#lexingerror)[]

#### Implementation of

[`ErrorProducer`](../interfaces/ErrorProducer.md).[`getErrors`](../interfaces/ErrorProducer.md#geterrors)

***

### getGroups()

> **getGroups**(): `object`

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:47](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroLexer.ts#L47)

#### Returns

`object`

***

### getTokens()

> **getTokens**(): `IToken`[]

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:51](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroLexer.ts#L51)

#### Returns

`IToken`[]

***

### reset()

> **reset**(): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:59](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroLexer.ts#L59)

#### Returns

`void`

***

### tokenize()

> **tokenize**(`input`, `initialMode?`): `IToken`[]

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:35](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroLexer.ts#L35)

#### Parameters

##### input

`string`

##### initialMode?

`string`

#### Returns

`IToken`[]
