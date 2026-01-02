/** biome-ignore-all lint/a11y/useValidAnchor: <explanation> */
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";
import { useRef } from "react";

export type PanelProps = {
  maximized: boolean;
  onClose: () => void;
  onMaximize: () => void;
  onMinimize: () => void;
};

export const Panel = ({
  maximized,
  onClose,
  onMaximize,
  onMinimize,
}: PanelProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <TabGroup>
      <div className="flex h-full w-full flex-col bg-neutral-900 border-l border-r border-neutral-500/40">
        {/* Title bar */}
        <div className="flex h-9 flex-none justify-between overflow-hidden px-2">
          {/* Left action bar (tabs) */}
          <div className="leading-7">
            <TabList className="flex h-full w-full items-center p-0 m-0">
              <Tab
                className={({ selected }) =>
                  clsx(
                    "relative flex cursor-pointer items-center justify-center px-2.5 py-0.5 text-xs uppercase outline-none",
                    selected && "font-medium",
                  )
                }
              >
                {({ selected }) => (
                  <>
                    <span className="rounded-md p-1 hover:bg-neutral-600/30">
                      Terminal
                    </span>

                    {selected && (
                      <div className="pointer-events-none absolute inset-x-2.5 -top-1 h-full overflow-hidden z-10">
                        <div className="absolute bottom-0 h-0 w-full border-t border-neutral-400/60" />
                      </div>
                    )}
                  </>
                )}
              </Tab>
            </TabList>
          </div>

          {/* Right actions */}
          <div>
            <ul className="flex h-full w-full list-none items-center p-0 m-0">
              <li>
                {maximized ? (
                  <button
                    className={clsx(
                      "codicon codicon-chevron-down",
                      "rounded-md p-1 text-xs hover:bg-neutral-600/30",
                    )}
                    type="button"
                    title="Minimize Panel Size"
                    onClick={onMinimize}
                  />
                ) : (
                  <button
                    className={clsx(
                      "codicon codicon-chevron-up",
                      "rounded-md p-1 text-xs hover:bg-neutral-600/30",
                    )}
                    type="button"
                    title="Maximize Panel Size"
                    onClick={onMaximize}
                  />
                )}
              </li>
              <li>
                <button
                  className={clsx(
                    "codicon codicon-close",
                    "rounded-md p-1 text-xs hover:bg-neutral-600/30",
                  )}
                  type="button"
                  title="Close Panel"
                  onClick={onClose}
                />
              </li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <TabPanels className="relative flex-1">
          <TabPanel className="h-full">
            {/* Terminal content */}
            {/* <div ref={ref} className="h-full px-5" /> */}
          </TabPanel>
        </TabPanels>
      </div>
    </TabGroup>
  );
};
