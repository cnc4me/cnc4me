import type { EditorProps } from "@monaco-editor/react";
import type { IRecognitionException } from "chevrotain";
import type * as Monaco from "monaco-editor";

export type EditorOptions = EditorProps["options"];
export type ParsingErrors = IRecognitionException[];
export type MonacoEditor = Monaco.editor.IStandaloneCodeEditor;
