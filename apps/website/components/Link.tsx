export const Link: React.FC<{ href: string }> = ({ href, children }) => (
  <a className="text-purple-500 text-bold hover:text-purple-300" href={href}>
    {children}
  </a>
);
