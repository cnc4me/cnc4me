import React from "react";

interface LargeButtonProps {
  disabled?: boolean;
  onClick: () => unknown;
  label: string | JSX.Element;
}

export const LargeButton: React.FC<LargeButtonProps> = ({
  onClick,
  label,
  disabled = false
}) => {
  const baseStyle = "w-32 py-2 border-2 rounded-lg";
  const enabledStyle = `${baseStyle} text-white border-violet-600 bg-violet-700`;
  const disabledStyle = `${baseStyle} text-gray-400 border-gray-500 bg-gray-600`;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={disabled ? disabledStyle : enabledStyle}
    >
      {label}
    </button>
  );
};
