import { useState } from "react";

import { useTabSearchParam } from "../hooks";
import { DEFAULT_TAB_ON_PAGE_LOAD } from "../lib/constants";
import { ViewStr } from "../lib/types";

interface Props {
  tabs: ViewStr[];
  onTabChange: (activeTab: ViewStr) => void;
}

export default function Header({ tabs, onTabChange }: Props): JSX.Element {
  const { getTabParam, setTabParam } = useTabSearchParam(tabs);

  const initialTabOnLoad = getTabParam(DEFAULT_TAB_ON_PAGE_LOAD);

  const [activeTab, setActiveTab] = useState<ViewStr>(initialTabOnLoad);

  const handleTabClick = (tabName: ViewStr) => {
    setTabParam(tabName);
    setActiveTab(tabName);
    onTabChange(tabName);
  };

  return (
    <header className="flex flex-row font-bold text-purple-200 bg-violet-900">
      <div className="flex-grow">
        <h1 className="py-2 pl-4 text-2xl">Macro Playground</h1>
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
  );
}
