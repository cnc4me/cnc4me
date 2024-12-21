import { Field, Label, Switch } from "@headlessui/react";
import { OnChange, OnMount } from "@monaco-editor/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { match } from "ts-pattern";

import {
  useContentSearchParam,
  useEditorTheme,
  useExampleCode,
  useMacroRuntime,
  useTabSearchParam
} from "../hooks";
import {
  chakraPetch,
  debounce,
  DEFAULT_TAB_ON_PAGE_LOAD,
  EDITOR_ON_CHANGE_TIMEOUT
} from "../lib";
import { MacroEditor } from "./editor/MacroEditor";
import { ErrorPane } from "./ErrorPane";
import Layout from "./layout";
import { LogsContainer } from "./LogsContainer";
import {
  DebugView,
  HomeView,
  MacroView,
  OffsetView,
  ParserView,
  ToolsView
} from "./views";

import type { MonacoCodeEditor, ViewStr } from "../lib/types";
import type { IParsedLineData } from "@cnc4me/fanuc-macro-b";

const tabs: ViewStr[] = ["home", "parser", "macros", "offsets", "tools"];

export default function App(): JSX.Element {
  const router = useRouter();
  const runtime = useMacroRuntime();

  const editorRef = useRef<MonacoCodeEditor>();
  const [enabled, setEnabled] = useState(false);

  const getEditorContents = () => String(editorRef.current?.getValue());
  const setEditorContents = (input: unknown) =>
    editorRef.current?.setValue(String(input));

  const { getContentParam, setContentParam } = useContentSearchParam();

  // If there is `content=<STRING>` in the URL, use it, or if not, use the example
  const [initialContent, setInitialContent] =
    useState<string>(useExampleCode());

  const { getTabParam, setTabParam } = useTabSearchParam(tabs);
  const initialTabOnLoad = getTabParam(DEFAULT_TAB_ON_PAGE_LOAD);

  const [activeTab, setActiveTab] = useState<ViewStr>(initialTabOnLoad);
  const [editorTheme] = useEditorTheme("gcode-dark");

  const [errors, setErrors] = useState<Error[]>([]);

  // const [memory, setMemory] = useState<MacroMemoryType>(runtime.Memory);
  const memory = useMemo(() => runtime.Memory, [runtime]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [interpreterResult, setInterpreterResult] = useState<IParsedLineData[]>(
    []
  );

  const parseEditorContent = () => {
    const content = getEditorContents();

    try {
      runtime.loadProgram(content);
      const program = runtime.run();
      setInterpreterResult(program.getLines());
      // setErrors(runtime.getErrors());
    } catch (err) {
      console.error(err);
    }
  };

  const onEditorMount: OnMount = editor => {
    editorRef.current = editor;
  };

  const onEditorChange: OnChange = debounce((input?: string) => {
    if (input !== "") {
      setContentParam(input);
    }
    parseEditorContent();
  }, EDITOR_ON_CHANGE_TIMEOUT);

  const handleTabClick = (tabName: ViewStr) => {
    setTabParam(tabName);
    setActiveTab(tabName);
  };

  const handleResetButton = () => {
    runtime.reset();
    setEditorContents("");
    setContentParam("");
    setErrors([]);
  };

  const handleRunButton = () => {
    parseEditorContent();
  };

  useEffect(() => {
    if (router.isReady) {
      setInitialContent(getContentParam() ?? useExampleCode());
      setActiveTab(getTabParam("home"));
      parseEditorContent();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      const content = getContentParam();

      if (content !== "") {
        setEditorContents(content);
      }
    }
  }, [editorRef.current, router.isReady]);

  const CurrentView: React.FC<{ activeTab: ViewStr }> = ({ activeTab }) =>
    match<ViewStr>(activeTab)
      .with("home", () => <HomeView />)
      // .with("debug", () => <DebugView memory={memory} />)
      .with("parser", () => <ParserView />)
      .with("macros", () => <MacroView />)
      .with("offsets", () => <OffsetView />)
      .with("tools", () => <ToolsView />)
      .otherwise(() => <h1 className="p-10 text-red-500">View Not Found</h1>);

  console.log("Tacos");

  return (
    <Layout>
      <header className="flex flex-row font-bold text-purple-200 bg-violet-900">
        <div className="flex-grow">
          <h1 className={clsx("py-2 pl-4 text-2xl", chakraPetch.className)}>
            Macro Playground
          </h1>
        </div>
        <div>
          {tabs.map(tabName => {
            const className = `w-28 h-12 py-2 text-white ${
              activeTab === tabName
                ? "bg-neutral-900 rounded-tr-md rounded-tl-md"
                : "bg-violet-900"
            }`;

            return (
              <button
                key={tabName}
                onClick={() => handleTabClick(tabName)}
                className={className}
              >
                {tabName.toUpperCase()}
              </button>
            );
          })}
        </div>
      </header>

      <main className="flex flex-row flex-grow">
        <section className="flex flex-col w-1/2 border-r border-r-purple-600">
          <div className="flex border-b border-b-gray-900 bg-[#1E1E1E]">
            <p className="px-6 py-3 text-sm italic text-violet-100">
              {`\u00BB`} Try editing some of the values!
            </p>
            <div className="flex-grow"></div>

            <div className="flex justify-center mr-2">
              <Field className="flex content-center">
                <Label className="text-white">Auto Run</Label>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                  />
                </Switch>
              </Field>
              <button
                onClick={() => handleResetButton()}
                className="px-3 my-1.5 text-white rounded-l-md bg-red-700"
              >
                Reset
              </button>
              <button
                onClick={() => handleRunButton()}
                className="px-3 my-1.5 text-white rounded-r-md bg-green-600"
              >
                Run
              </button>
            </div>
          </div>
          <MacroEditor
            theme={editorTheme}
            contents={initialContent}
            onMount={onEditorMount}
            onChange={onEditorChange}
          />
        </section>
        <aside className="flex-1 flex-grow min-h-100 bg-neutral-800">
          <div className="flex flex-col">
            <CurrentView activeTab={activeTab} />
            <ErrorPane errors={errors} />
          </div>
        </aside>
      </main>
    </Layout>
  );
}
