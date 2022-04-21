/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { MacroMemory, ParsedLineData } from "@cnc4me/fanuc-macro-b";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { match } from "ts-pattern";

import { configureMonaco } from "./handlers/configureMonaco";
import { useEditorTheme, useExampleCode, useMacroRuntime } from "./hooks";
import { EditorOptions, MonacoEditor, TabStr } from "./types";
import { DebugTab, MacroTab, OffsetTab, ToolsTab } from "./views";

export default function App() {
  const example = useExampleCode();
  const runtime = useMacroRuntime();

  const editorRef = useRef<MonacoEditor>();
  const [editorTheme, _themeSetters] = useEditorTheme("gcode-dark");
  const [editorOptions, _setEditorOptions] = useState<EditorOptions>({
    minimap: { enabled: false }
  });

  const [memory, setMemory] = useState<MacroMemory>(runtime.Memory);
  const [interpreterResult, setInterpreterResult] = useState<ParsedLineData[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  runtime.onError(errors => {
    console.log(errors);
  });

  const tabs: TabStr[] = ["macros", "offsets", "tools", "debug"];
  const [activeTab, setActiveTab] = useState<TabStr>("macros");

  const parseGCode = (code: string) => {
    const parsedLines = runtime.evalLines(code);
    setInterpreterResult(parsedLines);
    setMemory(runtime.Memory);
  };

  const onEditorMount: OnMount = editor => {
    editorRef.current = editor;
    // parseGCode(example);
  };

  const handleEditorChange: OnChange = (value?: string) => {
    parseGCode(String(value));
  };

  function run() {
    const value = editorRef.current?.getValue();

    if (value) {
      parseGCode(String(value));
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-y-hidden bg-neutral-800">
      <div className="flex flex-row font-bold text-purple-200 bg-violet-900">
        <div className="flex-grow">
          <h1 className="py-2 pl-4 text-2xl">Fanuc Macro B Playground</h1>
        </div>
        <div>
          {tabs.map(tabName => {
            return (
              <button
                key={tabName}
                onClick={() => setActiveTab(tabName)}
                className={`w-32 h-12 py-2 text-white ${
                  activeTab === tabName ? "bg-neutral-900 rounded-tr-md rounded-tl-md" : "bg-violet-900"
                }`}
              >
                {tabName.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row flex-grow">
        <div className="flex flex-col w-1/2 border-r border-r-purple-600">
          <div className="flex border-b border-b-gray-900 bg-[#1E1E1E]">
            <p className="px-6 py-3 text-sm italic text-violet-100">{`\u00BB`} Try editing some of the values!</p>
            <div className="flex-grow"></div>
            <button
              onClick={() => run()}
              className="px-3 mr-2 my-1.5 text-white border-1 rounded-md border-violet-600 bg-violet-700"
            >
              Run {`\u2bc8`}
            </button>
          </div>
          <Editor
            theme={editorTheme}
            defaultLanguage="gcode"
            options={editorOptions}
            defaultValue={example}
            onMount={onEditorMount}
            onChange={handleEditorChange}
            beforeMount={configureMonaco}
          />
        </div>
        <div className="flex flex-col flex-grow bg-neutral-800">
          {match<TabStr>(activeTab)
            .with("offsets", () => {
              return <OffsetTab memory={memory} />;
            })
            .with("macros", () => {
              return <MacroTab memory={memory} />;
            })
            .with("tools", () => {
              return <ToolsTab memory={memory} />;
            })
            .with("debug", () => {
              return <DebugTab memory={memory} errors={errors} />;
            })
            .otherwise(() => {
              return <h1 className="text-red-600">ERROR</h1>;
            })}
        </div>
      </div>

      <div className="flex flex-row text-purple-100 border-t border-t-purple-600 bg-neutral-900">
        <div className="p-2 text-sm">
          View the{" "}
          <a
            className="text-purple-600 text-bold hover:text-purple-400"
            href="https://github.com/cnc4me/cnc4me/tree/main/packages/fanuc-macro-b"
          >
            Parser
          </a>{" "}
          on Github
        </div>
        <div className="flex-grow text-center p-2 text-sm">
          <a className="text-purple-600 text-bold hover:text-purple-400" href="https://github.com/cnc4me/cnc4me">
            CNC 4 ME
          </a>{" "}
          © 2022
        </div>
        <div className="p-2 text-sm">
          Made By{" "}
          <a className="text-purple-600 text-bold hover:text-purple-400" href="https://github.com/kevinkhill">
            Kevin Hill
          </a>
        </div>
      </div>
    </div>
  );
}
