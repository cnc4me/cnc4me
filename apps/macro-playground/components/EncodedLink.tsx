import React from "react";

import { Link } from "./Link";

type Props = React.PropsWithChildren<{
  tab: string;
  label: string;
  content: string;
}>;

export const EncodedLink: React.FC<Props> = ({ content, tab, label }) => (
  <Link href={`/?tab=${tab}&content=${content}`}>{label}</Link>
);
