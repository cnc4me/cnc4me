[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / DeepPartial

# Type Alias: DeepPartial\<T\>

> **DeepPartial**\<`T`\> = `T` *extends* `object` ? `{ [P in keyof T]?: DeepPartial<T[P]> }` : `T`

Defined in: [packages/fanuc-macro-b/src/types/generics.ts:18](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/generics.ts#L18)

## Type Parameters

### T

`T`
