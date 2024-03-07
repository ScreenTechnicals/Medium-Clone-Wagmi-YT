import { Footer, Header } from "@/components";
import React from "react";
import { Toaster } from "react-hot-toast";

export const LayoutProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="selection:bg-[#00bb1c]">
      <Header />
      <Toaster position="top-center" />
      {children}
      <Footer />
    </div>
  );
};
