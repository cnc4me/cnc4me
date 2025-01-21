[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / MemoryConstants

# Variable: MemoryConstants

> `const` **MemoryConstants**: `object`

Defined in: [packages/fanuc-macro-b/src/memory/MemoryConstants.ts:4](https://github.com/cnc4me/cnc4me/blob/19757263e25864f8b5a1607c4e54310f81efbb72/packages/fanuc-macro-b/src/memory/MemoryConstants.ts#L4)

## Type declaration

### AXIS\_ADRRESS\_INDEX

> **AXIS\_ADRRESS\_INDEX**: `Record`\<`string`, `number`\>

This is stored in parameter 1022 of the machine

### CURRENT\_B

> **CURRENT\_B**: `4102` = `4102`

### CURRENT\_D

> **CURRENT\_D**: `4107` = `4107`

### CURRENT\_F

> **CURRENT\_F**: `4109` = `4109`

### CURRENT\_H

> **CURRENT\_H**: `4111` = `4111`

### CURRENT\_M

> **CURRENT\_M**: `4113` = `4113`

### CURRENT\_N\_LINE

> **CURRENT\_N\_LINE**: `4114` = `4114`

### CURRENT\_PROGRAM\_NUMBER

> **CURRENT\_PROGRAM\_NUMBER**: `4115` = `4115`

### CURRENT\_S

> **CURRENT\_S**: `4119` = `4119`

### CURRENT\_T

> **CURRENT\_T**: `4120` = `4120`

### FORBIDDEN\_AREA\_ALARM\_TIMING

> **FORBIDDEN\_AREA\_ALARM\_TIMING**: `1300` = `1300`

### G10\_L\_GROUPS

> **G10\_L\_GROUPS**: `Record`\<`string`, `"LENGTH_COMP"` \| `"LENGTH"` \| `"DIAMETER_COMP"` \| `"DIAMETER"` \| `"COMMON"` \| `"AUX"`\>

Mapping of tool offset group labels to their respective G10 `L` value

### GROUP\_1

> **GROUP\_1**: `4001` = `4001`

Movement Command

#### Example

```ts
0, 1, 2, 3, 33
```

### GROUP\_10

> **GROUP\_10**: `4010` = `4010`

### GROUP\_11

> **GROUP\_11**: `4011` = `4011`

### GROUP\_12

> **GROUP\_12**: `4012` = `4012`

### GROUP\_13

> **GROUP\_13**: `4013` = `4013`

### GROUP\_14

> **GROUP\_14**: `4014` = `4014`

Active Local Work Offset

#### Example

```ts
54, 55, 56, 57, 58, 59
```

### GROUP\_15

> **GROUP\_15**: `4015` = `4015`

G61 – G64

### GROUP\_16

> **GROUP\_16**: `4016` = `4016`

#### Example

```ts
68, 69
```

### GROUP\_2

> **GROUP\_2**: `4002` = `4002`

Plane Selection

#### Example

```ts
17, 18, 19
```

### GROUP\_22

> **GROUP\_22**: `4022` = `4022`

?

### GROUP\_3

> **GROUP\_3**: `4003` = `4003`

Absolute / Incremental Positioning

#### Example

```ts
90, 91
```

### GROUP\_4

> **GROUP\_4**: `4004` = `4004`

Active Groups

### GROUP\_5

> **GROUP\_5**: `4005` = `4005`

### GROUP\_6

> **GROUP\_6**: `4006` = `4006`

### GROUP\_7

> **GROUP\_7**: `4007` = `4007`

### GROUP\_8

> **GROUP\_8**: `4008` = `4008`

### GROUP\_9

> **GROUP\_9**: `4009` = `4009`

### MICROTIMER

> **MICROTIMER**: `3001` = `3001`

Microtimer

This variable functions as a timer that counts in 1–millisecond
increments at all times. When the power is turned on, the value
of this variable is reset to 0. When 2147483648 milliseconds is
reached, the value of this timer returns to 0.

### OFFSET\_GROUPS

> **OFFSET\_GROUPS**: `object`

Export all the groups

#### OFFSET\_GROUPS.TOOL

> `readonly` **TOOL**: `object` = `TOOL_OFFSET_GROUP`

#### OFFSET\_GROUPS.TOOL.DIAMETER

> `readonly` **DIAMETER**: `13` = `13`

#### OFFSET\_GROUPS.TOOL.DIAMETER\_COMP

> `readonly` **DIAMETER\_COMP**: `12` = `12`

#### OFFSET\_GROUPS.TOOL.LENGTH

> `readonly` **LENGTH**: `11` = `11`

#### OFFSET\_GROUPS.TOOL.LENGTH\_COMP

> `readonly` **LENGTH\_COMP**: `10` = `10`

#### OFFSET\_GROUPS.WORK

> `readonly` **WORK**: `object` = `WORK_OFFSET_GROUP`

#### OFFSET\_GROUPS.WORK.AUX

> `readonly` **AUX**: `20` = `20`

#### OFFSET\_GROUPS.WORK.COMMON

> `readonly` **COMMON**: `2` = `2`

### ONE\_GROUP\_OF\_OFFSET\_REGISTERS

> **ONE\_GROUP\_OF\_OFFSET\_REGISTERS**: `20` = `20`

Spacing between each successive group of address space of the memory.

### WORK\_OFFSET\_ADDRESS\_MAP

> **WORK\_OFFSET\_ADDRESS\_MAP**: `Record`\<`number`, `number`\>
