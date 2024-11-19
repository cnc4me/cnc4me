import { Console, Decode, Hook, Unhook } from "console-feed";
import React, { useEffect, useState } from "react";

type Message = ReturnType<typeof Decode>;

export const LogsContainer = () => {
  const [logs, setLogs] = useState<Message[]>([]);

  // run once!
  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      log => setLogs(currLogs => [...currLogs, log]),
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
