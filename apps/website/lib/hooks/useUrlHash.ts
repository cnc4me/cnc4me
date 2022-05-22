import { useRouter } from "next/router";
import { useState } from "react";

/**
 * Get the (#hash) portion of the url
 */
export function useUrlHash(initialValue?: string) {
  const router = useRouter();
  const [hash, setHash] = useState<string>(initialValue ?? "");

  const match = router.asPath.match(/.?#(.+)/);

  if (match) {
    setHash(match[1]);
  }

  return [hash, setHash];
}
