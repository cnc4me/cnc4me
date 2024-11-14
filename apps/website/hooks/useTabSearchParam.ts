import { useRouter } from "next/router";

import type { ViewStr } from "../lib";

// import { useSearchParams } from "react-router-dom";

interface HookFns {
  setTabParam: (tab: ViewStr) => void;
  getTabParam: (defaultTab: ViewStr) => ViewStr;
}

export function useTabSearchParam(allowedTabs: ViewStr[]): HookFns {
  const router = useRouter();

  const hooks: HookFns = {
    getTabParam(defaultTab: ViewStr) {
      const tab = router.query?.tab as ViewStr;

      if (tab && allowedTabs.includes(tab)) {
        return tab;
      } else {
        return defaultTab;
      }
    },
    setTabParam(tab: string) {
      router.query.tab = tab;

      void router.replace({
        query: router.query
      });
    }
  };

  return hooks;
}

// export function useTabSearchParam(allowedTabs: ViewStr[]): HookFns {
//   const { query } = useRouter();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const hooks: HookFns = {
//     getTabParam(defaultTab: ViewStr) {
//       const tab = searchParams.get("tab") as ViewStr;

//       if (tab && allowedTabs.includes(tab)) {
//         return tab;
//       } else {
//         return defaultTab;
//       }
//     },
//     setTabParam(tab: string) {
//       searchParams.set("tab", tab);

//       setSearchParams(searchParams);
//     }
//   };

//   return hooks;
// }
