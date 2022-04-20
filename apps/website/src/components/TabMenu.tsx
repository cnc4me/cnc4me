import { TabStr } from "../types";

export const TabMenu: React.FC<{ tabActivator: (tab: TabStr) => unknown; tabs: TabStr[]; activeTab: TabStr }> = ({
  tabs,
  activeTab,
  tabActivator
}) => {
  return (
    <>
      {tabs.map(tabName => {
        return (
          <button
            key={tabName}
            onClick={() => tabActivator(tabName)}
            className={`w-32 h-12 py-2 text-white ${
              activeTab === tabName ? "bg-neutral-800 rounded-tr-md rounded-tl-md" : "bg-violet-900"
            }`}
          >
            {tabName.toUpperCase()}
          </button>
        );
      })}
    </>
  );
};
