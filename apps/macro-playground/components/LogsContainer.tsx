import { Console, Decode, Encode, Hook, Unhook } from "console-feed";
import React, { useEffect, useState } from "react";

// type Message = ReturnType<typeof Decode> & { id: string; data: any[] };
type Message = Parameters<Parameters<typeof Hook>[1]>[0];

export const LogsContainer = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [logs, setLogs] = useState<any[]>([]);

  // run once!
  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      log => setLogs(currLogs => [...currLogs, log.data]),
      false
    );
    return () => {
      Unhook(hookedConsole);
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#242424" }}>
      <Console logs={logs} variant="dark" />
    </div>
  );
};
