[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / PrefixObjectKeys

# Type Alias: PrefixObjectKeys\<Prefix, T\>

> **PrefixObjectKeys**\<`Prefix`, `T`\> = `` { [K in keyof T as `${Prefix}:${string & K}`]: T[K] } ``

Defined in: [packages/fanuc-macro-b/src/types/generics.ts:14](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/generics.ts#L14)

## Type Parameters

### Prefix

`Prefix` *extends* `string`

### T

`T`
