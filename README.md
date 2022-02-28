# CNC4ME

Welcome to the monorepo collecting all the tooling for the [Fanuc Macro Playground!](https://fanuc-macro-b.netlify.app/) This started as a side project with my [own build of a parser](https://github.com/kevinkhill/ncstat/tree/main/packages/ncstat-parser) that was based on [another pacakge for tokenizing](https://github.com/kevinkhill/ts-tokenizr) that I (sort-of) made. After finding [Chevrotain](https://chevrotain.io/docs/), I became inspired to try again with an interpreter with a better foundation for parsing gcode.

## Motivation

I have always wanted to be able to debug macro programs offline from a CNC machine, so therefore, I need an interpreter! I have never attempted something like this, but let's do it! :rocket:

## Packages

| Repo                                                                                       | Description                                            |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| [@cnc4me/macro-playground](https://github.com/cnc4me/macro-playground)                     | Macro Playground Website                               |
| [@cnc4me/fanuc-macro-b](https://github.com/cnc4me/fanuc-macro-b)                           | Fanuc Macro B Lexer, Parser, & Interpreter             |
| [@cnc4me/jest-matchers](https://github.com/cnc4me/jest-matchers)                           | Custom Jest Matchers for testing                       |
| [@cnc4me/chevrotain-jest-extension](https://github.com/cnc4me/chevrotain-jest-extension)   | Custom Jest matchers for testing Chevrotain components |
| [@cnc4me/chevrotain-types-generator](https://github.com/cnc4me/chevrotain-types-generator) | Generate TypeScript types from a Chevrotain parser     |
| [@cnc4me/chrysalis](https://github.com/cnc4me/chrysalis)                                   | Helper functions for customizing the Monaco Editor     |
| [@cnc4me/monaco-theme-gcode](https://github.com/cnc4me/monaco-theme-gcode)                 | Custom syntax highlighting for the Monaco Editor       |
| [@cnc4me/monaco-language-gcode](https://github.com/cnc4me/monaco-language-gcode)           | Custom Language for the Monaco Editor                  |
