// import Mousetrap, { ExtendedKeyboardEvent } from "mousetrap";
// import { useEffect } from "react";

// // type BindParams = Parameters<typeof Mousetrap.bind>;
// type Bindings = Record<string, (e: ExtendedKeyboardEvent) => unknown>;

// export default function useMousetrap(keybindings: Bindings) {
//   useEffect(() => {
//     Object.entries(keybindings).forEach(([key, fn]) =>
//       Mousetrap.bind(`${key}`, e => {
//         e.preventDefault();
//         return fn(e);
//       })
//     );

//     return () =>
//       Object.keys(keybindings).forEach(key => {
//         Mousetrap.unbind(key);
//       });
//   }, [keybindings]);
// }
export {};
