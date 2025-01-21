[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / MacroLexer

# Class: MacroLexer

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:10](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroLexer.ts#L10)

## Implements

- [`ErrorProducer`](../interfaces/ErrorProducer.md)\<[`LexingError`](../variables/Errors.md#lexingerror)\>

## Constructors

### new MacroLexer()

> **new MacroLexer**(): [`MacroLexer`](MacroLexer.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:15](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroLexer.ts#L15)

#### Returns

[`MacroLexer`](MacroLexer.md)

## Accessors

### definitionErrors

#### Get Signature

> **get** **definitionErrors**(): `ILexerDefinitionError`[]

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:33](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroLexer.ts#L33)

##### Returns

`ILexerDefinitionError`[]

***

### hasErrors

#### Get Signature

> **get** **hasErrors**(): `boolean`

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:29](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroLexer.ts#L29)

##### Returns

`boolean`

#### Implementation of

[`ErrorProducer`](../interfaces/ErrorProducer.md).[`hasErrors`](../interfaces/ErrorProducer.md#haserrors)

***

### hasTokens

#### Get Signature

> **get** **hasTokens**(): `boolean`

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:25](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroLexer.ts#L25)

##### Returns

`boolean`

## Methods

### getErrors()

> **getErrors**(): [`LexingError`](../variables/Errors.md#lexingerror)[]

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:57](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroLexer.ts#L57)

#### Returns

[`LexingError`](../variables/Errors.md#lexingerror)[]

#### Implementation of

[`ErrorProducer`](../interfaces/ErrorProducer.md).[`getErrors`](../interfaces/ErrorProducer.md#geterrors)

***

### getGroups()

> **getGroups**(): `object`

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:49](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroLexer.ts#L49)

#### Returns

`object`

***

### getTokens()

> **getTokens**(): `IToken`[]

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:53](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroLexer.ts#L53)

#### Returns

`IToken`[]

***

### reset()

> **reset**(): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:61](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroLexer.ts#L61)

#### Returns

`void`

***

### tokenize()

> **tokenize**(`input`, `initialMode`?): `IToken`[]

Defined in: [packages/fanuc-macro-b/src/core/MacroLexer.ts:37](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroLexer.ts#L37)

#### Parameters

##### input

`string`

##### initialMode?

`string`

#### Returns

`IToken`[]
