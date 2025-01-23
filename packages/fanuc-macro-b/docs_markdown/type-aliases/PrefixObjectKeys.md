[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / PrefixObjectKeys

# Type Alias: PrefixObjectKeys\<Prefix, T\>

> **PrefixObjectKeys**\<`Prefix`, `T`\>: `` { [K in keyof T as `${Prefix}:${string & K}`]: T[K] } ``

Defined in: [packages/fanuc-macro-b/src/types/generics.ts:14](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/generics.ts#L14)

## Type Parameters

• **Prefix** *extends* `string`

• **T**
