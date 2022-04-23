import React from "react";

import { LargeButton } from "./LargeButton";

export const PagerButtons: React.FC<{
  onPageLeft: () => void;
  pageCount: number;
  onPageRight: () => void;
}> = ({ onPageLeft, pageCount, onPageRight }) => {
  return (
    <div className="flex flex-row justify-center py-4">
      <LargeButton label={<>&laquo; Page</>} onClick={() => onPageLeft()} />
      <div className="px-8 py-2 text-white">
        Page <span className="text-violet-300">{pageCount}</span>
      </div>
      <LargeButton label={<>Page &raquo;</>} onClick={() => onPageRight()} />
    </div>
  );
};
