[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / RegisterMap

# Variable: RegisterMap

> `const` **RegisterMap**: `object`

Defined in: [packages/fanuc-macro-b/src/memory/helpers.ts:51](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/memory/helpers.ts#L51)

## Type declaration

### AuxWorkOffset()

> **AuxWorkOffset**: (`group`, `axis`) => `number` = `getAuxWorkOffsetAxisRegister`

Compose an aux work offset axis register number by coordinate group and axis.

- The arguments `(1, "X")` will produce `7001`
- The arguments `(2, "Y")` will produce `7022`
- The arguments `(3, "Z")` will produce `7043`
- The arguments `(4, "B")` will produce `7064`
- The arguments `(48, "X")` will produce `7941`

#### Parameters

##### group

`number`

##### axis

`string`

#### Returns

`number`

### ToolOffset()

> **ToolOffset**: (`group`, `toolNum`) => `number` = `getToolOffsetRegister`

Compose a tool offset register number by group and tool num.

#### Parameters

##### group

`number`

##### toolNum

`number`

#### Returns

`number`

### WorkOffset()

> **WorkOffset**: (`group`, `axis`) => `number` = `getWorkOffsetAxisRegister`

Compose a work offset axis register number by group and axis.

- The arguments `(1, "X")` will produce `5221`
- The arguments `(2, "Y")` will produce `5242`
- The arguments `(3, "Z")` will produce `5263`
- The arguments `(4, "B")` will produce `5284`

#### Parameters

##### group

`number`

##### axis

`string`

#### Returns

`number`
