import { clsx } from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import ErrorPane from "~/components/ErrorPane";
import Footer from "~/components/Footer";
import {
  useContentSearchParam,
  useEditorTheme,
  useMacroRuntime,
  useTabSearchParam,
} from "~/hooks";
import { EDITOR_ON_CHANGE_TIMEOUT, EXAMPLE_CODE } from "~/lib";
import HomeView from "./tabs/HomeView";
import MacroView from "./tabs/MacroView";
import OffsetView from "./tabs/OffsetView";
import ParserView from "./tabs/ParserView";
import ToolsView from "./tabs/ToolsView";
import type { IParsedLineData } from "@cnc4me/fanuc-macro-b";
import type { OnChange, OnMount } from "@monaco-editor/react";
import type { JSX } from "react";
import type { MonacoCodeEditor, ViewStr } from "~/types";
import MacroEditor from "~/components/editor/MacroEditor";

/* ------------------------------------------------------------------ */
/* Tabs configuration (Home is NOT a tab)                              */
/* ------------------------------------------------------------------ */

type TabConfig = {
  key: ViewStr;
  label: string;
  Panel: () => JSX.Element;
};

export const TAB_CONFIG: TabConfig[] = [
  { key: "parser", label: "parser", Panel: ParserView },
  { key: "macros", label: "macros", Panel: MacroView },
  { key: "offsets", label: "offsets", Panel: OffsetView },
  { key: "tools", label: "tools", Panel: ToolsView },
];

export const TABS: ViewStr[] = TAB_CONFIG.map((t) => t.key);

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function MacroIDE(): JSX.Element {
  const runtime = useMacroRuntime();
  const editorRef = useRef<MonacoCodeEditor>(null);

  const { getContentParam, setContentParam } = useContentSearchParam();
  const { getTabParam, setTabParam } = useTabSearchParam(TABS);

  const [editorTheme] = useEditorTheme("gcode-dark");
  const [editorValue, setEditorValue] = useState<string>(() => {
    const fromUrl = getContentParam();
    if (fromUrl && fromUrl.length > 0) {
      return fromUrl;
    }
    return EXAMPLE_CODE;
  });

  const initialTab = getTabParam("home");
  const [activeTab, setActiveTab] = useState<ViewStr>(initialTab);

  const [errors, setErrors] = useState<Error[]>([]);
  const [, setInterpreterResult] = useState<IParsedLineData[]>([]);

  const ActivePanel = useMemo(() => {
    if (activeTab === "home") {
      return HomeView;
    }

    return TAB_CONFIG.find((t) => t.key === activeTab)?.Panel ?? HomeView;
  }, [activeTab]);

  const parseAndRun = (programText: string) => {
    try {
      runtime.loadProgram(programText);
      const program = runtime.run();
      if (program) setInterpreterResult(program.getLines());
      setErrors([]);
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      console.error(err);
      setErrors([err]);
    }
  };

  useEffect(() => {
    parseAndRun(editorValue);
    setContentParam(editorValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedParseAndRun = useDebouncedCallback((value: string) => {
    setContentParam(value);
    parseAndRun(value);
  }, EDITOR_ON_CHANGE_TIMEOUT);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEditorValue(value);
    debouncedParseAndRun(value);
  };

  const handleTabChange = (tab: ViewStr) => {
    setTabParam(tab);
    setActiveTab(tab);
  };

  const handleReset = () => {
    runtime.reset();
    setEditorValue("");
    setContentParam("");
    setErrors([]);
    setInterpreterResult([]);
  };

  const handleRunClick = () => {
    parseAndRun(editorValue);
  };

  const onEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const onEditorChange: OnChange = (input?: string) => {
    console.log(input);
  };

  return (
    <div className="flex h-screen flex-col overflow-y-hidden bg-neutral-800">
      <header className="flex bg-violet-900 font-bold text-purple-200">
        <div className="grow">
          <h1 className="py-2 pl-4 text-2xl font-mode-nine">
            <button
              type="button"
              onClick={() => handleTabChange("home")}
              className="hover:cursor-pointer"
            >
              Macro Playground
            </button>
          </h1>
        </div>

        <nav className="flex">
          {TAB_CONFIG.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleTabChange(key)}
              className={clsx(
                "h-12 w-28 py-2 text-white hover:cursor-pointer",
                activeTab === key
                  ? "rounded-t-md bg-neutral-800"
                  : "bg-violet-900",
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex grow">
        <section className="flex w-1/2 flex-col border-r border-purple-600">
          <div className="flex border-b border-gray-900 bg-[#1E1E1E]">
            <p className="px-6 py-3 text-sm italic text-violet-100">
              » Try editing some of the values!
            </p>

            <div className="ml-auto mr-2 flex">
              <button
                type="button"
                onClick={handleReset}
                className="my-1.5 rounded-l-md bg-red-700 px-3 text-white"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleRunClick}
                className="my-1.5 rounded-r-md bg-green-600 px-3 text-white"
              >
                Run
              </button>
            </div>
          </div>

          <MacroEditor
            theme={editorTheme}
            contents={editorValue}
            onMount={onEditorMount}
            onChange={onEditorChange}
          />
        </section>

        <aside className="flex flex-1 bg-neutral-800">
          <div className="flex w-full flex-col">
            <div className="flex-1 overflow-auto p-3">
              <ActivePanel />
            </div>
          </div>
        </aside>
      </main>
      {errors.length > 0 && <ErrorPane errors={errors} />}

      <Footer />
    </div>
  );
}
