[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / MacroMemory

# Class: MacroMemory

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:26](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L26)

A Representaion of a CNC machines' macro memory.

## Constructors

### Constructor

> **new MacroMemory**(): `MacroMemory`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:43](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L43)

Construct a new instance of the MacroMemory class and initialize the variables

#### Returns

`MacroMemory`

## Properties

### on()

> **on**: \<`Name`\>(`eventName`, `listener`, `options?`) => `UnsubscribeFunction`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:49](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L49)

Subscribe to one or more events.

Using the same listener multiple times for the same event will result in only one method call per emitted event.

#### Type Parameters

##### Name

`Name` *extends* `"REGISTER_UPDATE"` \| keyof OmnipresentEventData

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

### REGISTERS

> `static` **REGISTERS**: `number`[]

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:28](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L28)

***

### ZERO

> `static` **ZERO**: `number` = `0`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:27](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L27)

## Methods

### clear()

> **clear**(`register`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:90](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L90)

Clear a register value by writing [MacroMemory.ZERO](#zero)

#### Parameters

##### register

`number`

#### Returns

`void`

***

### g10()

> **g10**(`g10`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:97](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L97)

Evaluate a G10 line to apply values

#### Parameters

##### g10

[`G10WorkOffsets`](../interfaces/G10WorkOffsets.md) | [`G10ToolOffsets`](../interfaces/G10ToolOffsets.md)

#### Returns

`void`

***

### getAuxWorkCoordinateArray()

> **getAuxWorkCoordinateArray**(`pGroup`): [`WorkCoordinateArray`](../type-aliases/WorkCoordinateArray.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:157](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L157)

Get auxiliary work coordinates for a G54.1 `P` group

#### Parameters

##### pGroup

`number`

#### Returns

[`WorkCoordinateArray`](../type-aliases/WorkCoordinateArray.md)

***

### getAuxWorkCoordinateRecord()

> **getAuxWorkCoordinateRecord**(`pGroup`): [`WorkCoordinateRecord`](../interfaces/WorkCoordinateRecord.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:146](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L146)

Get auxiliary work coordinates for a G54.1 `P` group

#### Parameters

##### pGroup

`number`

#### Returns

[`WorkCoordinateRecord`](../interfaces/WorkCoordinateRecord.md)

***

### getToolDiameter()

> **getToolDiameter**(`toolNum`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:222](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L222)

Get Tool diameter value by tool number

#### Parameters

##### toolNum

`number`

#### Returns

`number`

***

### getToolDiameterComp()

> **getToolDiameterComp**(`toolNum`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:236](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L236)

Get Tool Diameter Comp value by tool number

#### Parameters

##### toolNum

`number`

#### Returns

`number`

***

### getToolLength()

> **getToolLength**(`toolNum`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:194](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L194)

Get Tool Length value by tool number

#### Parameters

##### toolNum

`number`

#### Returns

`number`

***

### getToolLengthComp()

> **getToolLengthComp**(`toolNum`): `number`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:208](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L208)

Get Tool Length Comp value by tool number

#### Parameters

##### toolNum

`number`

#### Returns

`number`

***

### getToolOffsetArray()

> **getToolOffsetArray**(`toolNum`): [`ToolOffsetArray`](../type-aliases/ToolOffsetArray.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:178](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L178)

Get all tool offset values as an array of values

#### Parameters

##### toolNum

`number`

#### Returns

[`ToolOffsetArray`](../type-aliases/ToolOffsetArray.md)

***

### getToolOffsets()

> **getToolOffsets**(`toolNum`): [`ToolOffsetDict`](../interfaces/ToolOffsetDict.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:166](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L166)

Get all tool offset values for a tool number

#### Parameters

##### toolNum

`number`

#### Returns

[`ToolOffsetDict`](../interfaces/ToolOffsetDict.md)

***

### getWorkCoordinateArray()

> **getWorkCoordinateArray**(`gOffset`): [`WorkCoordinateArray`](../type-aliases/WorkCoordinateArray.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:137](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L137)

Get work coordinates for a common work offset (G53, G54, G55, G56, G57, G58, G59)

#### Parameters

##### gOffset

`number`

#### Returns

[`WorkCoordinateArray`](../type-aliases/WorkCoordinateArray.md)

***

### getWorkCoordinateRecord()

> **getWorkCoordinateRecord**(`gOffset`): [`WorkCoordinateRecord`](../interfaces/WorkCoordinateRecord.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:126](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L126)

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

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:63](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L63)

Read a value from a register

#### Parameters

##### register

`number`

#### Returns

`number`

***

### reset()

> **reset**(): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:54](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L54)

Clear all registers to reset the memory

#### Returns

`void`

***

### setAuxWorkOffset()

> **setAuxWorkOffset**(`group`, `locations`): `void`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:262](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L262)

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

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:246](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L246)

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

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:215](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L215)

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

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:229](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L229)

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

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:187](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L187)

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

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:201](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L201)

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

> **toArray**(`opts?`): [`MacroValueArray`](../type-aliases/MacroValueArray.md)

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:275](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L275)

Create an array of all the set macro variables

#### Parameters

##### opts?

`CastingOptions`

#### Returns

[`MacroValueArray`](../type-aliases/MacroValueArray.md)

***

### toJSON()

> **toJSON**(): `string`

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:299](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L299)

Serialize all the MacroMemory into a JSON string

#### Returns

`string`

***

### toObject()

> **toObject**(`opts?`): `Record`\<`number`, `number`\>

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:292](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L292)

Collect all the set registers into a POJO for further processing

#### Parameters

##### opts?

`CastingOptions`

#### Returns

`Record`\<`number`, `number`\>

***

### write()

> **write**(`register`, `value`): `Omit`\<`MacroMemoryEvents`\[`"REGISTER_UPDATE"`\], `"register"`\>

Defined in: [packages/fanuc-macro-b/src/core/MacroMemory.ts:72](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/MacroMemory.ts#L72)

Write  a value to a register

#### Parameters

##### register

`number`

##### value

`number`

#### Returns

`Omit`\<`MacroMemoryEvents`\[`"REGISTER_UPDATE"`\], `"register"`\>
