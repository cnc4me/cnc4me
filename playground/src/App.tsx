import Editor, { EditorProps } from "@monaco-editor/react";
import { IRecognitionException } from "chevrotain";
import React, { useRef, useState } from "react";

import { evaluate } from "../../src/utils";
import Errors from "./Errors";
import { zeroPad } from "./util";
import ValueTable from "./ValueTable";

const example = [
  "#1=1.23456789",
  "#2=[#1+2]*3",
  "#3=#2/#1",
  "#4=[4*#2]-3",
  "#5=[6+#3+#2]/[#4-#2]",
  ""
].join("\n");

export default function App() {
  const editorRef = useRef();
  const [macros, setMacros] = useState<[number, number][]>([]);
  const [errors, setErrors] = useState<IRecognitionException[]>([]);

  const [editorOptions, setEditorOptions] = useState<EditorProps["options"]>({
    minimap: { enabled: false }
  });

  function parseGCode(code) {
    const { parseErrors, macros } = evaluate(code);

    setErrors(parseErrors);
    setMacros(Array.from(macros));
  }

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
    parseGCode(example);
  }

  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
    parseGCode(value);
  }

  function handleEditorValidation(markers) {
    // model markers
    markers.forEach(marker => console.log("onValidate:", marker.message));
  }

  return (
    <div className="flex flex-col overflow-y-hidden">
      <div className="font-bold bg-violet-900 text-violet-300">
        <h1 className="py-2 pl-4 text-2xl">Fanuc Macro B Playground</h1>
      </div>
      <div className="flex flex-row bg-neutral-800">
        <div className="flex flex-col w-1/2">
          <Editor
            height="90vh"
            theme="vs-dark"
            defaultValue={example}
            options={editorOptions}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
          />
        </div>
        <div className="flex flex-col flex-grow bg-neutral-900">
          <div className="flex flex-col flex-grow gap-1 pt-2 pl-2">
            <ValueTable macros={macros} />
          </div>
          <div className="px-4 py-2 bg-neutral-800">
            {errors.length > 0 ? <Errors errors={errors} /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
