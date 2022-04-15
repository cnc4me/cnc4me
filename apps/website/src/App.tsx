/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { AxisLocations, LexingErrors, MacroValueArray, ParsedLineData, ParsingErrors } from "@cnc4me/fanuc-macro-b";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import { match } from "ts-pattern";

import Errors from "./components/Errors";
import { OffsetsPage } from "./components/OffsetsPage";
import { ValueTable } from "./components/ValueTable";
import { configureMonaco } from "./handlers/configureMonaco";
import { useEditorTheme } from "./hooks/useEditorTheme";
import { useMacroRuntime } from "./hooks/useMacroRuntime";
import { EditorOptions, MonacoEditor } from "./types";
import { getExampleCode } from "./utils/getExampleCode";

type DisplayFrames = "macros" | "offsets" | "tools" | "debug";

export default function App() {
  const editorRef = useRef<MonacoEditor>();
  const [editorTheme, _themeSetters] = useEditorTheme("gcode-dark");
  const [editorOptions, _setEditorOptions] = useState<EditorOptions>({
    minimap: { enabled: false }
  });

  const [runtime] = useMacroRuntime();
  const { Memory } = runtime;

  const [interpreterResult, setInterpreterResult] = useState<ParsedLineData[]>([]);

  const [offset, setOffset] = useState(20);
  const [pageCount, setPageCount] = useState(1);
  const [leftCol, setLeftCol] = useState<MacroValueArray>([]);
  const [rightCol, setRightCol] = useState<MacroValueArray>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const [activeFrame, setActiveFrame] = useState<DisplayFrames>("offsets");

  function handleMenu(frame: DisplayFrames) {
    setActiveFrame(frame);
  }

  runtime.onError(errors => {
    console.log(errors);
  });

  function pageLeft() {
    setPageCount(pageCount - 1 === 0 ? 1 : pageCount - 1);
  }

  function pageRight() {
    setPageCount(pageCount + 1);
  }

  function sliceRegisters() {
    const macros = Memory.toArray({ includeUnset: true });

    if (pageCount === 1) {
      const start = offset * (pageCount - 1);
      const end = start + offset;
      const left = macros.slice(start, end);
      const right = macros.slice(end, end + 13);

      setLeftCol(left);
      setRightCol(right);
    } else {
      // eslint-disable-next-line prettier/prettier
      const start = 33 + (offset * (pageCount - 2));
      const end = start + offset;
      const left = macros.slice(start, end);
      const right = macros.slice(end, end + offset);

      setLeftCol(left);
      setRightCol(right);
    }
  }

  function parseGCode(code: string) {
    const parsedLines = runtime.evalLines(code);

    setInterpreterResult(parsedLines);
  }

  useEffect(() => {
    sliceRegisters();
  }, [pageCount, interpreterResult, runtime.Memory]);

  const handleEditorChange: OnChange = (value?: string) => {
    parseGCode(String(value));
  };

  const handleEditorDidMount: OnMount = editor => {
    editorRef.current = editor;
    parseGCode(getExampleCode());
  };

  return (
    <div className="flex flex-col h-screen overflow-y-hidden bg-neutral-800">
      <div className="flex flex-row font-bold text-purple-200 bg-violet-900">
        <div className="flex-grow">
          <h1 className="py-2 pl-4 text-2xl">Fanuc Macro B Playground</h1>
        </div>
        <div>
          <button
            onClick={() => handleMenu("macros")}
            className={`w-32 h-12 py-2 text-white ${
              activeFrame === "macros" ? "bg-neutral-800 rounded-tr-md rounded-tl-md" : "bg-violet-900"
            }`}
          >
            Macros
          </button>
        </div>
        <div>
          <button
            onClick={() => handleMenu("offsets")}
            className={`w-32 h-12 py-2 text-white ${
              activeFrame === "offsets" ? "bg-neutral-800 rounded-tr-md rounded-tl-md" : "bg-violet-900"
            }`}
          >
            Offsets
          </button>
        </div>
        <div>
          <button
            onClick={() => handleMenu("tools")}
            className={`w-32 h-12 py-2 text-white ${
              activeFrame === "tools" ? "bg-neutral-800 rounded-tr-md rounded-tl-md" : "bg-violet-900"
            }`}
          >
            Tools
          </button>
        </div>
        <div>
          <button
            onClick={() => handleMenu("debug")}
            className={`w-32 h-12 py-2 text-white ${
              activeFrame === "debug" ? "bg-neutral-800 rounded-tr-md rounded-tl-md" : "bg-violet-900"
            }`}
          >
            Debug
          </button>
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
        <div className="flex flex-col flex-grow bg-neutral-800 ">
          {match<DisplayFrames>(activeFrame)
            .with("offsets", () => {
              return <OffsetsPage memory={Memory} />;
            })
            .with("debug", () => {
              return (
                <div className="container">
                  <h1 className="px-2 py-3 text-3xl border-b shadow-neutral-800 bg-neutral-800 border-b-violet-600 text-violet-500">
                    Debug
                  </h1>
                  <div className="p-2 text-blue-400">{JSON.stringify(Memory.toObject(), null, "  ")}</div>
                </div>
              );
            })
            .with("macros", () => {
              return (
                <div className="container">
                  <h1 className="px-2 py-3 text-3xl border-b shadow-neutral-800 bg-neutral-800 border-b-violet-600 text-violet-500">
                    Macro Variables
                  </h1>
                  <div className="grid grid-flow-row grid-cols-2">
                    <div className="">
                      <ValueTable macros={leftCol} />
                    </div>
                    <div className="">
                      <ValueTable macros={rightCol} />
                    </div>
                  </div>
                  <div className="flex flex-row justify-center py-4">
                    <div className="">
                      <button
                        onClick={pageLeft}
                        disabled={pageCount === 1}
                        className="w-32 py-2 text-white border-2 rounded-lg border-violet-600 bg-violet-700 disabled:text-gray-400 disabled:border-gray-600 disabled:bg-gray-500"
                      >
                        &laquo; Page
                      </button>
                    </div>
                    <div className="px-8 py-2 text-white">
                      Page <span className="text-violet-300">{pageCount}</span>
                    </div>
                    <div className="">
                      <button
                        onClick={pageRight}
                        className="w-32 py-2 text-white border-2 rounded-lg border-violet-600 bg-violet-700"
                      >
                        Page &raquo;
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
            .otherwise(() => {
              return <>ERROR</>;
            })}
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
