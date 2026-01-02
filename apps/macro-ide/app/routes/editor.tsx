import { useRef } from "react";
import { MacroEditor } from "~/components";
import { EXAMPLE_CODE } from "~/lib";
import type { OnChange, OnMount } from "@monaco-editor/react";
import type { MonacoCodeEditor } from "~/types";

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

${EXAMPLE_CODE}`;

  return (
    <div className="container w-full h-screen">
      <MacroEditor
        theme="gcode-dark"
        contents={initialContent}
        onChange={onEditorChange}
        onMount={onEditorMount}
      />
    </div>
  );
}
