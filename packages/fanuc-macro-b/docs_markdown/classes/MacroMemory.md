[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / MacroMemory

# Class: MacroMemory

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:27](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L27)

A Representaion of a CNC machines' macro memory.

## Constructors

### new MacroMemory()

> **new MacroMemory**(): [`MacroMemory`](MacroMemory.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:44](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L44)

Construct a new instance of the MacroMemory class and initialize the variables

#### Returns

[`MacroMemory`](MacroMemory.md)

## Properties

### on()

> **on**: \<`Name`\>(`eventName`, `listener`) => `UnsubscribeFunction`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:50](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L50)

Subscribe to one or more events.

Using the same listener multiple times for the same event will result in only one method call per emitted event.

#### Type Parameters

• **Name** *extends* `"REGISTER_UPDATE"` \| keyof OmnipresentEventData

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

### REGISTERS

> `static` **REGISTERS**: `number`[]

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:29](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L29)

***

### ZERO

> `static` **ZERO**: `number` = `0`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:28](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L28)

## Methods

### clear()

> **clear**(`register`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:91](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L91)

Clear a register value by writing [MacroMemory.ZERO](MacroMemory.md#zero)

#### Parameters

##### register

`number`

#### Returns

`void`

***

### g10()

> **g10**(`g10`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:98](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L98)

Evaluate a G10 line to apply values

#### Parameters

##### g10

[`G10WorkOffsets`](../interfaces/G10WorkOffsets.md) | [`G10ToolOffsets`](../interfaces/G10ToolOffsets.md)

#### Returns

`void`

***

### getAuxWorkCoordinateArray()

> **getAuxWorkCoordinateArray**(`pGroup`): [`WorkCoordinateArray`](../type-aliases/WorkCoordinateArray.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:158](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L158)

Get auxiliary work coordinates for a G54.1 `P` group

#### Parameters

##### pGroup

`number`

#### Returns

[`WorkCoordinateArray`](../type-aliases/WorkCoordinateArray.md)

***

### getAuxWorkCoordinateRecord()

> **getAuxWorkCoordinateRecord**(`pGroup`): [`WorkCoordinateRecord`](../interfaces/WorkCoordinateRecord.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:147](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L147)

Get auxiliary work coordinates for a G54.1 `P` group

#### Parameters

##### pGroup

`number`

#### Returns

[`WorkCoordinateRecord`](../interfaces/WorkCoordinateRecord.md)

***

### getToolDiameter()

> **getToolDiameter**(`toolNum`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:223](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L223)

Get Tool diameter value by tool number

#### Parameters

##### toolNum

`number`

#### Returns

`number`

***

### getToolDiameterComp()

> **getToolDiameterComp**(`toolNum`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:237](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L237)

Get Tool Diameter Comp value by tool number

#### Parameters

##### toolNum

`number`

#### Returns

`number`

***

### getToolLength()

> **getToolLength**(`toolNum`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:195](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L195)

Get Tool Length value by tool number

#### Parameters

##### toolNum

`number`

#### Returns

`number`

***

### getToolLengthComp()

> **getToolLengthComp**(`toolNum`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:209](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L209)

Get Tool Length Comp value by tool number

#### Parameters

##### toolNum

`number`

#### Returns

`number`

***

### getToolOffsetArray()

> **getToolOffsetArray**(`toolNum`): [`ToolOffsetArray`](../type-aliases/ToolOffsetArray.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:179](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L179)

Get all tool offset values as an array of values

#### Parameters

##### toolNum

`number`

#### Returns

[`ToolOffsetArray`](../type-aliases/ToolOffsetArray.md)

***

### getToolOffsets()

> **getToolOffsets**(`toolNum`): [`ToolOffsetDict`](../interfaces/ToolOffsetDict.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:167](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L167)

Get all tool offset values for a tool number

#### Parameters

##### toolNum

`number`

#### Returns

[`ToolOffsetDict`](../interfaces/ToolOffsetDict.md)

***

### getWorkCoordinateArray()

> **getWorkCoordinateArray**(`gOffset`): [`WorkCoordinateArray`](../type-aliases/WorkCoordinateArray.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:138](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L138)

Get work coordinates for a common work offset (G53, G54, G55, G56, G57, G58, G59)

#### Parameters

##### gOffset

`number`

#### Returns

[`WorkCoordinateArray`](../type-aliases/WorkCoordinateArray.md)

***

### getWorkCoordinateRecord()

> **getWorkCoordinateRecord**(`gOffset`): [`WorkCoordinateRecord`](../interfaces/WorkCoordinateRecord.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:127](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L127)

Get work coordinates as labeled axis locations for a common work offset
(G53, G54, G55, G56, G57, G58, G59)

#### Parameters

##### gOffset

`number`

#### Returns

[`WorkCoordinateRecord`](../interfaces/WorkCoordinateRecord.md)

***

### read()

> **read**(`register`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:64](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L64)

Read a value from a register

#### Parameters

##### register

`number`

#### Returns

`number`

***

### reset()

> **reset**(): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:55](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L55)

Clear all registers to reset the memory

#### Returns

`void`

***

### setAuxWorkOffset()

> **setAuxWorkOffset**(`group`, `locations`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:263](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L263)

Set axis values for a Work Offset Group (L2)

G10 line sets:  `G10 G90 L2 P1 X0 Y0 Z0 B0`
Use in program: `G54 X0 Y0`

#### Parameters

##### group

`number`

##### locations

`Partial`\<[`WorkCoordinateRecord`](../interfaces/WorkCoordinateRecord.md)\>

#### Returns

`void`

***

### setCommonWorkOffset()

> **setCommonWorkOffset**(`group`, `locations`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:247](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L247)

Set axis values for a Work Offset Group (L2)

G10 line sets:  `G10 G90 L2 P1 X0 Y0 Z0 B0`
Use in program: `G54 X0 Y0`

#### Parameters

##### group

`number`

##### locations

`Partial`\<[`WorkCoordinateRecord`](../interfaces/WorkCoordinateRecord.md)\>

#### Returns

`void`

***

### setToolDiameter()

> **setToolDiameter**(`toolNum`, `value`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:216](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L216)

Tool Diameter Offset Group (L13)

#### Parameters

##### toolNum

`number`

##### value

`number`

#### Returns

`void`

***

### setToolDiameterComp()

> **setToolDiameterComp**(`toolNum`, `value`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:230](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L230)

Tool Diameter Compensation. Offset Group (L12)

#### Parameters

##### toolNum

`number`

##### value

`number`

#### Returns

`void`

***

### setToolLength()

> **setToolLength**(`toolNum`, `value`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:188](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L188)

Tool Length Offset Group (L11)

#### Parameters

##### toolNum

`number`

##### value

`number`

#### Returns

`void`

***

### setToolLengthComp()

> **setToolLengthComp**(`toolNum`, `value`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:202](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L202)

Tool Length Compensation Offset Group (L10)

#### Parameters

##### toolNum

`number`

##### value

`number`

#### Returns

`void`

***

### toArray()

> **toArray**(`opts`?): [`MacroValueArray`](../type-aliases/MacroValueArray.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:276](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L276)

Create an array of all the set macro variables

#### Parameters

##### opts?

`CastingOptions`

#### Returns

[`MacroValueArray`](../type-aliases/MacroValueArray.md)

***

### toJSON()

> **toJSON**(): `string`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:300](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L300)

Serialize all the MacroMemory into a JSON string

#### Returns

`string`

***

### toObject()

> **toObject**(`opts`?): `Record`\<`number`, `number`\>

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:293](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L293)

Collect all the set registers into a POJO for further processing

#### Parameters

##### opts?

`CastingOptions`

#### Returns

`Record`\<`number`, `number`\>

***

### write()

> **write**(`register`, `value`): `Omit`\<`Record`\<`"previous"` \| `"current"` \| `"register"`, `number`\>, `"register"`\>

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:73](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/core/MacroMemory.ts#L73)

Write  a value to a register

#### Parameters

##### register

`number`

##### value

`number`

#### Returns

`Omit`\<`Record`\<`"previous"` \| `"current"` \| `"register"`, `number`\>, `"register"`\>
