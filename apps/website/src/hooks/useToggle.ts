import { useState } from "react";

export default function useToggle(init: boolean) {
  const [value, setValue] = useState<boolean>(init);
  const toggleValue = () => setValue(!value);

  return [value, toggleValue] as const;
}
