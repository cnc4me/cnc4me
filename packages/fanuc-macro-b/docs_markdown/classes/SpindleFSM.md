[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / SpindleFSM

# Class: SpindleFSM

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:53](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L53)

## Extends

- `StateMachine`\<`States`, `Events`, `ICallbacks`\>

## Constructors

### Constructor

> **new SpindleFSM**(`config?`): `SpindleFSM`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:66](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L66)

#### Parameters

##### config?

###### acceleration?

\{ `simulate?`: `boolean`; `timeout?`: `number`; \}

###### acceleration.simulate?

`boolean`

###### acceleration.timeout?

`number`

###### rpm?

\{ `max?`: `number`; `onExceedMaxRPM?`: `"fault"` \| `"clamp"`; \}

###### rpm.max?

`number`

###### rpm.onExceedMaxRPM?

`"fault"` \| `"clamp"`

###### throwOnFault?

`boolean`

#### Returns

`SpindleFSM`

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

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:192](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L192)

Spindle Forward (CW)

#### Parameters

##### targetRPM

`number`

#### Returns

`Promise`\<`void`\>

***

### handlers

> **handlers**: `Partial`\<`EventHandlers`\> = `{}`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:54](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L54)

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

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:120](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L120)

Subscribe to one or more events.

Using the same listener multiple times for the same event will result in only one method call per emitted event.

#### Type Parameters

##### Name

`Name` *extends* keyof OmnipresentEventData \| keyof SpindleEventEmitter

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

### reverse()

> **reverse**: (`targetRPM`) => `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:193](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L193)

Spindle Reverse (CCW)

#### Parameters

##### targetRPM

`number`

#### Returns

`Promise`\<`void`\>

***

### stop()

> **stop**: () => `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:191](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L191)

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

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:134](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L134)

##### Returns

`SpindleFsmConfig`

***

### direction

#### Get Signature

> **get** **direction**(): `string`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:126](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L126)

##### Returns

`string`

***

### hasFault

#### Get Signature

> **get** **hasFault**(): `boolean`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:122](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L122)

##### Returns

`boolean`

***

### rpms

#### Get Signature

> **get** **rpms**(): `number`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:130](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L130)

##### Returns

`number`

***

### simulation

#### Get Signature

> **get** **simulation**(): `boolean`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:145](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L145)

##### Returns

`boolean`

#### Set Signature

> **set** **simulation**(`state`): `void`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:149](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L149)

##### Parameters

###### state

`boolean`

##### Returns

`void`

***

### stats

#### Get Signature

> **get** **stats**(): `object`

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:138](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L138)

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

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:156](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L156)

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

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:163](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L163)

Spindle Forward (CW)

#### Parameters

##### targetRPM

`number`

#### Returns

`Promise`\<`void`\>

***

### M4()

> **M4**(`targetRPM`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:174](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L174)

Spindle Reverse (CCW)

#### Parameters

##### targetRPM

`number`

#### Returns

`Promise`\<`void`\>

***

### M5()

> **M5**(): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/SpindleFSM.ts:185](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/SpindleFSM.ts#L185)

Spindle Stop

#### Returns

`Promise`\<`void`\>

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
