[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / CncMachine

# Class: CncMachine

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:16](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L16)

## Constructors

### Constructor

> **new CncMachine**(`config?`): `CncMachine`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:44](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L44)

#### Parameters

##### config?

`Partial`\<\{ `axisTravelTimeout`: `number`; `home`: `Partial`\<`Record`\<`AxisLabel`, `number`\>\>; `limits`: `Partial`\<`Record`\<`AxisLabel`, `AxisLimitsInput`\>\>; `spindle`: \{ `acceleration?`: \{ `simulate?`: `boolean`; `timeout?`: `number`; \}; `rpm?`: \{ `max?`: `number`; `onExceedMaxRPM?`: `"fault"` \| `"clamp"`; \}; `throwOnFault?`: `boolean`; \} \| `undefined`; `throwOnFault`: `boolean`; \}\>

#### Returns

`CncMachine`

## Properties

### activeMotionType

> **activeMotionType**: `MotionType` = `"G0"`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:28](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L28)

***

### axes

> **axes**: `object`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:21](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L21)

#### X

> **X**: [`AxisFSM`](AxisFSM.md)

#### Y

> **Y**: [`AxisFSM`](AxisFSM.md)

#### Z

> **Z**: [`AxisFSM`](AxisFSM.md)

***

### on()

> **on**: \<`Name`\>(`eventName`, `listener`, `options?`) => `UnsubscribeFunction`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:87](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L87)

Subscribe to one or more events.

Using the same listener multiple times for the same event will result in only one method call per emitted event.

#### Type Parameters

##### Name

`Name` *extends* keyof OmnipresentEventData \| `"FAULT"` \| `"RESET"` \| `"MOTION_COMPLETE"` \| `"TRAVELING"`

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

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:88](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L88)

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

### spindle

> **spindle**: [`SpindleFSM`](SpindleFSM.md)

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:27](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L27)

***

### EVENTS

> `static` **EVENTS**: `Omit`\<`AxisFsmEvents`, `"MOTION_COMPLETE"`\> & `object`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:17](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L17)

#### Type Declaration

##### MOTION\_COMPLETE

> **MOTION\_COMPLETE**: `Position`

## Methods

### G0()

> **G0**(`position`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:100](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L100)

Rapid Move

#### Parameters

##### position

`Position`

#### Returns

`Promise`\<`void`\>

***

### G1()

> **G1**(`position`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:103](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L103)

Feed Move

#### Parameters

##### position

`Position`

#### Returns

`Promise`\<`void`\>

***

### getPosition()

> **getPosition**(): `Position`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:110](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L110)

#### Returns

`Position`

***

### getStats()

> **getStats**(): `object`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:118](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L118)

#### Returns

`object`

##### positions

> **positions**: `Partial`\<`Record`\<`"X"` \| `"Y"` \| `"Z"`, `number`\>\>

##### spindle

> **spindle**: `object`

###### spindle.currentRPM

> **currentRPM**: `number`

###### spindle.directon

> **directon**: `string`

***

### M3()

> **M3**(`rpm`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:91](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L91)

Spindle Forward

#### Parameters

##### rpm

`number`

#### Returns

`Promise`\<`void`\>

***

### M4()

> **M4**(`rpm`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:94](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L94)

Spindle Reverse

#### Parameters

##### rpm

`number`

#### Returns

`Promise`\<`void`\>

***

### M5()

> **M5**(): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:97](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L97)

Spindle Stop

#### Returns

`Promise`\<`void`\>

***

### queueLine()

> **queueLine**(`line`): `void`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:155](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L155)

Handle lines from the interpreter to simulate the machine

@TODO: I don't think this is the right way to have the G0/G1 be "modal" but it works?

#### Parameters

##### line

[`IParsedLineData`](../interfaces/IParsedLineData.md)

#### Returns

`void`

***

### reset()

> **reset**(): `Promise`\<\[`void`, `void`, `void`\]\>

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:142](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L142)

#### Returns

`Promise`\<\[`void`, `void`, `void`\]\>

***

### setHome()

> **setHome**(`axis`, `location`): `void`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:125](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L125)

#### Parameters

##### axis

`"X"` | `"Y"` | `"Z"`

##### location

`number` | (`limits`) => `number`

#### Returns

`void`

***

### travel()

> **travel**(`position`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:106](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L106)

Travel to a new position with the active motion type

#### Parameters

##### position

`Position`

#### Returns

`Promise`\<`void`\>
