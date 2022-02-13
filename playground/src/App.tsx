import Editor, { EditorProps, OnChange, OnMount } from "@monaco-editor/react";
import { IRecognitionException } from "chevrotain";
import React, { useRef, useState } from "react";

import { chrysalis, evaluate } from "../../src";
import { gcodeDarkTheme } from "../../src/monaco-dev/gcode-lang/gcode-dark";
import { gcodeLanguage } from "../../src/monaco-dev/gcode-lang/gcode-lang";
import { gcodeLightTheme } from "../../src/monaco-dev/gcode-lang/gcode-light";
import { Monaco, StandaloneEditor } from "../../types";
import Errors from "./components/Errors";
import ValueTable from "./components/ValueTable";

const example = [
  "( VARIABLE ASSIGNMENTS )",
  "#1=3.141592654",
  "( ALGEBRA )",
  "#2=[1+2]*3",
  "( VARIABLE SUBSTITUTIONS )",
  "#3=#2/#1",
  "#4=[4*#2]-3",
  "#5=[6+#3+#2]/[#4-#2]",
  "( BUILT-IN FUNCTIONS )",
  "#6=ABS[-2.3512]",
  "#7=SQRT[49]",
  "#8=ROUND[#1]",
  "#9=FUP[#1]",
  "( ... AND MORE! ) ",
  ""
].join("\n");

function handleEditorWillMount(monaco: typeof Monaco) {
  const { registerCustomLanguage, registerCustomTheme } = chrysalis(monaco);

  monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

  registerCustomLanguage("gcode", gcodeLanguage);
  registerCustomTheme("gcode-dark", gcodeDarkTheme);
  registerCustomTheme("gcode-light", gcodeLightTheme);
}

export function App() {
  const editorRef = useRef<StandaloneEditor>();
  const [macros, setMacros] = useState<[number, number][]>([]);
  const [errors, setErrors] = useState<IRecognitionException[]>([]);

  const [editorOptions, setEditorOptions] = useState<EditorProps["options"]>({
    minimap: { enabled: false }
  });

  const parseGCode = code => {
    const { parseErrors, macros } = evaluate(code);

    setErrors(parseErrors);
    setMacros(Array.from(macros));
  };

  const handleEditorChange: OnChange = value => {
    parseGCode(value);
  };

  const handleEditorDidMount: OnMount = editor => {
    editorRef.current = editor;
    parseGCode(example);
  };

  return (
    <div className="flex flex-col overflow-y-hidden bg-neutral-800">
      <div className="font-bold text-purple-200 border-b border-b-purple-600 bg-violet-900">
        <h1 className="py-2 pl-4 text-2xl">Fanuc Macro B Playground</h1>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2 border-r border-r-purple-600">
          <p
            className="px-6 py-3 text-sm italic border-b border-b-gray-900 text-violet-100"
            style={{ backgroundColor: "#1E1E1E" }}
          >
            {`\u00BB`} Try editing some of the values!
          </p>
          <Editor
            height="90vh"
            theme="gcode-dark"
            defaultLanguage="gcode"
            defaultValue={example}
            options={editorOptions}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            beforeMount={handleEditorWillMount}
          />
        </div>
        <div className="flex flex-col flex-grow bg-neutral-900">
          <h1 className="px-2 py-3 text-3xl shadow-neutral-800 bg-neutral-800 text-violet-500">
            Macro Registers
          </h1>
          <div className="flex flex-col flex-grow gap-1 pt-2 pl-4">
            <ValueTable macros={macros} />
          </div>
          <div className="px-4 py-2 bg-neutral-800">
            {errors.length > 0 ? <Errors errors={errors} /> : undefined}
          </div>
        </div>
      </div>
    </div>
  );
}
