import React from "react";

import { LargeButton } from "./LargeButton";

interface PagerButtonProps {
  pageCount: number;
  onPageLeft: () => void;
  onPageRight: () => void;
}

export const PagerButtons: React.FC<PagerButtonProps> = ({ onPageLeft, pageCount, onPageRight }) => {
  return (
    <div className="flex flex-row justify-center py-4">
      <LargeButton label={<>&laquo; Page</>} onClick={onPageLeft} disabled={pageCount === 1} />
      <div className="px-8 py-2 text-white">
        Page <span className="text-violet-300">{pageCount}</span>
      </div>
      <LargeButton label={<>Page &raquo;</>} onClick={onPageRight} />
    </div>
  );
};
