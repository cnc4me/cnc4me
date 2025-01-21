[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / SpindleFSM

# Class: SpindleFSM

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:54](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L54)

## Extends

- `StateMachine`\<`States`, `Events`, `ICallbacks`\>

## Constructors

### new SpindleFSM()

> **new SpindleFSM**(`config`?): [`SpindleFSM`](SpindleFSM.md)

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:67](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L67)

#### Parameters

##### config?

###### acceleration

\{ `simulate`: `boolean`; `timeout`: `number`; \}

###### acceleration.simulate

`boolean`

###### acceleration.timeout

`number`

###### rpm

\{ `max`: `number`; `onExceedMaxRPM`: `"fault"` \| `"clamp"`; \}

###### rpm.max

`number`

###### rpm.onExceedMaxRPM

`"fault"` \| `"clamp"`

###### throwOnFault

`boolean`

#### Returns

[`SpindleFSM`](SpindleFSM.md)

#### Overrides

`StateMachine<States, Events, ICallbacks>.constructor`

## Properties

### \_current

> `protected` **\_current**: `States`

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:17

#### Inherited from

`StateMachine._current`

***

### forward()

> **forward**: (`targetRPM`) => `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:189](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L189)

Spindle Forward (CW)

#### Parameters

##### targetRPM

`number`

#### Returns

`Promise`\<`void`\>

***

### handlers

> **handlers**: `Partial`\<`EventHandlers`\> = `{}`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:55](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L55)

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

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:116](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L116)

Subscribe to one or more events.

Using the same listener multiple times for the same event will result in only one method call per emitted event.

#### Type Parameters

• **Name** *extends* keyof OmnipresentEventData \| keyof SpindleEventEmitter

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

### reverse()

> **reverse**: (`targetRPM`) => `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:190](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L190)

Spindle Reverse (CCW)

#### Parameters

##### targetRPM

`number`

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**: () => `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:188](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L188)

Spindle Stop

#### Returns

`Promise`\<`void`\>

***

### transitions

> `protected` **transitions**: `ITransition`\<`States`, `Events`, `Callback` \| `NumberCallback` \| `StringCallback` \| (`fault`) => `void`\>[]

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:15

#### Inherited from

`StateMachine.transitions`

## Accessors

### config

#### Get Signature

> **get** **config**(): `SpindleFsmConfig`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:130](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L130)

##### Returns

`SpindleFsmConfig`

***

### direction

#### Get Signature

> **get** **direction**(): `string`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:122](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L122)

##### Returns

`string`

***

### hasFault

#### Get Signature

> **get** **hasFault**(): `boolean`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:118](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L118)

##### Returns

`boolean`

***

### rpms

#### Get Signature

> **get** **rpms**(): `number`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:126](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L126)

##### Returns

`number`

***

### simulation

#### Get Signature

> **get** **simulation**(): `boolean`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:141](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L141)

##### Returns

`boolean`

#### Set Signature

> **set** **simulation**(`state`): `void`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:145](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L145)

##### Parameters

###### state

`boolean`

##### Returns

`void`

***

### stats

#### Get Signature

> **get** **stats**(): `object`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:134](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L134)

##### Returns

`object`

###### currentRPM

> **currentRPM**: `number`

###### directon

> **directon**: `string`

## Methods

### addTransitions()

> **addTransitions**(`transitions`): `void`

Defined in: node\_modules/.pnpm/typescript-fsm@1.5.2/node\_modules/typescript-fsm/dist/stateMachine.d.ts:19

#### Parameters

##### transitions

`ITransition`\<`States`, `Events`, `Callback` \| `NumberCallback` \| `StringCallback` \| (`fault`) => `void`\>[]

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

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:153](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L153)

Generic state testing method

#### Parameters

##### state

`"Running"` | `"Idle"` | `"Fault"` | `"Accelerating"` | `"Decelerating"`

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

### M3()

> **M3**(`targetRPM`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:160](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L160)

Spindle Forward (CW)

#### Parameters

##### targetRPM

`number`

#### Returns

`Promise`\<`void`\>

***

### M4()

> **M4**(`targetRPM`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:171](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L171)

Spindle Reverse (CCW)

#### Parameters

##### targetRPM

`number`

#### Returns

`Promise`\<`void`\>

***

### M5()

> **M5**(): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:182](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L182)

Spindle Stop

#### Returns

`Promise`\<`void`\>

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
