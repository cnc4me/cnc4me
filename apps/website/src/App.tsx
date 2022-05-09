/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { OnChange, OnMount } from "@monaco-editor/react";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { match } from "ts-pattern";

import { MacroEditor } from "./components/editor/MacroEditor";
import { Footer } from "./components/Footer";
import { SmallButton } from "./components/SmallButton";
import { useEditorTheme, useExampleCode, useMacroRuntime } from "./hooks";
import { MacroMemoryType, MonacoCodeEditorType, ParsedLineDataType, ViewStr } from "./types";
import { DebugView, HomeView, MacroView, OffsetView, ToolsView } from "./views";

const views: ViewStr[] = ["home", "macros", "offsets", "tools", "debug"];

const App: React.FC = () => {
  const example = useExampleCode();
  const runtime = useMacroRuntime();
  const editorRef = useRef<MonacoCodeEditorType>();

  const [activeTab, setActiveTab] = useState<ViewStr>("home");
  const [searchParams, setSearchParams] = useSearchParams({
    content: "",
    tab: activeTab
  });

  const [editorTheme] = useEditorTheme("gcode-dark");
  const [errors, setErrors] = useState<string[]>([]);
  const [editorContent, setEditorContent] = useState<string>(example);
  const [memory, setMemory] = useState<MacroMemoryType>(runtime.Memory);
  const [interpreterResult, setInterpreterResult] = useState<ParsedLineDataType[]>([]);

  useEffect(() => {
    if (searchParams.has("tab")) {
      const tab = searchParams.get("tab") as ViewStr;

      if (views.includes(tab)) {
        setActiveTab(tab);
      }
    }

    runtime.onError(errors => {
      console.log(errors);
    });
  });

  const parseGCode = (code: string) => {
    try {
      const parsedLines = runtime.evalLines(code);
      setInterpreterResult(parsedLines);
      setMemory(runtime.Memory);
    } catch (err) {
      console.error(err);
    }
  };

  const setContentUrlParam = (input: string) => {
    const encodedInput = compressToEncodedURIComponent(input);
    searchParams.set("content", encodedInput);
    setSearchParams(searchParams);
  };

  const onEditorMount: OnMount = editor => {
    editorRef.current = editor;

    let content = "";

    if (searchParams.has("content")) {
      content = String(searchParams.get("content"));
      if (content !== "") {
        const decoded = String(decompressFromEncodedURIComponent(content));
        editor.setValue(decoded);
        parseGCode(decoded);
      }
    }
  };

  const onEditorChange: OnChange = (input?: string) => {
    setContentUrlParam(String(input));
    parseGCode(String(input));
  };

  const onTabSelect = (tabName: ViewStr) => {
    setActiveTab(tabName);
    searchParams.set("tab", tabName);
    setSearchParams(searchParams);
  };

  const onRunBtnClick = () => {
    const value = editorRef.current?.getValue();

    if (value) {
      parseGCode(String(value));
    }
  };

  const CurrentView = () =>
    match<ViewStr>(activeTab)
      .with("home", () => <HomeView />)
      .with("tools", () => <ToolsView memory={memory} />)
      .with("macros", () => <MacroView memory={memory} />)
      .with("offsets", () => <OffsetView memory={memory} />)
      .with("debug", () => <DebugView memory={memory} errors={errors} />)
      .otherwise(() => <h1 className="p-10 text-red-600">ERROR</h1>);

  return (
    <div className="flex flex-col h-screen overflow-y-hidden container-fluid bg-neutral-800">
      <header className="flex flex-row font-bold text-purple-200 bg-violet-900">
        <div className="flex-grow">
          <h1 className="py-2 pl-4 text-2xl">Macro Playground</h1>
        </div>
        <div>
          {views.map(tabName => {
            const className = `w-28 h-12 py-2 text-white ${
              activeTab === tabName ? "bg-neutral-900 rounded-tr-md rounded-tl-md" : "bg-violet-900"
            }`;

            return (
              <button key={tabName} onClick={() => onTabSelect(tabName)} className={className}>
                {tabName.toUpperCase()}
              </button>
            );
          })}
        </div>
      </header>

      <main className="flex flex-row flex-grow">
        <section className="flex flex-col w-1/2 border-r border-r-purple-600">
          <div className="flex border-b border-b-gray-900 bg-[#1E1E1E]">
            <p className="px-6 py-3 text-sm italic text-violet-100">{`\u00BB`} Try editing some of the values!</p>
            <div className="flex-grow"></div>
            {/* <SmallButton label={`Run \u2bc8`} onClick={onRunBtnClick} /> */}
          </div>
          <MacroEditor contents={editorContent} theme={editorTheme} onMount={onEditorMount} onChange={onEditorChange} />
        </section>
        <aside className="flex-1 flex-grow min-h-100 bg-neutral-800">
          <CurrentView />
        </aside>
      </main>

      <footer className="border-t border-t-purple-600">
        <Footer />
      </footer>
    </div>
  );
};

export default App;
