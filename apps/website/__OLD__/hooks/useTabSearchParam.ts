import { useSearchParams } from "react-router-dom";

import { ViewStr } from "../types";

interface HookFns {
  getTabParam: (defaultTab: ViewStr) => ViewStr;
  setTabParam: (tab: ViewStr) => void;
}

export function useTabSearchParam(allowedTabs: ViewStr[]): HookFns {
  const [searchParams, setSearchParams] = useSearchParams();

  const hooks: HookFns = {
    getTabParam(defaultTab: ViewStr) {
      const tab = searchParams.get("tab") as ViewStr;

      if (tab && allowedTabs.includes(tab)) {
        return tab;
      } else {
        return defaultTab;
      }
    },
    setTabParam(tab: string) {
      searchParams.set("tab", tab);

      setSearchParams(searchParams);
    }
  };

  return hooks;
}
