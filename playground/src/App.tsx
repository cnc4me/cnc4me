import Editor, {
  EditorProps,
  OnChange,
  OnMount,
  OnValidate
} from "@monaco-editor/react";
import { IRecognitionException } from "chevrotain";
import React, { useRef, useState } from "react";

import { evaluate } from "../../src/utils";
import { StandaloneEditor } from "../../types/core";
import Errors from "./Errors";
import { handleEditorWillMount } from "./handleEditorWillMount";
import ValueTable from "./ValueTable";

const getCode = () =>
  [
    "[Sun Mar 7 16:02:00 2004] [notice] Apache/1.3.29 (Unix) configured -- resuming normal operations",
    "[Sun Mar 7 16:02:00 2004] [info] Server built: Feb 27 2004 13:56:37",
    "[Sun Mar 7 16:02:00 2004] [notice] Accept mutex: sysvsem (Default: sysvsem)",
    "[Sun Mar 7 16:05:49 2004] [info] [client xx.xx.xx.xx] (104)Connection reset by peer: client stopped connection before send body completed",
    "[Sun Mar 7 17:21:44 2004] [info] [client xx.xx.xx.xx] (104)Connection reset by peer: client stopped connection before send body completed",
    "[Sun Mar 7 17:23:53 2004] statistics: Use of uninitialized value in concatenation (.) or string at /home/httpd/twiki/lib/TWiki.pm line 528.",
    "[Sun Mar 7 17:23:53 2004] statistics: Can't create file /home/httpd/twiki/data/Main/WebStatistics.txt - Permission denied",
    "[Sun Mar 7 17:27:37 2004] [info] [client xx.xx.xx.xx] (104)Connection reset by peer: client stopped connection before send body completed",
    "[Sun Mar 7 20:58:27 2004] [info] [client xx.xx.xx.xx] (104)Connection reset by peer: client stopped connection before send body completed",
    "[Sun Mar 7 21:16:17 2004] [error] [client xx.xx.xx.xx] File does not exist: /home/httpd/twiki/view/Main/WebHome",
    "[Sun Mar 7 21:20:14 2004] [info] [client xx.xx.xx.xx] (104)Connection reset by peer: client stopped connection before send body completed",
    "[Mon Mar 8 05:24:29 2004] [info] [client xx.xx.xx.xx] (104)Connection reset by peer: client stopped connection before send body completed",
    "[Mon Mar 8 05:31:47 2004] [info] [client xx.xx.xx.xx] (104)Connection reset by peer: client stopped connection before send body completed",
    "<11>httpd[31628]: [error] [client xx.xx.xx.xx] File does not exist: /usr/local/installed/apache/htdocs/squirrelmail/_vti_inf.html in 29-Mar 15:18:20.50 from xx.xx.xx.xx",
    "<11>httpd[25859]: [error] [client xx.xx.xx.xx] File does not exist: /usr/local/installed/apache/htdocs/squirrelmail/_vti_bin/shtml.exe/_vti_rpc in 29-Mar 15:18:20.54 from xx.xx.xx.xx"
  ].join("\n");

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

export default function App() {
  const editorRef = useRef<StandaloneEditor>();
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

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;

    parseGCode(example);
  };

  const handleEditorChange: OnChange = (value, event) => {
    console.log("here is the current model value:", value);
    parseGCode(value);
  };

  const handleEditorValidation: OnValidate = markers => {
    // model markers
    markers.forEach(marker => console.log("onValidate:", marker.message));
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
            // height="90vh"
            // theme="vs-dark"
            // defaultValue={example}
            theme="gcode-light"
            defaultValue={getCode()}
            defaultLanguage="gcode"
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
