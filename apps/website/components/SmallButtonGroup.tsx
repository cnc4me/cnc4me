import React from "react";

interface Props {
  onClick: () => unknown;
  label: string;
}

export const SmallButtonGroup: React.FC<Props> = ({ onClick, label }) => {
  const className = `px-3 mr-2 my-1.5 text-white border-1 rounded-md border-violet-600 bg-violet-700`;

  return (
    <div className="flex">
      <button onClick={() => onClick()} className={className}>
        {label}
      </button>
    </div>
  );
};
