import { useSearchParams } from "react-router-dom";
import type { ViewStr } from "~/types";

interface HookFns {
  setTabParam: (tab: ViewStr) => void;
  getTabParam: (defaultTab: ViewStr) => ViewStr;
}

export function useTabSearchParam(allowedTabs: ViewStr[]): HookFns {
  const [searchParams, setSearchParams] = useSearchParams();

  return {
    getTabParam(defaultTab: ViewStr) {
      const tab = searchParams.get("tab") as ViewStr | null;

      if (tab && allowedTabs.includes(tab)) {
        return tab;
      }
      return defaultTab;
    },

    setTabParam(tab: ViewStr) {
      const params = new URLSearchParams(searchParams);
      params.set("tab", tab);

      setSearchParams(params, { replace: true });
    },
  };
}
