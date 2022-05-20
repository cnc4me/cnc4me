import clsx from "clsx";
import React from "react";

interface Props {
  preview?: boolean;
}

const EmptyAlert = <></>;

const PreviewMode = (
  <>
    This page is a preview.{" "}
    <a href="/api/exit-preview" className="underline transition-colors duration-200 hover:text-teal-300">
      Click here
    </a>{" "}
    to exit preview mode.
  </>
);

function Alert({ preview }: Props) {
  return (
    <div
      className={clsx("border-b", {
        "bg-neutral-800 border-neutral-800 text-white": preview,
        "bg-fuchsia-900/50 border-fuchsia-800": !preview
      })}
    >
      <div className="container px-5 mx-auto">
        <div className="py-2 text-sm text-center">{preview ? PreviewMode : EmptyAlert}</div>
      </div>
    </div>
  );
}

export default Alert;
