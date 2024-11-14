import React from "react";

type Props = React.PropsWithChildren<{ href: string }>;

export const Link: React.FC<Props> = ({ href, children }) => (
  <a className="text-purple-500 text-bold hover:text-purple-300" href={href}>
    {children}
  </a>
);
