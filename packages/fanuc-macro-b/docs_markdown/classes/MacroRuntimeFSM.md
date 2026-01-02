[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / MacroRuntimeFSM

# Class: MacroRuntimeFSM

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:30](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L30)

## Extends

- `StateMachine`\<`States`, `Events`\>

## Constructors

### Constructor

> **new MacroRuntimeFSM**(`callbacks?`): `MacroRuntimeFSM`

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:42](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L42)

#### Parameters

##### callbacks?

`Partial`\<`StateHandlerMap`\<`"finished"` \| `"error"` \| `"stopped"` \| `"paused"` \| `"running"`\>\>

#### Returns

`MacroRuntimeFSM`

#### Overrides

`StateMachine<States, Events>.constructor`

## Properties

### \_current

> `protected` **\_current**: `States`

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:17

#### Inherited from

`StateMachine._current`

***

### callbacks

> **callbacks**: `StateHandlerMap`\<`StateName`\>

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:34](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L34)

***

### init

> `protected` **init**: `States`

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:14

#### Inherited from

`StateMachine.init`

***

### logger

> `protected` `readonly` **logger**: `ILogger`

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:16

#### Inherited from

`StateMachine.logger`

***

### transitions

> `protected` **transitions**: `ITransition`\<`States`, `Events`, `Callback`\>[]

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:15

#### Inherited from

`StateMachine.transitions`

***

### EVENTS

> `static` **EVENTS**: *typeof* `Events` = `Events`

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:32](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L32)

***

### STATES

> `static` **STATES**: *typeof* `States` = `States`

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:31](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L31)

## Methods

### addTransitions()

> **addTransitions**(`transitions`): `void`

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:19

#### Parameters

##### transitions

`ITransition`\<`States`, `Events`, `Callback`\>[]

#### Returns

`void`

#### Inherited from

`StateMachine.addTransitions`

***

### can()

> **can**(`event`): `boolean`

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:21

#### Parameters

##### event

`Events`

#### Returns

`boolean`

#### Inherited from

`StateMachine.can`

***

### dispatch()

> **dispatch**\<`E`\>(`event`, ...`args`): `Promise`\<`void`\>

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:24

#### Type Parameters

##### E

`E` *extends* `Events`

#### Parameters

##### event

`E`

##### args

...`Parameters`\<`Record`\<`Events`, `Callback`\>\[`E`\]\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StateMachine.dispatch`

***

### getNextState()

> **getNextState**(`event`): `States` \| `undefined`

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:22

#### Parameters

##### event

`Events`

#### Returns

`States` \| `undefined`

#### Inherited from

`StateMachine.getNextState`

***

### getState()

> **getState**(): `States`

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:20

#### Returns

`States`

#### Inherited from

`StateMachine.getState`

***

### getTransitions()

> **getTransitions**(): `ITransition`\<`States`, `Events`, `Callback`\>[]

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:74](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L74)

#### Returns

`ITransition`\<`States`, `Events`, `Callback`\>[]

***

### isFinal()

> **isFinal**(): `boolean`

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:23

#### Returns

`boolean`

#### Inherited from

`StateMachine.isFinal`

***

### on()

> **on**\<`T`\>(`stateName`, `callback`): `void`

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:83](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L83)

#### Type Parameters

##### T

`T` *extends* `"finished"` \| `"error"` \| `"stopped"` \| `"paused"` \| `"running"`

#### Parameters

##### stateName

`T`

##### callback

`NonNullable`\<`Callback`\>

#### Returns

`void`

***

### toMermaid()

> **toMermaid**(`title?`): `string`

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:28

Generate a Mermaid StateDiagram of the current machine.

#### Parameters

##### title?

`string`

#### Returns

`string`

#### Inherited from

`StateMachine.toMermaid`

***

### trigger()

> **trigger**(`event`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:78](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L78)

#### Parameters

##### event

`"error"` | `"start"` | `"stop"` | `"pause"` | `"resume"` | `"reset"` | `"finish"`

#### Returns

`Promise`\<`void`\>
