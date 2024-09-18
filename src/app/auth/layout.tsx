import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full min-h-[100dvh] flex justify-center items-center">
      {children}
    </main>
  );
};

export default AuthLayout;
