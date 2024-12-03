import React from "react";
import Navbar from "./navbar";
import Sidebar from "../../lib/sidebar";
import { ToastContainer } from "react-toastify";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="">
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <div className="flex h-full items-start relative dark:bg-black bg-white">
        <Sidebar />
        <main className="md:px-[36px] px-[20px] py-[25px] w-full ml-0 md:ml-[20%] min-h-[calc(100vh-60px)] animate-slideUp">
          <div>{children}</div>
          {/* <div className="shadow">hey</div> */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
