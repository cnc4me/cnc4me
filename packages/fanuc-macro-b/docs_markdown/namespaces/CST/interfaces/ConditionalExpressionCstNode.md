[**Fanuc Macro B**](../../../README.md)

***

[Fanuc Macro B](../../../globals.md) / [CST](../README.md) / ConditionalExpressionCstNode

# Interface: ConditionalExpressionCstNode

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:98](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L98)

## Extends

- `CstNode`

## Properties

### children

> **children**: [`ConditionalExpressionCstChildren`](../type-aliases/ConditionalExpressionCstChildren.md)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:100](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L100)

#### Overrides

`CstNode.children`

***

### location?

> `readonly` `optional` **location**: `CstNodeLocation`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:1949

Will only be present if the IParserConfig.nodeLocationTracking is
**not** set to "none".
See: https://chevrotain.io/docs/guide/concrete_syntax_tree.html#cstnodes-location
For more details.

#### Inherited from

`CstNode.location`

***

### name

> **name**: `"ConditionalExpression"`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:99](https://github.com/cnc4me/cnc4me/blob/2903a977713c0fa6c1a7e63bfb65cfb308906107/packages/fanuc-macro-b/src/types/fanuc.ts#L99)

#### Overrides

`CstNode.name`

***

### recoveredNode?

> `readonly` `optional` **recoveredNode**: `boolean`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:1941

A flag indicating the whole CSTNode has been recovered during **re-sync** error recovery.
This means that some of the node's children may be missing.
- Note that single token insertion/deletion recovery would not activate this flag.
  This flag would only be activated in **re-sync** recovery when the rule's
  grammar cannot be fully parsed.
- See: https://chevrotain.io/docs/tutorial/step4_fault_tolerance.html
  for more info on error recovery and fault tolerance.

#### Inherited from

`CstNode.recoveredNode`
