[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / IParsedLineData

# Interface: IParsedLineData

Defined in: [packages/fanuc-macro-b/src/types/interfaces.ts:20](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/interfaces.ts#L20)

## Properties

### addresses

> **addresses**: `AddressedValue`[]

Defined in: [packages/fanuc-macro-b/src/types/interfaces.ts:41](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/interfaces.ts#L41)

Collection of all the non `G` & `M` codes on the line

***

### addressMap

> **addressMap**: `Record`\<`string`, `number`\>

Defined in: [packages/fanuc-macro-b/src/types/interfaces.ts:47](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/interfaces.ts#L47)

Map of letter addresses and their parsed values

***

### comments

> **comments**: `string`[]

Defined in: [packages/fanuc-macro-b/src/types/interfaces.ts:37](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/interfaces.ts#L37)

Collection of all the ( comments ) found on the line

***

### gCodeMap

> **gCodeMap**: `Record`\<`string`, `boolean`\>

Defined in: [packages/fanuc-macro-b/src/types/interfaces.ts:42](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/interfaces.ts#L42)

***

### gCodes

> **gCodes**: `IToken`[]

Defined in: [packages/fanuc-macro-b/src/types/interfaces.ts:29](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/interfaces.ts#L29)

Collection of all the `G` codes on the line

***

### hasVariable

> **hasVariable**: `boolean`

Defined in: [packages/fanuc-macro-b/src/types/interfaces.ts:21](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/interfaces.ts#L21)

***

### mCodeMap

> **mCodeMap**: `Record`\<`string`, `boolean`\>

Defined in: [packages/fanuc-macro-b/src/types/interfaces.ts:43](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/interfaces.ts#L43)

***

### mCodes

> **mCodes**: `IToken`[]

Defined in: [packages/fanuc-macro-b/src/types/interfaces.ts:33](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/interfaces.ts#L33)

Collection of all the `M` codes on the line

***

### N

> **N**: `number`

Defined in: [packages/fanuc-macro-b/src/types/interfaces.ts:25](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/interfaces.ts#L25)

Parsed `N` line number (this is not the literal line, but explicit Nnnnn )
