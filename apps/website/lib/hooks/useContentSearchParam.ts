import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent
} from "lz-string";
import { useRouter } from "next/router";

import { unbox } from "../helpers";

interface HookFns {
  getContentParam: () => string;
  setContentParam: (content?: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useContentSearchParam(): HookFns {
  const router = useRouter();

  return {
    getContentParam() {
      if (router.query?.content) {
        const urlContent = unbox(router.query?.content);

        // `\n` or `\r` must be getting encoded to "Q"
        // const content = urlContent === "Q" ? "" : urlContent;

        return String(decompressFromEncodedURIComponent(urlContent));
        // return String(decompressFromEncodedURIComponent(content));
      } else {
        return "";
      }
    },
    setContentParam(input?: string) {
      const content = compressToEncodedURIComponent(String(input));

      router.query.content = content;

      void router.replace({ query: router.query });
    }
  };
}
