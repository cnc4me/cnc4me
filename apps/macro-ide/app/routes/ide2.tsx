import "@dtinsight/molecule/esm/style/mo.css";

import clsx from "clsx";
import { useRef, useState, useEffect } from "react";
import { create, Workbench } from "@dtinsight/molecule";
import { Display, SplitPane, Pane } from "@dtinsight/molecule/esm/components";
import { MenuBarMode } from "@dtinsight/molecule/esm/model/workbench/layout";
import { ActivityBarView } from "@dtinsight/molecule/esm/workbench/activityBar";
import { SidebarView } from "@dtinsight/molecule/esm/workbench/sidebar";
import { StatusBarView } from "@dtinsight/molecule/esm/workbench/statusBar";
import { MenuBarView } from "@dtinsight/molecule/esm/workbench/menuBar";
import { EditorView } from "@dtinsight/molecule/esm/workbench/editor";
import type { IWorkbench } from "@dtinsight/molecule/esm/model";

export function meta() {
  return [{ title: "Macro Editor" }];
}

const ID_APP = "macro-ide";

const moInstance = create({
  extensions: [],
});

function IDE(props: IWorkbench) {
  const {
    activityBar,
    auxiliaryBar,
    menuBar,
    panel,
    sidebar,
    statusBar,
    onPaneSizeChange,
    onWorkbenchDidMount,
    onHorizontalPaneSizeChange,
    splitPanePos,
    horizontalSplitPanePos,
  } = props;

  const getSizes = () => {
    if (panel.hidden) {
      return ["100%", 0];
    }
    if (panel.panelMaximized) {
      return [0, "100%"];
    }
    return horizontalSplitPanePos;
  };

  const getContentSize = () => {
    if (!sidebar.hidden && !auxiliaryBar.hidden) return splitPanePos;

    if (sidebar.hidden) {
      return auxiliaryBar.hidden
        ? [0, "100%", 0]
        : [0, "auto", splitPanePos[2]];
    }

    return [splitPanePos[0], "auto", 0];
  };

  const getContentSashes = () => {
    if (!sidebar.hidden && !auxiliaryBar.hidden) return true;

    if (sidebar.hidden) {
      return auxiliaryBar.hidden ? false : [false, true];
    }

    return [true, false];
  };

  const handleContentChanged = (sizes: number[]) => {
    const nextPos: number[] = [];
    nextPos[0] = sidebar.hidden ? Number(splitPanePos[0]) : sizes[0];
    nextPos[2] = auxiliaryBar.hidden ? Number(splitPanePos[2]) : sizes[2];

    nextPos[1] =
      sizes.reduce((acc, cur) => acc + cur, 0) - nextPos[0] - nextPos[2];

    onPaneSizeChange?.(nextPos);
  };

  const isMenuBarVertical =
    !menuBar.hidden && menuBar.mode === MenuBarMode.vertical;
  const isMenuBarHorizontal =
    !menuBar.hidden && menuBar.mode === MenuBarMode.horizontal;
  const horizontalMenuBar = isMenuBarHorizontal
    ? workbenchWithHorizontalMenuBarClassName
    : null;
  const hideStatusBar = statusBar.hidden ? withHiddenStatusBar : null;
  const workbenchFinalClassName = clsx(
    workbenchClassName,
    horizontalMenuBar,
    hideStatusBar,
  );

  useEffect(() => {
    // call onWorkbenchDidMount after the first render
    onWorkbenchDidMount?.();
  }, []);

  return (
    <div id={ID_APP} className={appClassName}>
      <div className={workbenchFinalClassName}>
        <Display visible={isMenuBarHorizontal}>
          <MenuBarView mode={MenuBarMode.horizontal} />
        </Display>
        <div className={mainBenchClassName}>
          <div className={compositeBarClassName}>
            <Display visible={isMenuBarVertical}>
              <MenuBarView mode={MenuBarMode.vertical} />
            </Display>
            <Display
              visible={!activityBar.hidden}
              className={displayActivityBarClassName}
            >
              <ActivityBarView />
            </Display>
          </div>
          <SplitPane
            sizes={sidebar.hidden ? [0, "100%"] : splitPanePos}
            split="vertical"
            allowResize={[false]}
            onChange={handleSideBarChanged}
            onResizeStrategy={() => ["keep", "pave"]}
          >
            <Pane minSize={170} maxSize="80%">
              <SidebarView />
            </Pane>
            <SplitPane
              sizes={getSizes()}
              allowResize={[false]}
              split="horizontal"
              onChange={handleEditorChanged}
              onResizeStrategy={() => ["pave", "keep"]}
            >
              <Pane minSize="10%" maxSize="80%">
                <EditorView />
              </Pane>
              <PanelView />
            </SplitPane>
          </SplitPane>
        </div>
      </div>
      <Display visible={!statusBar.hidden}>
        <StatusBarView />
      </Display>
    </div>
  );
}

export default function route_ide2() {
  return moInstance.render(<Workbench />);
}
