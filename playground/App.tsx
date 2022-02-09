import Editor, { EditorProps } from "@monaco-editor/react";
import React, { useRef, useState } from "react";

import { evaluate, interpreter } from "../src";
import { zeroPad } from "./util";

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

  const [editorOptions, setEditorOptions] = useState<EditorProps["options"]>({
    minimap: { enabled: false }
  });

  const process = code => {
    evaluate(code);
    const macros = interpreter.getMacros();
    setMacros(Array.from(macros));
  };

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
    process(example);
  }

  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
    process(value);
  }

  function handleEditorValidation(markers) {
    // model markers
    markers.forEach(marker => console.log("onValidate:", marker.message));
  }

  return (
    <div className="flex flex-col">
      <div className="font-bold bg-violet-900 text-violet-300">
        <h1 className="py-2 pl-4 text-2xl">Fanuc Macro B Playground</h1>
      </div>
      <div className="flex flex-row h-100 bg-neutral-800">
        <div className="flex flex-col w-1/2">
          <Editor
            height="90vh"
            // defaultLanguage="javascript"
            theme="vs-dark"
            defaultValue={example}
            options={editorOptions}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            onValidate={handleEditorValidation}
          />
        </div>
        <div className="p-5 font-mono grow bg-neutral-900">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row ">
              <div className="w-12 text-violet-400">NO.</div>
              <div className="pl-1 text-violet-400">DATA</div>
            </div>

            {macros.map(macro => {
              return (
                !isNaN(macro[1]) && (
                  <div key={macro[0]} className="flex flex-row gap-1 ">
                    <div className="w-10 pl-1 text-violet-100">
                      #{zeroPad(macro[0], 3)}
                    </div>
                    <div className="flex-grow pl-1 bg-gray-300">{macro[1]}</div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
