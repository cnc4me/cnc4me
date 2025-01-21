[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / AxisFSM

# Class: AxisFSM

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:45](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L45)

## Extends

- `StateMachine`\<`States`, `Events`, `ICallbacks`\>

## Constructors

### new AxisFSM()

> **new AxisFSM**(`label`, `config`): [`AxisFSM`](AxisFSM.md)

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:59](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L59)

#### Parameters

##### label

`AxisLabel`

##### config

`AxisFsmConfig`

#### Returns

[`AxisFSM`](AxisFSM.md)

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

> **on**: \<`Name`\>(`eventName`, `listener`) => `UnsubscribeFunction`

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:107](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L107)

Subscribe to one or more events.

Using the same listener multiple times for the same event will result in only one method call per emitted event.

#### Type Parameters

• **Name** *extends* keyof OmnipresentEventData \| keyof AxisFsmEvents

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

### onAny()

> **onAny**: (`listener`) => `UnsubscribeFunction`

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:108](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L108)

Subscribe to be notified about any event.

#### Parameters

##### listener

(`eventName`, `eventData`) => `void` \| `Promise`\<`void`\>

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

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:95](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L95)

##### Returns

`AxisLimits`

***

### position

#### Get Signature

> **get** **position**(): `number`

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:99](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L99)

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

• **E** *extends* `Events`

#### Parameters

##### event

[`E`](AxisFSM.html#dispatche)

##### args

...`Parameters`\<`ICallbacks`\[[`E`](AxisFSM.html#dispatche)\]\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StateMachine.dispatch`

***

### G0()

> **G0**(`position`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:144](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L144)

Rapid Move

#### Parameters

##### position

`number`

#### Returns

`Promise`\<`void`\>

***

### G1()

> **G1**(`position`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:153](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L153)

Feed Move

#### Parameters

##### position

`number`

#### Returns

`Promise`\<`void`\>

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

### is()

> **is**(`state`): `boolean`

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:119](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L119)

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

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:123](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L123)

#### Parameters

##### position

`number`

#### Returns

`boolean`

***

### moveTo()

> **moveTo**(`position`, `command`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:137](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L137)

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

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:129](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L129)

#### Returns

`Promise`\<`void`\>

***

### setConfig()

> **setConfig**(`opts`): `void`

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:159](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L159)

#### Parameters

##### opts

`Partial`\<`AxisFsmConfig`\>

#### Returns

`void`

***

### setLimits()

> **setLimits**(`limits`): `void`

Defined in: [packages/fanuc-macro-b/src/fsm/AxisFSM.ts:103](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/AxisFSM.ts#L103)

#### Parameters

##### limits

`AxisLimitsInput`

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
