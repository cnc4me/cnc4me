import { useRef, useState, lazy, Suspense } from "react";
import { create, Workbench } from "@dtinsight/molecule";
import "@dtinsight/molecule/esm/style/mo.css";

const moInstance = create({
  extensions: [],
});

export function meta() {
  return [{ title: "Macro Editor" }];
}

export default function route_molecule() {
  return moInstance.render(<Workbench />);
}
