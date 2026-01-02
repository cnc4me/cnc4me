[**Fanuc Macro B**](../README.md)

***

[Fanuc Macro B](../globals.md) / MacroParser

# Class: MacroParser

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParser.ts:7](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParser.ts#L7)

## Extends

- `MacroParserRuleTree`

## Implements

- [`ErrorProducer`](../interfaces/ErrorProducer.md)\<[`ParsingError`](../variables/Errors.md#parsingerror)\>

## Constructors

### Constructor

> **new MacroParser**(): `MacroParser`

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:53](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L53)

#### Returns

`MacroParser`

#### Inherited from

`MacroParserRuleTree.constructor`

## Properties

### AdditionExpression

> **AdditionExpression**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:225](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L225)

Lowest precedence thus it is first in the rule chain
The precedence of binary Expressions is determined by how far down the Parse Tree
The binary Expression appears.

#### Inherited from

`MacroParserRuleTree.AdditionExpression`

***

### AddressedValue

> **AddressedValue**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:276](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L276)

A single, capital letter followed by number or
macro variable reference

#### Example

```ts
H#518, X1.2345, Z1., M1, G90
```

#### Inherited from

`MacroParserRuleTree.AddressedValue`

***

### AtomicBooleanExpression

> **AtomicBooleanExpression**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:192](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L192)

#### Inherited from

`MacroParserRuleTree.AtomicBooleanExpression`

***

### AtomicExpression

> **AtomicExpression**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:202](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L202)

`BracketExpression` has the highest precedence and thus it appears
in the "lowest" leaf in the Expression ParseTree.

#### Inherited from

`MacroParserRuleTree.AtomicExpression`

***

### AtomicWhileExpression

> **AtomicWhileExpression**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:187](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L187)

#### Inherited from

`MacroParserRuleTree.AtomicWhileExpression`

***

### BooleanExpression

> **BooleanExpression**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:214](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L214)

Making a comparison between two values

#### Inherited from

`MacroParserRuleTree.BooleanExpression`

***

### BracketExpression

> **BracketExpression**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:257](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L257)

Any Expression wrapped in brackets

#### Example

```ts
[#3 + 4.5]
```

#### Inherited from

`MacroParserRuleTree.BracketExpression`

***

### ConditionalExpression

> **ConditionalExpression**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:157](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L157)

If Expression to branch control flow

#### Inherited from

`MacroParserRuleTree.ConditionalExpression`

***

### DoStatement

> **DoStatement**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:130](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L130)

End of a WHILE loop

#### Inherited from

`MacroParserRuleTree.DoStatement`

***

### EndOfFile

> **EndOfFile**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:347](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L347)

End of a valid NC File

#### Inherited from

`MacroParserRuleTree.EndOfFile`

***

### EndStatement

> **EndStatement**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:139](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L139)

End of a WHILE loop

#### Inherited from

`MacroParserRuleTree.EndStatement`

***

### errors

> **errors**: `IRecognitionException`[]

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:30

#### Inherited from

`MacroParserRuleTree.errors`

***

### Expression

> **Expression**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:266](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L266)

#### Inherited from

`MacroParserRuleTree.Expression`

***

### FunctionExpression

> **FunctionExpression**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:247](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L247)

Calling a Built-In function

#### Inherited from

`MacroParserRuleTree.FunctionExpression`

***

### GoToStatement

> **GoToStatement**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:148](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L148)

Go To Line

#### Inherited from

`MacroParserRuleTree.GoToStatement`

***

### input

> **input**: `IToken`[]

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:857

#### Inherited from

`MacroParserRuleTree.input`

***

### Line

> **Line**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:95](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L95)

Any number of valid addresses, comments, and/or Expressions

#### Inherited from

`MacroParserRuleTree.Line`

***

### Lines

> **Lines**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:85](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L85)

#### Inherited from

`MacroParserRuleTree.Lines`

***

### MultiplicationExpression

> **MultiplicationExpression**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:236](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L236)

#### Inherited from

`MacroParserRuleTree.MultiplicationExpression`

***

### NumericLiteral

> **NumericLiteral**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:291](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L291)

A signed, decimal or integer

#### Example

```ts
5, 1.2345, -1., 3000
```

#### Inherited from

`MacroParserRuleTree.NumericLiteral`

***

### Program

> **Program**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:73](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L73)

Defining a valid NC Program

#### Inherited from

`MacroParserRuleTree.Program`

***

### ProgramNumberLine

> **ProgramNumberLine**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:338](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L338)

A line consisting of a program number and optional comment

#### Inherited from

`MacroParserRuleTree.ProgramNumberLine`

***

### Programs

> **Programs**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:63](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L63)

Multiple NC Programs

#### Inherited from

`MacroParserRuleTree.Programs`

***

### RECORDING\_PHASE

> **RECORDING\_PHASE**: `boolean`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:40

Flag indicating the Parser is at the recording phase.
Can be used to implement methods similar to BaseParser.ACTION
Or any other logic to requires knowledge of the recording phase.
See:
  - https://chevrotain.io/docs/guide/internals.html#grammar-recording
to learn more on the recording phase and how Chevrotain works.

#### Inherited from

`MacroParserRuleTree.RECORDING_PHASE`

***

### StartOfFile

> **StartOfFile**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:330](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L330)

Start of a valid NC File

#### Inherited from

`MacroParserRuleTree.StartOfFile`

***

### ValueLiteral

> **ValueLiteral**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:320](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L320)

Number or Macro variable

#### Inherited from

`MacroParserRuleTree.ValueLiteral`

***

### VariableAssignment

> **VariableAssignment**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:121](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L121)

Assigning a variable with a value

#### Example

```ts
#500 = 12.3456
  #501 = [2 + 0.5]
  #502 = [#501 / 2]
```

#### Inherited from

`MacroParserRuleTree.VariableAssignment`

***

### VariableExpression

> **VariableExpression**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:312](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L312)

Pound sign `#` followed by a bracketed expression to evaluate the register number

#### Examples

```ts
"#[1+2]" to use #3
```

```ts
"#[#1+#2]=1" would set #3=1 if #1=1 and #2=2
```

#### Inherited from

`MacroParserRuleTree.VariableExpression`

***

### VariableLiteral

> **VariableLiteral**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:301](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L301)

Pound sign `#` followed by an integer representing a variable register

#### Example

```ts
"#518" or "#152"
```

#### Inherited from

`MacroParserRuleTree.VariableLiteral`

***

### WhileDoExpression

> **WhileDoExpression**: `ParserMethod`\<\[\], `CstNode`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:180](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L180)

While loop construct

#### Inherited from

`MacroParserRuleTree.WhileDoExpression`

## Accessors

### hasErrors

#### Get Signature

> **get** **hasErrors**(): `boolean`

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParser.ts:24](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParser.ts#L24)

##### Returns

`boolean`

#### Implementation of

[`ErrorProducer`](../interfaces/ErrorProducer.md).[`hasErrors`](../interfaces/ErrorProducer.md#haserrors)

## Methods

### ACTION()

> `protected` **ACTION**\<`T`\>(`impl`): `T`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:89

The Semantic Actions wrapper.
Should be used to wrap semantic actions that either:
- May fail when executing in "recording phase".
- Have global side effects that should be avoided during "recording phase".

For more information see:
  - https://chevrotain.io/docs/guide/internals.html#grammar-recording

#### Type Parameters

##### T

`T`

#### Parameters

##### impl

() => `T`

#### Returns

`T`

#### Inherited from

`MacroParserRuleTree.ACTION`

***

### AT\_LEAST\_ONE()

> `protected` **AT\_LEAST\_ONE**(`actionORMethodDef`): `void`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:683

Convenience method, same as MANY but the repetition is of one or more.
failing to match at least one repetition will result in a parsing error and
cause a parsing error.

#### Parameters

##### actionORMethodDef

The grammar action to optionally invoke multiple times
                            or an "OPTIONS" object describing the grammar action and optional properties.

`GrammarAction`\<`any`\> | `DSLMethodOptsWithErr`\<`any`\>

#### Returns

`void`

#### See

MANY

#### Inherited from

`MacroParserRuleTree.AT_LEAST_ONE`

***

### AT\_LEAST\_ONE\_SEP()

> `protected` **AT\_LEAST\_ONE\_SEP**(`options`): `void`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:772

Convenience method, same as MANY_SEP but the repetition is of one or more.
failing to match at least one repetition will result in a parsing error and
cause the parser to attempt error recovery.

Note that an additional optional property ERR_MSG can be used to provide custom error messages.

#### Parameters

##### options

`AtLeastOneSepMethodOpts`\<`any`\>

An object defining the grammar of each iteration and the separator between iterations

#### Returns

`void`

#### See

MANY_SEP

#### Inherited from

`MacroParserRuleTree.AT_LEAST_ONE_SEP`

***

### atLeastOne()

> `protected` **atLeastOne**(`idx`, `actionORMethodDef`): `void`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:150

Like `AT_LEAST_ONE` with the numerical suffix as a parameter, e.g:
atLeastOne(0, X) === AT_LEAST_ONE(X)
atLeastOne(1, X) === AT_LEAST_ONE1(X)
atLeastOne(2, X) === AT_LEAST_ONE2(X)
...

#### Parameters

##### idx

`number`

##### actionORMethodDef

`GrammarAction`\<`any`\> | `DSLMethodOptsWithErr`\<`any`\>

#### Returns

`void`

#### See

AT_LEAST_ONE

#### Inherited from

`MacroParserRuleTree.atLeastOne`

***

### BACKTRACK()

> `protected` **BACKTRACK**\<`T`\>(`grammarRule`, `args?`): () => `boolean`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:75

#### Type Parameters

##### T

`T`

#### Parameters

##### grammarRule

(...`args`) => `T`

The rule to try and parse in backtracking mode.

##### args?

`any`[]

argument to be passed to the grammar rule execution

#### Returns

a lookahead function that will try to parse the given grammarRule and will return true if succeed.

> (): `boolean`

##### Returns

`boolean`

#### Inherited from

`MacroParserRuleTree.BACKTRACK`

***

### canTokenTypeBeDeletedInRecovery()

> `protected` **canTokenTypeBeDeletedInRecovery**(`tokType`): `boolean`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:848

By default, all token types may be deleted. This behavior may be overridden in inheriting parsers.
The method receives the expected token type. The token that would be deleted can be received with [LA](#la).

#### Parameters

##### tokType

`TokenType`

#### Returns

`boolean`

#### Inherited from

`MacroParserRuleTree.canTokenTypeBeDeletedInRecovery`

***

### canTokenTypeBeInsertedInRecovery()

> `protected` **canTokenTypeBeInsertedInRecovery**(`tokType`): `boolean`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:842

By default, all tokens type may be inserted. This behavior may be overridden in inheriting Recognizers
for example: One may decide that only punctuation tokens may be inserted automatically as they have no additional
semantic value. (A mandatory semicolon has no additional semantic meaning, but an Integer may have additional meaning
depending on its int value and context (Inserting an integer 0 in cardinality: "[1..]" will cause semantic issues
as the max of the cardinality will be greater than the min value (and this is a false error!).

#### Parameters

##### tokType

`TokenType`

#### Returns

`boolean`

#### Inherited from

`MacroParserRuleTree.canTokenTypeBeInsertedInRecovery`

***

### computeContentAssist()

> **computeContentAssist**(`startRuleName`, `precedingInput`): `ISyntacticContentAssistPath`[]

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:64

#### Parameters

##### startRuleName

`string`

##### precedingInput

`IToken`[]

The token vector up to (not including) the content assist point

#### Returns

`ISyntacticContentAssistPath`[]

#### Inherited from

`MacroParserRuleTree.computeContentAssist`

***

### consume()

> `protected` **consume**(`idx`, `tokType`, `options?`): `IToken`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:99

Like `CONSUME` with the numerical suffix as a parameter, e.g:
consume(0, X) === CONSUME(X)
consume(1, X) === CONSUME1(X)
consume(2, X) === CONSUME2(X)
...

#### Parameters

##### idx

`number`

##### tokType

`TokenType`

##### options?

`ConsumeMethodOpts`

#### Returns

`IToken`

#### See

CONSUME

#### Inherited from

`MacroParserRuleTree.consume`

***

### CONSUME()

> **CONSUME**\<`S`\>(`token`, `options?`): `Omit`\<`IToken`, `"tokenType"`\> & `object`

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts:42](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParserRuleTree.ts#L42)

Utilize the generic to get the token name

#### Type Parameters

##### S

`S` *extends* `TokenType`

#### Parameters

##### token

`S`

##### options?

`ConsumeMethodOpts`

#### Returns

`Omit`\<`IToken`, `"tokenType"`\> & `object`

#### See

https://github.com/Chevrotain/chevrotain/issues/1987#issuecomment-1709854026

#### Inherited from

`MacroParserRuleTree.CONSUME`

***

### getBaseCstVisitorConstructor()

> **getBaseCstVisitorConstructor**\<`IN`, `OUT`\>(): (...`args`) => `ICstVisitor`\<`IN`, `OUT`\>

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:48

#### Type Parameters

##### IN

`IN` = `any`

##### OUT

`OUT` = `any`

#### Returns

> **new getBaseCstVisitorConstructor**(...`args`): `ICstVisitor`\<`IN`, `OUT`\>

##### Parameters

###### args

...`any`[]

##### Returns

`ICstVisitor`\<`IN`, `OUT`\>

#### Inherited from

`MacroParserRuleTree.getBaseCstVisitorConstructor`

***

### getBaseCstVisitorConstructorWithDefaults()

> **getBaseCstVisitorConstructorWithDefaults**\<`IN`, `OUT`\>(): (...`args`) => `ICstVisitor`\<`IN`, `OUT`\>

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:52

#### Type Parameters

##### IN

`IN` = `any`

##### OUT

`OUT` = `any`

#### Returns

> **new getBaseCstVisitorConstructorWithDefaults**(...`args`): `ICstVisitor`\<`IN`, `OUT`\>

##### Parameters

###### args

...`any`[]

##### Returns

`ICstVisitor`\<`IN`, `OUT`\>

#### Inherited from

`MacroParserRuleTree.getBaseCstVisitorConstructorWithDefaults`

***

### getErrors()

> **getErrors**(): [`ParsingError`](../variables/Errors.md#parsingerror)[]

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParser.ts:38](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParser.ts#L38)

#### Returns

[`ParsingError`](../variables/Errors.md#parsingerror)[]

#### Implementation of

[`ErrorProducer`](../interfaces/ErrorProducer.md).[`getErrors`](../interfaces/ErrorProducer.md#geterrors)

***

### getGAstProductions()

> **getGAstProductions**(): `Record`\<`string`, `Rule`\>

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:56

#### Returns

`Record`\<`string`, `Rule`\>

#### Inherited from

`MacroParserRuleTree.getGAstProductions`

***

### ~~getNextPossibleTokenTypes()~~

> `protected` **getNextPossibleTokenTypes**(`grammarPath`): `TokenType`[]

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:853

#### Parameters

##### grammarPath

`ITokenGrammarPath`

#### Returns

`TokenType`[]

#### Deprecated

- will be removed in the future

#### Inherited from

`MacroParserRuleTree.getNextPossibleTokenTypes`

***

### getSerializedGastProductions()

> **getSerializedGastProductions**(): `ISerializedGast`[]

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:58

#### Returns

`ISerializedGast`[]

#### Inherited from

`MacroParserRuleTree.getSerializedGastProductions`

***

### getTokenToInsert()

> `protected` **getTokenToInsert**(`tokType`): `IToken`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:833

Returns an "imaginary" Token to insert when Single Token Insertion is done
Override this if you require special behavior in your grammar.
For example if an IntegerToken is required provide one with the image '0' so it would be valid syntactically.

#### Parameters

##### tokType

`TokenType`

#### Returns

`IToken`

#### Inherited from

`MacroParserRuleTree.getTokenToInsert`

***

### LA()

> `protected` **LA**(`howMuch`): `IToken`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:878

Look-Ahead for the Token Vector
LA(1) is the next Token ahead.
LA(n) is the nth Token ahead.
LA(0) is the previously consumed Token.

Looking beyond the end of the Token Vector or before its begining
will return in an IToken of type EOF EOF.
This behavior can be used to avoid infinite loops.

This is often used to implement custom lookahead logic for GATES.
https://chevrotain.io/docs/features/gates.html

#### Parameters

##### howMuch

`number`

#### Returns

`IToken`

#### Inherited from

`MacroParserRuleTree.LA`

***

### many()

> `protected` **many**(`idx`, `actionORMethodDef`): `void`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:137

Like `MANY` with the numerical suffix as a parameter, e.g:
many(0, X) === MANY(X)
many(1, X) === MANY1(X)
many(2, X) === MANY2(X)
...

#### Parameters

##### idx

`number`

##### actionORMethodDef

`GrammarAction`\<`any`\> | `DSLMethodOpts`\<`any`\>

#### Returns

`void`

#### See

MANY

#### Inherited from

`MacroParserRuleTree.many`

***

### MANY()

> `protected` **MANY**(`actionORMethodDef`): `void`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:511

Parsing DSL method, that indicates a repetition of zero or more.
This is equivalent to EBNF repetition {...}.

Note that there are two syntax forms:
- Passing the grammar action directly:
  ```
    this.MANY(() => {
      this.CONSUME(Comma)
      this.CONSUME(Digit)
     })
  ```

- using an "options" object:
  ```
    this.MANY({
      GATE: predicateFunc,
      DEF: () => {
             this.CONSUME(Comma)
             this.CONSUME(Digit)
           }
    });
  ```

The optional 'GATE' property in "options" object form can be used to add constraints
to invoking the grammar action.

As in CONSUME the index in the method name indicates the occurrence
of the repetition production in it's top rule.

#### Parameters

##### actionORMethodDef

The grammar action to optionally invoke multiple times
                            or an "OPTIONS" object describing the grammar action and optional properties.

`GrammarAction`\<`any`\> | `DSLMethodOpts`\<`any`\>

#### Returns

`void`

#### Inherited from

`MacroParserRuleTree.MANY`

***

### MANY\_SEP()

> `protected` **MANY\_SEP**(`options`): `void`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:616

Parsing DSL method, that indicates a repetition of zero or more with a separator
Token between the repetitions.

Example:

```
    this.MANY_SEP({
        SEP:Comma,
        DEF: () => {
            this.CONSUME(Number};
            // ...
        })
```

Note that because this DSL method always requires more than one argument the options object is always required
and it is not possible to use a shorter form like in the MANY DSL method.

Note that for the purposes of deciding on whether or not another iteration exists
Only a single Token is examined (The separator). Therefore if the grammar being implemented is
so "crazy" to require multiple tokens to identify an item separator please use the more basic DSL methods
to implement it.

As in CONSUME the index in the method name indicates the occurrence
of the repetition production in it's top rule.

#### Parameters

##### options

`ManySepMethodOpts`\<`any`\>

An object defining the grammar of each iteration and the separator between iterations

#### Returns

`void`

#### Inherited from

`MacroParserRuleTree.MANY_SEP`

***

### option()

> `protected` **option**\<`OUT`\>(`idx`, `actionORMethodDef`): `OUT` \| `undefined`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:113

Like `OPTION` with the numerical suffix as a parameter, e.g:
option(0, X) === OPTION(X)
option(1, X) === OPTION1(X)
option(2, X) === OPTION2(X)
...

#### Type Parameters

##### OUT

`OUT`

#### Parameters

##### idx

`number`

##### actionORMethodDef

`GrammarAction`\<`OUT`\> | `DSLMethodOpts`\<`OUT`\>

#### Returns

`OUT` \| `undefined`

#### See

OPTION

#### Inherited from

`MacroParserRuleTree.option`

***

### OPTION()

> `protected` **OPTION**\<`OUT`\>(`actionORMethodDef`): `OUT` \| `undefined`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:275

Parsing DSL Method that Indicates an Optional production.
in EBNF notation this is equivalent to: "[...]".

Note that there are two syntax forms:
- Passing the grammar action directly:
  ```
    this.OPTION(() => {
      this.CONSUME(Digit)}
    );
  ```

- using an "options" object:
  ```
    this.OPTION({
      GATE:predicateFunc,
      DEF: () => {
        this.CONSUME(Digit)
    }});
  ```

The optional 'GATE' property in "options" object form can be used to add constraints
to invoking the grammar action.

As in CONSUME the index in the method name indicates the occurrence
of the optional production in it's top rule.

#### Type Parameters

##### OUT

`OUT`

#### Parameters

##### actionORMethodDef

The grammar action to optionally invoke once
                            or an "OPTIONS" object describing the grammar action and optional properties.

`GrammarAction`\<`OUT`\> | `DSLMethodOpts`\<`OUT`\>

#### Returns

`OUT` \| `undefined`

The `GrammarAction` return value (OUT) if the optional syntax is encountered
         or `undefined` if not.

#### Inherited from

`MacroParserRuleTree.OPTION`

***

### or()

#### Call Signature

> `protected` **or**(`idx`, `altsOrOpts`): `any`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:126

Like `OR` with the numerical suffix as a parameter, e.g:
or(0, X) === OR(X)
or(1, X) === OR1(X)
or(2, X) === OR2(X)
...

##### Parameters

###### idx

`number`

###### altsOrOpts

`IOrAlt`\<`any`\>[] | `OrMethodOpts`\<`any`\>

##### Returns

`any`

##### See

OR

##### Inherited from

`MacroParserRuleTree.or`

#### Call Signature

> `protected` **or**\<`T`\>(`idx`, `altsOrOpts`): `T`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:127

Like `OR` with the numerical suffix as a parameter, e.g:
or(0, X) === OR(X)
or(1, X) === OR1(X)
or(2, X) === OR2(X)
...

##### Type Parameters

###### T

`T`

##### Parameters

###### idx

`number`

###### altsOrOpts

`IOrAlt`\<`T`\>[] | `OrMethodOpts`\<`T`\>

##### Returns

`T`

##### See

OR

##### Inherited from

`MacroParserRuleTree.or`

***

### OR()

#### Call Signature

> `protected` **OR**\<`T`\>(`altsOrOpts`): `T`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:411

Parsing DSL method that indicates a choice between a set of alternatives must be made.
This is equivalent to an EBNF alternation (A | B | C | D ...), except
that the alternatives are ordered like in a PEG grammar.
This means that the **first** matching alternative is always chosen.

There are several forms for the inner alternatives array:

- Passing alternatives array directly:
  ```
    this.OR([
      { ALT:() => { this.CONSUME(One) }},
      { ALT:() => { this.CONSUME(Two) }},
      { ALT:() => { this.CONSUME(Three) }}
    ])
  ```

- Passing alternative array directly with predicates (GATE):
  ```
    this.OR([
      { GATE: predicateFunc1, ALT:() => { this.CONSUME(One) }},
      { GATE: predicateFuncX, ALT:() => { this.CONSUME(Two) }},
      { GATE: predicateFuncX, ALT:() => { this.CONSUME(Three) }}
    ])
  ```

- These syntax forms can also be mixed:
  ```
    this.OR([
      {
        GATE: predicateFunc1,
        ALT:() => { this.CONSUME(One) }
      },
      { ALT:() => { this.CONSUME(Two) }},
      { ALT:() => { this.CONSUME(Three) }}
    ])
  ```

- Additionally an "options" object may be used:
  ```
    this.OR({
      DEF:[
        { ALT:() => { this.CONSUME(One) }},
        { ALT:() => { this.CONSUME(Two) }},
        { ALT:() => { this.CONSUME(Three) }}
      ],
      // OPTIONAL property
      ERR_MSG: "A Number"
    })
  ```

The 'predicateFuncX' in the long form can be used to add constraints to choosing the alternative.

As in CONSUME the index in the method name indicates the occurrence
of the alternation production in it's top rule.

##### Type Parameters

###### T

`T`

##### Parameters

###### altsOrOpts

A set of alternatives or an "OPTIONS" object describing the alternatives and optional properties.

`IOrAlt`\<`T`\>[] | `OrMethodOpts`\<`T`\>

##### Returns

`T`

The result of invoking the chosen alternative.

##### Inherited from

`MacroParserRuleTree.OR`

#### Call Signature

> `protected` **OR**(`altsOrOpts`): `any`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:412

Parsing DSL method that indicates a choice between a set of alternatives must be made.
This is equivalent to an EBNF alternation (A | B | C | D ...), except
that the alternatives are ordered like in a PEG grammar.
This means that the **first** matching alternative is always chosen.

There are several forms for the inner alternatives array:

- Passing alternatives array directly:
  ```
    this.OR([
      { ALT:() => { this.CONSUME(One) }},
      { ALT:() => { this.CONSUME(Two) }},
      { ALT:() => { this.CONSUME(Three) }}
    ])
  ```

- Passing alternative array directly with predicates (GATE):
  ```
    this.OR([
      { GATE: predicateFunc1, ALT:() => { this.CONSUME(One) }},
      { GATE: predicateFuncX, ALT:() => { this.CONSUME(Two) }},
      { GATE: predicateFuncX, ALT:() => { this.CONSUME(Three) }}
    ])
  ```

- These syntax forms can also be mixed:
  ```
    this.OR([
      {
        GATE: predicateFunc1,
        ALT:() => { this.CONSUME(One) }
      },
      { ALT:() => { this.CONSUME(Two) }},
      { ALT:() => { this.CONSUME(Three) }}
    ])
  ```

- Additionally an "options" object may be used:
  ```
    this.OR({
      DEF:[
        { ALT:() => { this.CONSUME(One) }},
        { ALT:() => { this.CONSUME(Two) }},
        { ALT:() => { this.CONSUME(Three) }}
      ],
      // OPTIONAL property
      ERR_MSG: "A Number"
    })
  ```

The 'predicateFuncX' in the long form can be used to add constraints to choosing the alternative.

As in CONSUME the index in the method name indicates the occurrence
of the alternation production in it's top rule.

##### Parameters

###### altsOrOpts

A set of alternatives or an "OPTIONS" object describing the alternatives and optional properties.

`IOrAlt`\<`any`\>[] | `OrMethodOpts`\<`any`\>

##### Returns

`any`

The result of invoking the chosen alternative.

##### Inherited from

`MacroParserRuleTree.OR`

***

### OVERRIDE\_RULE()

> `protected` **OVERRIDE\_RULE**\<`F`\>(`name`, `implementation`, `config?`): `ParserMethod`\<`Parameters`\<`F`\>, `CstNode`\>

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:905

Overrides a Grammar Rule
See usage example in: https://github.com/chevrotain/chevrotain/blob/master/examples/parser/versioning/versioning.js

#### Type Parameters

##### F

`F` *extends* () => `void`

#### Parameters

##### name

`string`

##### implementation

`F`

##### config?

`IRuleConfig`\<`CstNode`\>

#### Returns

`ParserMethod`\<`Parameters`\<`F`\>, `CstNode`\>

#### Inherited from

`MacroParserRuleTree.OVERRIDE_RULE`

***

### performSelfAnalysis()

> `protected` **performSelfAnalysis**(): `void`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:17

This must be called at the end of a Parser constructor.
See: http://chevrotain.io/docs/tutorial/step2_parsing.html#under-the-hood

#### Returns

`void`

#### Inherited from

`MacroParserRuleTree.performSelfAnalysis`

***

### reset()

> **reset**(): `void`

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParser.ts:28](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParser.ts#L28)

Resets the parser state, should be overridden for custom parsers which "carry" additional state.
When overriding, remember to also invoke the super implementation!

#### Returns

`void`

#### Overrides

`MacroParserRuleTree.reset`

***

### RULE()

> `protected` **RULE**\<`F`\>(`name`, `implementation`, `config?`): `ParserMethod`\<`Parameters`\<`F`\>, `CstNode`\>

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:895

Creates a Grammar Rule

Note that any parameters of your implementation must be optional as it will
be called without parameters during the grammar recording phase.

#### Type Parameters

##### F

`F` *extends* () => `void`

#### Parameters

##### name

`string`

##### implementation

`F`

##### config?

`IRuleConfig`\<`CstNode`\>

#### Returns

`ParserMethod`\<`Parameters`\<`F`\>, `CstNode`\>

#### Inherited from

`MacroParserRuleTree.RULE`

***

### setInput()

> **setInput**(`tokens`): `void`

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParser.ts:33](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParser.ts#L33)

#### Parameters

##### tokens

`IToken`[]

#### Returns

`void`

***

### SKIP\_TOKEN()

> `protected` **SKIP\_TOKEN**(): `IToken`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:863

Will consume a single token and return the **next** token, meaning
the token **after** the skipped token.

#### Returns

`IToken`

#### Inherited from

`MacroParserRuleTree.SKIP_TOKEN`

***

### subrule()

> `protected` **subrule**\<`ARGS`\>(`idx`, `ruleToCall`, `options?`): `CstNode`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:919

Like `SUBRULE` with the numerical suffix as a parameter, e.g:
subrule(0, X) === SUBRULE(X)
subrule(1, X) === SUBRULE1(X)
subrule(2, X) === SUBRULE2(X)
...

#### Type Parameters

##### ARGS

`ARGS` *extends* `unknown`[]

#### Parameters

##### idx

`number`

##### ruleToCall

`ParserMethod`\<`ARGS`, `CstNode`\>

##### options?

`SubruleMethodOpts`\<`ARGS`\>

#### Returns

`CstNode`

#### See

SUBRULE

#### Inherited from

`MacroParserRuleTree.subrule`

***

### SUBRULE()

> `protected` **SUBRULE**\<`ARGS`\>(`ruleToCall`, `options?`): `CstNode`

Defined in: node\_modules/.pnpm/@chevrotain+types@10.5.0/node\_modules/@chevrotain/types/api.d.ts:942

The Parsing DSL Method is used by one rule to call another.
It is equivalent to a non-Terminal in EBNF notation.

This may seem redundant as it does not actually do much.
However using it is **mandatory** for all sub rule invocations.

Calling another rule without wrapping in SUBRULE(...)
will cause errors/mistakes in the Parser's self analysis phase,
which will lead to errors in error recovery/automatic lookahead calculation
and any other functionality relying on the Parser's self analysis
output.

As in CONSUME the index in the method name indicates the occurrence
of the sub rule invocation in its rule.

#### Type Parameters

##### ARGS

`ARGS` *extends* `unknown`[]

#### Parameters

##### ruleToCall

`ParserMethod`\<`ARGS`, `CstNode`\>

##### options?

`SubruleMethodOpts`\<`ARGS`\>

#### Returns

`CstNode`

#### Inherited from

`MacroParserRuleTree.SUBRULE`

***

### getBaseCstVisitor()

> `static` **getBaseCstVisitor**(`opts`): (...`args`) => `ICstVisitor`\<`any`, `any`\>

Defined in: [packages/fanuc-macro-b/src/core/parser/MacroParser.ts:11](https://github.com/cnc4me/cnc4me/blob/9fdae95fa8bf0a832b707f3a11f5c0a566fdd4ed/packages/fanuc-macro-b/src/core/parser/MacroParser.ts#L11)

#### Parameters

##### opts

###### useConstructorDefaults

`boolean`

#### Returns

> **new getBaseCstVisitor**(...`args`): `ICstVisitor`\<`any`, `any`\>

##### Parameters

###### args

...`any`[]

##### Returns

`ICstVisitor`\<`any`, `any`\>
