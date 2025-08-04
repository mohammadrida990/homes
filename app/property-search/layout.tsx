import React from "react";

const Layout = ({
  children,
  model,
}: {
  children: React.ReactNode;
  model: React.ReactNode;
}) => {
  return (
    <>
      {children}
      {model}
    </>
  );
};

export default Layout;
