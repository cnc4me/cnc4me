[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / CncMachine

# Class: CncMachine

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:18](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L18)

## Constructors

### new CncMachine()

> **new CncMachine**(`config`?): [`CncMachine`](CncMachine.md)

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:46](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L46)

#### Parameters

##### config?

`Partial`\<\{ `axisTravelTimeout`: `number`; `home`: `Partial`\<`Record`\<`AxisLabel`, `number`\>\>; `limits`: `Partial`\<`Record`\<`AxisLabel`, `AxisLimitsInput`\>\>; `spindle`: `undefined` \| \{ `acceleration`: \{ `simulate`: `boolean`; `timeout`: `number`; \}; `rpm`: \{ `max`: `number`; `onExceedMaxRPM`: `"fault"` \| `"clamp"`; \}; `throwOnFault`: `boolean`; \}; `throwOnFault`: `boolean`; \}\>

#### Returns

[`CncMachine`](CncMachine.md)

## Properties

### activeMotionType

> **activeMotionType**: `MotionType` = `"G0"`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:30](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L30)

***

### axes

> **axes**: `object`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:23](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L23)

#### X

> **X**: [`AxisFSM`](AxisFSM.md)

#### Y

> **Y**: [`AxisFSM`](AxisFSM.md)

#### Z

> **Z**: [`AxisFSM`](AxisFSM.md)

***

### on()

> **on**: \<`Name`\>(`eventName`, `listener`) => `UnsubscribeFunction`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:89](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L89)

Subscribe to one or more events.

Using the same listener multiple times for the same event will result in only one method call per emitted event.

#### Type Parameters

• **Name** *extends* keyof OmnipresentEventData \| `"FAULT"` \| `"RESET"` \| `"MOTION_COMPLETE"` \| `"TRAVELING"`

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

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:90](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L90)

Subscribe to be notified about any event.

#### Parameters

##### listener

(`eventName`, `eventData`) => `void` \| `Promise`\<`void`\>

#### Returns

`UnsubscribeFunction`

A method to unsubscribe.

***

### spindle

> **spindle**: [`SpindleFSM`](SpindleFSM.md)

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:29](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L29)

***

### EVENTS

> `static` **EVENTS**: `Omit`\<`AxisFsmEvents`, `"MOTION_COMPLETE"`\> & `object`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:19](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L19)

#### Type declaration

##### MOTION\_COMPLETE

> **MOTION\_COMPLETE**: `Partial`\<`Record`\<`"X"` \| `"Y"` \| `"Z"`, `number`\>\>

## Methods

### G0()

> **G0**(`position`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:102](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L102)

Rapid Move

#### Parameters

##### position

`Partial`\<`Record`\<`"X"` \| `"Y"` \| `"Z"`, `number`\>\>

#### Returns

`Promise`\<`void`\>

***

### G1()

> **G1**(`position`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:105](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L105)

Feed Move

#### Parameters

##### position

`Partial`\<`Record`\<`"X"` \| `"Y"` \| `"Z"`, `number`\>\>

#### Returns

`Promise`\<`void`\>

***

### getPosition()

> **getPosition**(): `Partial`\<`Record`\<`"X"` \| `"Y"` \| `"Z"`, `number`\>\>

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:112](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L112)

#### Returns

`Partial`\<`Record`\<`"X"` \| `"Y"` \| `"Z"`, `number`\>\>

***

### getStats()

> **getStats**(): `object`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:120](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L120)

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

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:93](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L93)

Spindle Forward

#### Parameters

##### rpm

`number`

#### Returns

`Promise`\<`void`\>

***

### M4()

> **M4**(`rpm`): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:96](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L96)

Spindle Reverse

#### Parameters

##### rpm

`number`

#### Returns

`Promise`\<`void`\>

***

### M5()

> **M5**(): `Promise`\<`void`\>

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:99](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L99)

Spindle Stop

#### Returns

`Promise`\<`void`\>

***

### queueLine()

> **queueLine**(`line`): `void`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:157](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L157)

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

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:144](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L144)

#### Returns

`Promise`\<\[`void`, `void`, `void`\]\>

***

### setHome()

> **setHome**(`axis`, `location`): `void`

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:127](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L127)

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

Defined in: [packages/fanuc-macro-b/src/fsm/CncMachine.ts:108](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/fsm/CncMachine.ts#L108)

Travel to a new position with the active motion type

#### Parameters

##### position

`Partial`\<`Record`\<`"X"` \| `"Y"` \| `"Z"`, `number`\>\>

#### Returns

`Promise`\<`void`\>
