import React from "react";
import Navbar from "../../lib/navbar";
import Sidebar from "../../lib/sidebar";
import { IoIosArrowBack } from "react-icons/io";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="">
      <Navbar />
      <div className="flex h-full items-start relative bg-black">
        <Sidebar />
        <main className="p-6 w-full ml-[20%] min-h-[calc(100vh-60px)] animate-slideUp">
         
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
