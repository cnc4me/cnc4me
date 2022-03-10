/* eslint-disable no-console */
import { evaluate, interpreter } from "@cnc4me/fanuc-macro-b";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import { useRef, useState } from "react";

import Errors from "./components/Errors";
import { configureMonaco } from "./handlers/configureMonaco";
import { useEditorTheme } from "./hooks/useEditorTheme";
import { EditorOptions, MonacoEditor, ParsingErrors } from "./types";
import { getExampleCode } from "./utils/getExampleCode";
import { zeroPad } from "./utils/helpers";

// eslint-disable-next-line import/no-default-export
export default function App() {
  const editorRef = useRef<MonacoEditor>();
  const [macros, setMacros] = useState<[number, number][]>([]);
  const [errors, setErrors] = useState<ParsingErrors>([]);
  const [editorTheme, _themeSetters] = useEditorTheme("gcode-dark");

  const [editorOptions, _setEditorOptions] = useState<EditorOptions>({
    minimap: { enabled: false }
  });

  const parseGCode = (code: string) => {
    const { parseErrors, macros } = evaluate(code);

    setErrors(parseErrors);
    setMacros(Array.from(macros));
  };

  const handleEditorChange: OnChange = (value?: string) => {
    parseGCode(String(value));
  };

  const handleEditorDidMount: OnMount = editor => {
    editorRef.current = editor;
    parseGCode(getExampleCode());
  };

  [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(register => {
    interpreter.watchMacroVar(register, update => {
      console.log("macro variable updated!", update);
    });
  });

  return (
    <div className="flex flex-col h-screen overflow-y-hidden bg-neutral-800">
      <div className="flex flex-row font-bold text-purple-200 border-b border-b-purple-600 bg-violet-900">
        <div className="flex-grow">
          <h1 className="py-2 pl-4 text-2xl">Fanuc Macro B Playground</h1>
        </div>
      </div>
      <div className="flex flex-row flex-grow">
        <div className="flex flex-col flex-grow border-r border-r-purple-600">
          <p
            className="px-6 py-3 text-sm italic border-b border-b-gray-900 text-violet-100"
            style={{ backgroundColor: "#1E1E1E" }}
          >
            {`\u00BB`} Try editing some of the values!
          </p>
          <Editor
            theme={editorTheme}
            defaultLanguage="gcode"
            options={editorOptions}
            defaultValue={getExampleCode()}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            beforeMount={configureMonaco}
          />
        </div>
        <div className="flex flex-col bg-neutral-700">
          <h1 className="px-2 py-3 text-3xl shadow-neutral-800 bg-neutral-800 text-violet-500">Macro Registers</h1>
          <div className="flex flex-col gap-1 px-4 pt-2 font-mono">
            <div className="flex flex-row ">
              <div className="w-12 text-violet-100">NO.</div>
              <div className="pl-1 text-violet-100">DATA</div>
            </div>

            {macros.map(macro => {
              return (
                !isNaN(macro[1]) && (
                  <div key={macro[0]} className="flex flex-row">
                    <div className="w-10 pt-px text-violet-100">#{zeroPad(macro[0], 3)}</div>
                    <div className="flex-grow pl-1 bg-white border-t border-l border-l-black border-t-black">
                      {macro[1].toFixed(10)}
                    </div>
                  </div>
                )
              );
            })}
          </div>
          {errors.length > 0 ? (
            <div className="px-4 py-2 bg-neutral-800">
              <Errors errors={errors} />{" "}
            </div>
          ) : undefined}
        </div>
      </div>
      <div className="flex flex-row content-center text-purple-100 border-t border-t-purple-600 bg-violet-900">
        <div className="p-2 text-sm">
          Made By{" "}
          <a className="text-purple-300 text-bold hover:text-white" href="https://github.com/kevinkhill">
            Kevin Hill
          </a>{" "}
          © 2022
        </div>
      </div>
    </div>
  );
}
