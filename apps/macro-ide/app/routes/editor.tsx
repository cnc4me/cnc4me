import { useRef, useState, lazy, Suspense } from "react";
import type { OnChange, OnMount } from "@monaco-editor/react";
import type { MonacoCodeEditor } from "~/types";
import { useExampleCode } from "~/hooks";

const LazyMacroEditor = lazy(() => import("~/components/editor/MacroEditor"));

export function meta() {
  return [{ title: "Macro Editor" }];
}

export default function route_editor() {
  const editorRef = useRef<MonacoCodeEditor>();

  const onEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const onEditorChange: OnChange = (input?: string) => {
    console.log(input);
  };

  const initialContent = `O0001 (Monaco Editor)
(With Custom G-Code Syntax)

${useExampleCode()}`;

  return (
    <div className="container w-full h-screen">
      <Suspense fallback={<h1>LOADING</h1>}>
        <LazyMacroEditor
          theme="gcode-dark"
          contents={initialContent}
          onChange={onEditorChange}
          onMount={onEditorMount}
        />
      </Suspense>
    </div>
  );
}
