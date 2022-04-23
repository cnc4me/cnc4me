/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { MacroMemory, ParsedLineData } from "@cnc4me/fanuc-macro-b";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import { match } from "ts-pattern";

import { MacroEditor } from "./components/editor/MacroEditor";
import { MonacoEditor } from "./components/editor/types";
import { Footer } from "./components/Footer";
import { SmallButton } from "./components/SmallButton";
import { useEditorTheme, useExampleCode, useMacroRuntime } from "./hooks";
import { usePathname } from "./hooks/usePathname";
import { DebugView, HomeView, MacroView, OffsetView, ToolsView } from "./views";

type ViewStr = "welcome" | "macros" | "offsets" | "tools" | "debug";

const DEFAULT_VIEW = "welcome";
const views: ViewStr[] = ["welcome", "macros", "offsets", "tools", "debug"];

export default function App() {
  const example = useExampleCode();
  const runtime = useMacroRuntime();

  const pathname = usePathname() as ViewStr;
  const homeTab = views.includes(pathname) ? pathname : DEFAULT_VIEW;
  const [activeTab, setActiveTab] = useState<ViewStr>(homeTab);

  const editorRef = useRef<MonacoEditor>();
  const getEditorContents = () => editorRef.current?.getValue() ?? "";
  const [editorTheme, { setEditorThemeDark, setEditorThemeLight }] = useEditorTheme("gcode-dark");

  const [errors, setErrors] = useState<string[]>([]);
  const [memory, setMemory] = useState<MacroMemory>(runtime.Memory);
  const [interpreterResult, setInterpreterResult] = useState<ParsedLineData[]>([]);

  runtime.onError(errors => {
    console.log(errors);
  });

  const parseGCode = (code: string) => {
    const parsedLines = runtime.evalLines(code);
    setInterpreterResult(parsedLines);
    setMemory(runtime.Memory);
  };

  const onEditorMount: OnMount = editor => {
    editorRef.current = editor;
    parseGCode(example);
  };

  const onEditorChange: OnChange = (value?: string) => {
    parseGCode(String(value));
  };

  const onRunBtnClick = () => {
    const value = getEditorContents();

    if (value) {
      parseGCode(String(value));
    }
  };

  // useEffect(() => {
  //   console.log(pathname);
  // });

  const CurrentView = () =>
    match<ViewStr>(activeTab)
      .with("welcome", () => <HomeView />)
      .with("offsets", () => <OffsetView memory={memory} />)
      .with("macros", () => <MacroView memory={memory} />)
      .with("tools", () => <ToolsView memory={memory} />)
      .with("debug", () => <DebugView editorContents={getEditorContents()} memory={memory} errors={errors} />)
      .otherwise(() => <h1 className="p-10 text-red-600">ERROR</h1>);

  return (
    <div className="container-fluid flex flex-col h-screen overflow-y-hidden bg-neutral-800">
      <header className="flex flex-row font-bold text-purple-200 bg-violet-900">
        <div className="flex-grow">
          <h1 className="py-2 pl-4 text-2xl">Fanuc Macro B Playground</h1>
        </div>
        <div>
          {views.map(tabName => {
            const className = `w-28 h-12 py-2 text-white ${
              activeTab === tabName ? "bg-neutral-900 rounded-tr-md rounded-tl-md" : "bg-violet-900"
            }`;

            return (
              <button key={tabName} onClick={() => setActiveTab(tabName)} className={className}>
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
            <SmallButton label={`Run \u2bc8`} onClick={onRunBtnClick} />
          </div>
          <MacroEditor contents={example} theme={editorTheme} onMount={onEditorMount} onChange={onEditorChange} />
        </section>
        <aside className="flex-grow min-h-100 bg-neutral-800">
          <CurrentView />
        </aside>
      </main>

      <footer className="border-t border-t-purple-600">
        <Footer />
      </footer>
    </div>
  );
}
