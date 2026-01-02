import { useState } from "react";
import { App, DOCUMENTS } from "./components";
import type { Document } from "./components";

export interface VisualStudioCodeProps {
  activityBar?: boolean;
  primarySideBar?: boolean;
  primarySideBarPosition?: "left" | "right";
  secondarySideBar?: boolean;
}

export default function VisualStudioCode({
  activityBar = true,
  primarySideBar = true,
  primarySideBarPosition = "left",
  secondarySideBar = true,
}: VisualStudioCodeProps) {
  const [editorVisible, setEditorVisible] = useState(true);
  const [panelVisible, setPanelVisible] = useState(true);
  const [activity, setActivity] = useState(0);
  const [openEditors, setOpenEditors] = useState<Document[]>(DOCUMENTS);

  return (
    <div className="p-0 m-0 w-full h-screen overflow-hidden">
      <App
        activity={activity}
        activityBar={activityBar}
        editorVisible={editorVisible}
        panelVisible={panelVisible}
        openEditors={openEditors}
        primarySideBar={primarySideBar}
        primarySideBarPosition={primarySideBarPosition}
        secondarySideBar={secondarySideBar}
        onActivityChanged={setActivity}
        onEditorVisibleChanged={setEditorVisible}
        onOpenEditorsChanged={setOpenEditors}
        onPanelVisibleChanged={setPanelVisible}
      />
    </div>
  );
}
