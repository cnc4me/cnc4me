import React from "react";

// import Alert from "./alert";
import Footer from "./footer";
import Meta from "./meta";

interface Props {
  preview?: boolean;
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Layout: React.FC<Props> = ({ preview, children }) => {
  return (
    <>
      <Meta />
      <div className="flex flex-col h-screen overflow-y-hidden container-fluid bg-neutral-800">
        {/* <Alert preview={preview} /> */}
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
