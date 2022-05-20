import { Link } from "./Link";

export default function Footer() {
  return (
    <div className="flex flex-row text-purple-100 bg-neutral-900">
      <div className="p-2 text-sm">
        Sources on <Link href="https://github.com/cnc4me/cnc4me/tree/main/packages/fanuc-macro-b">Github</Link>
      </div>
      <div className="flex-grow p-2 text-sm text-center">
        <Link href="https://github.com/cnc4me/cnc4me">CNC4ME</Link> © 2022
      </div>
      <div className="p-2 text-sm">
        Made By <Link href="https://github.com/kevinkhill">Kevin Hill</Link>
      </div>
    </div>
  );
}
