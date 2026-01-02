[**Fanuc Macro B**](../../../../README.md)

***

[Fanuc Macro B](../../../../globals.md) / [CST](../README.md) / FunctionExpressionCstNode

# Interface: FunctionExpressionCstNode

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:188](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L188)

## Extends

- `CstNode`

## Properties

### children

> **children**: [`FunctionExpressionCstChildren`](../type-aliases/FunctionExpressionCstChildren.md)

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:190](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L190)

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

> **name**: `"FunctionExpression"`

Defined in: [packages/fanuc-macro-b/src/types/fanuc.ts:189](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/types/fanuc.ts#L189)

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
