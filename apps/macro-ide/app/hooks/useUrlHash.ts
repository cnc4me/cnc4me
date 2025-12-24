import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Get the (#hash) portion of the URL
 */
export function useUrlHash(initialValue?: string) {
  const location = useLocation();
  const [hash, setHash] = useState<string>(initialValue ?? "");

  useEffect(() => {
    if (location.hash) {
      setHash(location.hash.substring(1));
    } else if (initialValue !== undefined) {
      setHash(initialValue);
    }
  }, [location.hash, initialValue]);

  return [hash, setHash] as const;
}
