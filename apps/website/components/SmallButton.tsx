import React from "react";

interface Props {
  onClick: () => unknown;
  label: string;
}

export const SmallButton: React.FC<Props> = ({ onClick, label }) => {
  const buttonClass =
    "px-3 mr-2 my-1.5 text-white border-1 rounded-md border-violet-600 bg-violet-700";

  return (
    <button onClick={onClick} className={buttonClass}>
      {label}
    </button>
  );
};
