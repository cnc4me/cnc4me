[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / AxisFSM

# Class: AxisFSM

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:44](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L44)

## Extends

- `StateMachine`\<`States`, `Events`, `ICallbacks`\>

## Constructors

### Constructor

> **new AxisFSM**(`label`, `config`): `AxisFSM`

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:58](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L58)

#### Parameters

##### label

`AxisLabel`

##### config

`AxisFsmConfig`

#### Returns

`AxisFSM`

#### Overrides

`StateMachine<States, Events, ICallbacks>.constructor`

## Properties

### \_current

> `protected` **\_current**: `States`

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:17

#### Inherited from

`StateMachine._current`

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

### on()

> **on**: \<`Name`\>(`eventName`, `listener`, `options?`) => `UnsubscribeFunction`

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:106](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L106)

Subscribe to one or more events.

Using the same listener multiple times for the same event will result in only one method call per emitted event.

#### Type Parameters

##### Name

`Name` *extends* keyof OmnipresentEventData \| keyof AxisFsmEvents

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

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:107](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L107)

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

### transitions

> `protected` **transitions**: `ITransition`\<`States`, `Events`, `Callback` \| (`command`) => `Promise`\<`void`\> \| (`message`) => `void`\>[]

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:15

#### Inherited from

`StateMachine.transitions`

## Accessors

### limits

#### Get Signature

> **get** **limits**(): `AxisLimits`

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:94](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L94)

##### Returns

`AxisLimits`

***

### position

#### Get Signature

> **get** **position**(): `number`

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:98](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L98)

##### Returns

`number`

## Methods

### addTransitions()

> **addTransitions**(`transitions`): `void`

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:19

#### Parameters

##### transitions

`ITransition`\<`States`, `Events`, `Callback` \| (`command`) => `Promise`\<`void`\> \| (`message`) => `void`\>[]

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

...`Parameters`\<`ICallbacks`\[`E`\]\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StateMachine.dispatch`

***

### G0()

> **G0**(`position`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:143](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L143)

Rapid Move

#### Parameters

##### position

`number`

#### Returns

`Promise`\<`void`\>

***

### G1()

> **G1**(`position`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:152](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L152)

Feed Move

#### Parameters

##### position

`number`

#### Returns

`Promise`\<`void`\>

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

### is()

> **is**(`state`): `boolean`

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:118](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L118)

Generic state testing method

#### Parameters

##### state

`"Idle"` | `"Fault"` | `"Traveling"`

#### Returns

`boolean`

***

### isFinal()

> **isFinal**(): `boolean`

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:23

#### Returns

`boolean`

#### Inherited from

`StateMachine.isFinal`

***

### isValidPosition()

> **isValidPosition**(`position`): `boolean`

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:122](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L122)

#### Parameters

##### position

`number`

#### Returns

`boolean`

***

### moveTo()

> **moveTo**(`position`, `command`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:136](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L136)

#### Parameters

##### position

`number`

##### command

`MotionType` = `"G0"`

#### Returns

`Promise`\<`void`\>

***

### reset()

> **reset**(): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:128](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L128)

#### Returns

`Promise`\<`void`\>

***

### setConfig()

> **setConfig**(`opts`): `void`

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:158](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L158)

#### Parameters

##### opts

`Partial`\<`AxisFsmConfig`\>

#### Returns

`void`

***

### setLimits()

> **setLimits**(`limits`): `void`

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:102](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L102)

#### Parameters

##### limits

`AxisLimitsInput`

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
