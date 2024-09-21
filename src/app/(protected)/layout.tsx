import NavBar from "@/components/NavBar";
import React from "react";

const ProtectedRouteLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <NavBar />
      <main className="m-auto">{children}</main>
    </>
  );
};

export default ProtectedRouteLayout;
