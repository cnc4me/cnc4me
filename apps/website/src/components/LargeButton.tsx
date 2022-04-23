import React from "react";

export const LargeButton: React.FC<{ onClick: () => unknown; label: JSX.Element }> = ({ onClick, label }) => {
  return (
    <button
      onClick={() => onClick()}
      className="w-32 py-2 text-white border-2 rounded-lg border-violet-600 bg-violet-700"
    >
      {label}
    </button>
  );
};
