import React from "react";
import Navbar from "../../lib/navbar";
import Sidebar from "../../lib/sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <div className="flex w-full relative min-h-screen bg-black">
        <Sidebar />
        <main className="flex-[0_0_80%] md:flex-[0_0_100%] p-5 mt-[80px]  animate-slideUp">
          {children}
        </main>
      </div>
    </>
  );
}

export default Layout;
