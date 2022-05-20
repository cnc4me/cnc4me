import { useRouter } from "next/router";

// import { useSearchParams } from "react-router-dom";
import { ViewStr } from "../../types";

interface HookFns {
  getTabParam: (defaultTab: ViewStr) => ViewStr;
  setTabParam: (tab: ViewStr) => void;
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
      void router.push({ query: { tab } });
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
