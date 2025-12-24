import MacroIDE from "~/ide/MacroIDE";
import type { Route } from "./+types/root";

// biome-ignore lint/correctness/noEmptyPattern: shhh
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function route_root() {
  return <MacroIDE />;
}
