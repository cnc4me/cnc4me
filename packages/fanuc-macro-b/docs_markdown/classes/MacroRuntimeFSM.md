[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / MacroRuntimeFSM

# Class: MacroRuntimeFSM

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:32](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L32)

## Extends

- `StateMachine`\<`States`, `Events`\>

## Constructors

### new MacroRuntimeFSM()

> **new MacroRuntimeFSM**(`callbacks`?): [`MacroRuntimeFSM`](MacroRuntimeFSM.md)

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:44](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L44)

#### Parameters

##### callbacks?

`Partial`\<`StateHandlerMap`\<`"finished"` \| `"error"` \| `"stopped"` \| `"paused"` \| `"running"`\>\>

#### Returns

[`MacroRuntimeFSM`](MacroRuntimeFSM.md)

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

> **callbacks**: `StateHandlerMap`\<`"finished"` \| `"error"` \| `"stopped"` \| `"paused"` \| `"running"`\>

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:36](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L36)

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

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:34](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L34)

***

### STATES

> `static` **STATES**: *typeof* `States` = `States`

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:33](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L33)

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

• **E** *extends* `Events`

#### Parameters

##### event

[`E`](AxisFSM.html#dispatche)

##### args

...`Parameters`\<`Record`\<`Events`, `Callback`\>\[[`E`](AxisFSM.html#dispatche)\]\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StateMachine.dispatch`

***

### getNextState()

> **getNextState**(`event`): `undefined` \| `States`

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:22

#### Parameters

##### event

`Events`

#### Returns

`undefined` \| `States`

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

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:76](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L76)

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

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:85](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L85)

#### Type Parameters

• **T** *extends* `"finished"` \| `"error"` \| `"stopped"` \| `"paused"` \| `"running"`

#### Parameters

##### stateName

[`T`](MacroRuntimeFSM.html#ont)

##### callback

`NonNullable`\<`Callback`\>

#### Returns

`void`

***

### toMermaid()

> **toMermaid**(`title`?): `string`

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

Defined in: [packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts:80](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/MacroRuntimeFSM.ts#L80)

#### Parameters

##### event

`"error"` | `"start"` | `"stop"` | `"pause"` | `"resume"` | `"reset"` | `"finish"`

#### Returns

`Promise`\<`void`\>
