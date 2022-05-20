import { compressToEncodedURIComponent } from "lz-string";

interface HookFns {
  getContentParam: () => string;
  setContentParam: (content?: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useContentSearchParam(initialValue = ""): HookFns {
  return {
    getContentParam() {
      return "";
    },
    setContentParam(content?: string) {
      const encoded = compressToEncodedURIComponent(String(content));

      // searchParams.set("content", encoded);
      console.log(encoded);
    }
  };
}

// export function useContentSearchParam(initialValue = ""): HookFns {
//   const [searchParams, setSearchParams] = useSearchParams(initialValue);

//   return {
//     getContentParam() {
//       return String(searchParams.get("content"));
//     },
//     setContentParam(content?: string) {
//       const encoded = compressToEncodedURIComponent(String(content));

//       searchParams.set("content", encoded);

//       setSearchParams(searchParams);
//     }
//   };
// }
