const Link: React.FC<{ href: string }> = ({ href, children }) => (
  <a className="text-purple-500 text-bold hover:text-purple-300" href={href}>
    {children}
  </a>
);

export const Footer: React.FC = () => {
  return (
    <div className="flex flex-row text-purple-100 bg-neutral-900">
      <div className="p-2 text-sm">
        View <Link href="https://github.com/cnc4me/cnc4me/tree/main/packages/fanuc-macro-b">on Github</Link>
      </div>
      <div className="flex-grow text-center p-2 text-sm">
        <Link href="https://github.com/cnc4me/cnc4me">CNC 4 ME</Link> © 2022
      </div>
      <div className="p-2 text-sm">
        Made By <Link href="https://github.com/kevinkhill">Kevin Hill</Link>
      </div>
    </div>
  );
};
