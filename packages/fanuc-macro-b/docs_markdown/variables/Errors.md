[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / Errors

# Variable: Errors

> `const` **Errors**: `object`

Defined in: [packages/fanuc-macro-b/src/errors/Errors.ts:5](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/Errors.ts#L5)

## Type declaration

### InputUndefined

Defined in: [packages/fanuc-macro-b/src/errors/lexer.ts:14](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/lexer.ts#L14)

#### Extends

- [`MacroLexerError`](Errors.md#macrolexererror)

#### Constructors

##### new InputUndefined()

> **new InputUndefined**(): [`InputUndefined`](Errors.md#inputundefined)

Defined in: [packages/fanuc-macro-b/src/errors/lexer.ts:15](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/lexer.ts#L15)

###### Returns

[`InputUndefined`](Errors.md#inputundefined)

###### Overrides

[`MacroLexerError`](Errors.md#macrolexererror).[`constructor`](Errors.md#constructors-4)

#### Properties

##### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`cause`](Errors.md#cause-4)

***

##### message

> **message**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1077

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`message`](Errors.md#message-6)

***

##### name

> **name**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1076

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`name`](Errors.md#name-4)

***

##### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1078

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`stack`](Errors.md#stack-4)

***

##### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

###### Parameters

###### err

`Error`

###### stackTraces

`CallSite`[]

###### Returns

`any`

###### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`prepareStackTrace`](Errors.md#preparestacktrace-4)

***

##### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:145

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`stackTraceLimit`](Errors.md#stacktracelimit-4)

#### Methods

##### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

###### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

###### Returns

`void`

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`captureStackTrace`](Errors.md#capturestacktrace-8)

### InvalidInput

Defined in: [packages/fanuc-macro-b/src/errors/lexer.ts:20](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/lexer.ts#L20)

#### Extends

- [`MacroLexerError`](Errors.md#macrolexererror)

#### Constructors

##### new InvalidInput()

> **new InvalidInput**(`o`): [`InvalidInput`](Errors.md#invalidinput)

Defined in: [packages/fanuc-macro-b/src/errors/lexer.ts:21](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/lexer.ts#L21)

###### Parameters

###### o

`unknown`

###### Returns

[`InvalidInput`](Errors.md#invalidinput)

###### Overrides

[`MacroLexerError`](Errors.md#macrolexererror).[`constructor`](Errors.md#constructors-4)

#### Properties

##### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`cause`](Errors.md#cause-4)

***

##### message

> **message**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1077

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`message`](Errors.md#message-6)

***

##### name

> **name**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1076

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`name`](Errors.md#name-4)

***

##### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1078

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`stack`](Errors.md#stack-4)

***

##### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

###### Parameters

###### err

`Error`

###### stackTraces

`CallSite`[]

###### Returns

`any`

###### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`prepareStackTrace`](Errors.md#preparestacktrace-4)

***

##### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:145

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`stackTraceLimit`](Errors.md#stacktracelimit-4)

#### Methods

##### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

###### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

###### Returns

`void`

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`captureStackTrace`](Errors.md#capturestacktrace-8)

### InvalidProgramNumber

Defined in: [packages/fanuc-macro-b/src/errors/runtime.ts:17](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/runtime.ts#L17)

#### Extends

- [`MacroRuntimeError`](Errors.md#macroruntimeerror)

#### Constructors

##### new InvalidProgramNumber()

> **new InvalidProgramNumber**(`programNumber`): [`InvalidProgramNumber`](Errors.md#invalidprogramnumber)

Defined in: [packages/fanuc-macro-b/src/errors/runtime.ts:18](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/runtime.ts#L18)

###### Parameters

###### programNumber

`string`

###### Returns

[`InvalidProgramNumber`](Errors.md#invalidprogramnumber)

###### Overrides

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`constructor`](Errors.md#constructors-6)

#### Properties

##### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`cause`](Errors.md#cause-6)

***

##### message

> **message**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1077

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`message`](Errors.md#message-12)

***

##### name

> **name**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1076

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`name`](Errors.md#name-6)

***

##### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1078

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`stack`](Errors.md#stack-6)

***

##### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

###### Parameters

###### err

`Error`

###### stackTraces

`CallSite`[]

###### Returns

`any`

###### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`prepareStackTrace`](Errors.md#preparestacktrace-6)

***

##### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:145

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`stackTraceLimit`](Errors.md#stacktracelimit-6)

#### Methods

##### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

###### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

###### Returns

`void`

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`captureStackTrace`](Errors.md#capturestacktrace-12)

### LexingError

Defined in: [packages/fanuc-macro-b/src/errors/lexer.ts:7](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/lexer.ts#L7)

#### Extends

- [`MacroLexerError`](Errors.md#macrolexererror)

#### Constructors

##### new LexingError()

> **new LexingError**(`err`): [`LexingError`](Errors.md#lexingerror)

Defined in: [packages/fanuc-macro-b/src/errors/lexer.ts:8](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/lexer.ts#L8)

###### Parameters

###### err

`ILexingError`

###### Returns

[`LexingError`](Errors.md#lexingerror)

###### Overrides

[`MacroLexerError`](Errors.md#macrolexererror).[`constructor`](Errors.md#constructors-4)

#### Properties

##### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`cause`](Errors.md#cause-4)

***

##### message

> **message**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1077

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`message`](Errors.md#message-6)

***

##### name

> **name**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1076

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`name`](Errors.md#name-4)

***

##### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1078

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`stack`](Errors.md#stack-4)

***

##### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

###### Parameters

###### err

`Error`

###### stackTraces

`CallSite`[]

###### Returns

`any`

###### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`prepareStackTrace`](Errors.md#preparestacktrace-4)

***

##### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:145

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`stackTraceLimit`](Errors.md#stacktracelimit-4)

#### Methods

##### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

###### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

###### Returns

`void`

###### Inherited from

[`MacroLexerError`](Errors.md#macrolexererror).[`captureStackTrace`](Errors.md#capturestacktrace-8)

### MacroLexerError

Defined in: [packages/fanuc-macro-b/src/errors/lexer.ts:3](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/lexer.ts#L3)

#### Extends

- `Error`

#### Extended by

- [`LexingError`](Errors.md#lexingerror)
- [`InputUndefined`](Errors.md#inputundefined)
- [`InvalidInput`](Errors.md#invalidinput)

#### Constructors

##### new MacroLexerError()

> **new MacroLexerError**(`message`?): [`MacroLexerError`](Errors.md#macrolexererror)

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1082

###### Parameters

###### message?

`string`

###### Returns

[`MacroLexerError`](Errors.md#macrolexererror)

###### Inherited from

`Error.constructor`

##### new MacroLexerError()

> **new MacroLexerError**(`message`?, `options`?): [`MacroLexerError`](Errors.md#macrolexererror)

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1082

###### Parameters

###### message?

`string`

###### options?

`ErrorOptions`

###### Returns

[`MacroLexerError`](Errors.md#macrolexererror)

###### Inherited from

`Error.constructor`

#### Properties

##### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

###### Inherited from

`Error.cause`

***

##### message

> **message**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1077

###### Inherited from

`Error.message`

***

##### name

> **name**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1076

###### Inherited from

`Error.name`

***

##### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1078

###### Inherited from

`Error.stack`

***

##### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

###### Parameters

###### err

`Error`

###### stackTraces

`CallSite`[]

###### Returns

`any`

###### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

###### Inherited from

`Error.prepareStackTrace`

***

##### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:145

###### Inherited from

`Error.stackTraceLimit`

#### Methods

##### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

###### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

###### Returns

`void`

###### Inherited from

`Error.captureStackTrace`

### MacroParserError

Defined in: [packages/fanuc-macro-b/src/errors/parser.ts:3](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/parser.ts#L3)

#### Extends

- `Error`

#### Extended by

- [`ParsingError`](Errors.md#parsingerror)

#### Constructors

##### new MacroParserError()

> **new MacroParserError**(`message`?): [`MacroParserError`](Errors.md#macroparsererror)

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1082

###### Parameters

###### message?

`string`

###### Returns

[`MacroParserError`](Errors.md#macroparsererror)

###### Inherited from

`Error.constructor`

##### new MacroParserError()

> **new MacroParserError**(`message`?, `options`?): [`MacroParserError`](Errors.md#macroparsererror)

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1082

###### Parameters

###### message?

`string`

###### options?

`ErrorOptions`

###### Returns

[`MacroParserError`](Errors.md#macroparsererror)

###### Inherited from

`Error.constructor`

#### Properties

##### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

###### Inherited from

`Error.cause`

***

##### message

> **message**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1077

###### Inherited from

`Error.message`

***

##### name

> **name**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1076

###### Inherited from

`Error.name`

***

##### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1078

###### Inherited from

`Error.stack`

***

##### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

###### Parameters

###### err

`Error`

###### stackTraces

`CallSite`[]

###### Returns

`any`

###### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

###### Inherited from

`Error.prepareStackTrace`

***

##### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:145

###### Inherited from

`Error.stackTraceLimit`

#### Methods

##### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

###### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

###### Returns

`void`

###### Inherited from

`Error.captureStackTrace`

### MacroRuntimeError

Defined in: [packages/fanuc-macro-b/src/errors/runtime.ts:1](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/runtime.ts#L1)

#### Extends

- `Error`

#### Extended by

- [`NoActiveProgram`](Errors.md#noactiveprogram)
- [`ProgramNumberNotFound`](Errors.md#programnumbernotfound)
- [`InvalidProgramNumber`](Errors.md#invalidprogramnumber)

#### Constructors

##### new MacroRuntimeError()

> **new MacroRuntimeError**(`message`?): [`MacroRuntimeError`](Errors.md#macroruntimeerror)

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1082

###### Parameters

###### message?

`string`

###### Returns

[`MacroRuntimeError`](Errors.md#macroruntimeerror)

###### Inherited from

`Error.constructor`

##### new MacroRuntimeError()

> **new MacroRuntimeError**(`message`?, `options`?): [`MacroRuntimeError`](Errors.md#macroruntimeerror)

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1082

###### Parameters

###### message?

`string`

###### options?

`ErrorOptions`

###### Returns

[`MacroRuntimeError`](Errors.md#macroruntimeerror)

###### Inherited from

`Error.constructor`

#### Properties

##### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

###### Inherited from

`Error.cause`

***

##### message

> **message**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1077

###### Inherited from

`Error.message`

***

##### name

> **name**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1076

###### Inherited from

`Error.name`

***

##### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1078

###### Inherited from

`Error.stack`

***

##### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

###### Parameters

###### err

`Error`

###### stackTraces

`CallSite`[]

###### Returns

`any`

###### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

###### Inherited from

`Error.prepareStackTrace`

***

##### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:145

###### Inherited from

`Error.stackTraceLimit`

#### Methods

##### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

###### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

###### Returns

`void`

###### Inherited from

`Error.captureStackTrace`

### NoActiveProgram

Defined in: [packages/fanuc-macro-b/src/errors/runtime.ts:5](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/runtime.ts#L5)

#### Extends

- [`MacroRuntimeError`](Errors.md#macroruntimeerror)

#### Constructors

##### new NoActiveProgram()

> **new NoActiveProgram**(): [`NoActiveProgram`](Errors.md#noactiveprogram)

Defined in: [packages/fanuc-macro-b/src/errors/runtime.ts:6](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/runtime.ts#L6)

###### Returns

[`NoActiveProgram`](Errors.md#noactiveprogram)

###### Overrides

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`constructor`](Errors.md#constructors-6)

#### Properties

##### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`cause`](Errors.md#cause-6)

***

##### message

> **message**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1077

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`message`](Errors.md#message-12)

***

##### name

> **name**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1076

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`name`](Errors.md#name-6)

***

##### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1078

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`stack`](Errors.md#stack-6)

***

##### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

###### Parameters

###### err

`Error`

###### stackTraces

`CallSite`[]

###### Returns

`any`

###### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`prepareStackTrace`](Errors.md#preparestacktrace-6)

***

##### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:145

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`stackTraceLimit`](Errors.md#stacktracelimit-6)

#### Methods

##### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

###### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

###### Returns

`void`

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`captureStackTrace`](Errors.md#capturestacktrace-12)

### ParsingError

Defined in: [packages/fanuc-macro-b/src/errors/parser.ts:7](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/parser.ts#L7)

#### Extends

- [`MacroParserError`](Errors.md#macroparsererror)

#### Constructors

##### new ParsingError()

> **new ParsingError**(`err`): [`ParsingError`](Errors.md#parsingerror)

Defined in: [packages/fanuc-macro-b/src/errors/parser.ts:8](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/parser.ts#L8)

###### Parameters

###### err

`IRecognitionException`

###### Returns

[`ParsingError`](Errors.md#parsingerror)

###### Overrides

[`MacroParserError`](Errors.md#macroparsererror).[`constructor`](Errors.md#constructors-5)

#### Properties

##### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

###### Inherited from

[`MacroParserError`](Errors.md#macroparsererror).[`cause`](Errors.md#cause-5)

***

##### message

> **message**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1077

###### Inherited from

[`MacroParserError`](Errors.md#macroparsererror).[`message`](Errors.md#message-9)

***

##### name

> **name**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1076

###### Inherited from

[`MacroParserError`](Errors.md#macroparsererror).[`name`](Errors.md#name-5)

***

##### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1078

###### Inherited from

[`MacroParserError`](Errors.md#macroparsererror).[`stack`](Errors.md#stack-5)

***

##### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

###### Parameters

###### err

`Error`

###### stackTraces

`CallSite`[]

###### Returns

`any`

###### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

###### Inherited from

[`MacroParserError`](Errors.md#macroparsererror).[`prepareStackTrace`](Errors.md#preparestacktrace-5)

***

##### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:145

###### Inherited from

[`MacroParserError`](Errors.md#macroparsererror).[`stackTraceLimit`](Errors.md#stacktracelimit-5)

#### Methods

##### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

###### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

###### Returns

`void`

###### Inherited from

[`MacroParserError`](Errors.md#macroparsererror).[`captureStackTrace`](Errors.md#capturestacktrace-10)

### ProgramNumberNotFound

Defined in: [packages/fanuc-macro-b/src/errors/runtime.ts:11](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/runtime.ts#L11)

#### Extends

- [`MacroRuntimeError`](Errors.md#macroruntimeerror)

#### Constructors

##### new ProgramNumberNotFound()

> **new ProgramNumberNotFound**(`programNumber`): [`ProgramNumberNotFound`](Errors.md#programnumbernotfound)

Defined in: [packages/fanuc-macro-b/src/errors/runtime.ts:12](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/errors/runtime.ts#L12)

###### Parameters

###### programNumber

`null` | `string` | `number`

###### Returns

[`ProgramNumberNotFound`](Errors.md#programnumbernotfound)

###### Overrides

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`constructor`](Errors.md#constructors-6)

#### Properties

##### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`cause`](Errors.md#cause-6)

***

##### message

> **message**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1077

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`message`](Errors.md#message-12)

***

##### name

> **name**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1076

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`name`](Errors.md#name-6)

***

##### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.2/node\_modules/typescript/lib/lib.es5.d.ts:1078

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`stack`](Errors.md#stack-6)

***

##### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

###### Parameters

###### err

`Error`

###### stackTraces

`CallSite`[]

###### Returns

`any`

###### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`prepareStackTrace`](Errors.md#preparestacktrace-6)

***

##### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:145

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`stackTraceLimit`](Errors.md#stacktracelimit-6)

#### Methods

##### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/.pnpm/@types+node@22.10.6/node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

###### Parameters

###### targetObject

`object`

###### constructorOpt?

`Function`

###### Returns

`void`

###### Inherited from

[`MacroRuntimeError`](Errors.md#macroruntimeerror).[`captureStackTrace`](Errors.md#capturestacktrace-12)
