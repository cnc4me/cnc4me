import { useSearchParams } from "react-router-dom";
import { decodeLZString, encodeLZString, unbox } from "~/lib";

interface HookFns {
  getContentParam: () => string | undefined;
  setContentParam: (content?: string) => void;
}

export function useContentSearchParam(): HookFns {
  const [searchParams, setSearchParams] = useSearchParams();

  return {
    getContentParam() {
      const raw = searchParams.get("content");
      if (!raw) return undefined;

      const urlContent = unbox(raw);
      return decodeLZString(urlContent);
    },

    setContentParam(input?: string) {
      const params = new URLSearchParams(searchParams);

      if (input == null) {
        params.delete("content");
      } else {
        params.set("content", encodeLZString(input));
      }

      setSearchParams(params, { replace: true });
    },
  };
}
