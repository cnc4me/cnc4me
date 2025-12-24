import { useState } from "react";

export function useToggle(init: boolean) {
  const [value, setValue] = useState<boolean>(init);
  const toggleValue = () => setValue(!value);

  return [value, toggleValue] as const;
}
