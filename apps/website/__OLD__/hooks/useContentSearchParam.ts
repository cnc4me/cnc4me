import { compressToEncodedURIComponent } from "lz-string";
import { useSearchParams } from "react-router-dom";

interface HookFns {
  getContentParam: () => string;
  setContentParam: (content?: string) => void;
}

export function useContentSearchParam(initialValue = ""): HookFns {
  const [searchParams, setSearchParams] = useSearchParams(initialValue);

  return {
    getContentParam() {
      return String(searchParams.get("content"));
    },
    setContentParam(content?: string) {
      const encoded = compressToEncodedURIComponent(String(content));

      searchParams.set("content", encoded);

      setSearchParams(searchParams);
    }
  };
}
