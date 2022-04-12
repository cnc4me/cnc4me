/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { LexingErrors, MacroValueArray, ParsedLineData, ParsingErrors } from "@cnc4me/fanuc-macro-b";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";

import Errors from "./components/Errors";
import { configureMonaco } from "./handlers/configureMonaco";
import { useEditorTheme } from "./hooks/useEditorTheme";
import { useMacroRuntime } from "./hooks/useMacroRuntime";
import { useMacroTools } from "./hooks/useMacroTools";
import { EditorOptions, MonacoEditor } from "./types";
import { getExampleCode } from "./utils/getExampleCode";
import { zeroPad } from "./utils/helpers";

// eslint-disable-next-line import/no-default-export
export default function App() {
  // const { interpreter, parser, lexer } = useMacroTools();
  const [runtime] = useMacroRuntime();
  const { Interpreter, Parser } = runtime;

  runtime.onError(errors => console.log(errors));

  const [interpreterResult, setInterpreterResult] = useState<ParsedLineData[]>([]);
  const editorRef = useRef<MonacoEditor>();

  const [offset, setOffset] = useState(20);
  const [pageCount, setPageCount] = useState(1);
  const [leftCol, setLeftCol] = useState<MacroValueArray>([]);
  const [rightCol, setRightCol] = useState<MacroValueArray>([]);

  const [errors, setErrors] = useState<ParsingErrors | LexingErrors>([]);

  const [editorTheme, _themeSetters] = useEditorTheme("gcode-dark");
  const [editorOptions, _setEditorOptions] = useState<EditorOptions>({
    minimap: { enabled: false }
  });

  function pageLeft() {
    setPageCount(pageCount - 1 < 1 ? 1 : pageCount - 1);
  }

  function pageRight() {
    setPageCount(pageCount + 1);
  }

  function sliceRegisters() {
    const macros = runtime.Memory.toArray();
    console.log(macros);
    const pageStart = offset * (pageCount - 1);

    setLeftCol(macros.slice(pageStart, pageStart + offset));
    setRightCol(macros.slice(pageStart + offset, pageStart + (offset + offset)));
  }

  function parseGCode(code: string) {
    runtime.evalLines(code);
    if (errors) {
      setErrors(errors);
    } else {
      const { children } = Parser.lines();
      const result = Interpreter.lines(children);

      if (Parser.errors.length) {
        setErrors(Parser.errors);
      }

      setInterpreterResult(result);
      sliceRegisters();
    }
  }

  useEffect(() => {
    sliceRegisters();
  }, [pageCount]);

  const handleEditorChange: OnChange = (value?: string) => {
    parseGCode(String(value));
  };

  const handleEditorDidMount: OnMount = editor => {
    editorRef.current = editor;
    parseGCode(getExampleCode());
  };

  const ValueTable: React.FC<{ macros: MacroValueArray }> = ({ macros }) => (
    <div className="flex flex-col gap-1 px-4 pt-2 font-mono">
      <div className="flex flex-row">
        <div className="w-12 text-violet-100">NO.</div>
        <div className="pl-1 text-violet-100">DATA</div>
      </div>

      {macros.map(macro => {
        return (
          <div key={macro[0]} className="flex flex-row">
            <div className="w-12 pt-px text-violet-100">#{zeroPad(macro[0], 4)}</div>
            <div className="flex-grow pl-1 border-t border-l bg-violet-100 border-l-black border-t-black">
              {macro[1].toFixed(10)}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col h-screen overflow-y-hidden bg-neutral-800">
      <div className="flex flex-row font-bold text-purple-200 border-b border-b-purple-600 bg-violet-900">
        <div className="flex-grow">
          <h1 className="py-2 pl-4 text-2xl">Fanuc Macro B Playground</h1>
        </div>
      </div>
      <div className="flex flex-row flex-grow">
        <div className="flex flex-col w-1/2 border-r border-r-purple-600">
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
          {errors.length > 0 ? (
            <div className="px-4 py-2 bg-neutral-800">
              <Errors errors={errors} />{" "}
            </div>
          ) : undefined}
        </div>
        <div className="flex flex-col flex-grow bg-neutral-700">
          <h1 className="px-2 py-3 text-3xl shadow-neutral-800 bg-neutral-800 text-violet-500">Macro Registers</h1>
          <div className="grid grid-cols-2 grid-flow-row">
            <div className="">
              <ValueTable macros={leftCol} />
            </div>
            <div className="">
              <ValueTable macros={rightCol} />
            </div>
          </div>
          <div className="flex flex-row py-4 justify-center">
            <div className="">
              <button
                onClick={pageLeft}
                disabled={pageCount === 1}
                className="rounded-lg py-2 w-32 border-2 border-violet-600 bg-violet-700 text-white disabled:text-gray-400  disabled:border-gray-600 disabled:bg-gray-500"
              >
                &laquo; Page
              </button>
            </div>
            <div className="px-8 py-2 text-white">
              Current Page: <span className="text-violet-300">{pageCount}</span>
            </div>
            <div className="">
              <button
                onClick={pageRight}
                className="rounded-lg py-2 w-32 border-2 border-violet-600 bg-violet-700 text-white"
              >
                Page &raquo;
              </button>
            </div>
          </div>
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
