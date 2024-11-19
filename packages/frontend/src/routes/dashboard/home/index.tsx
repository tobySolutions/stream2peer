import { useSearchParams } from "react-router-dom";
import Layout from "../layout";
import { FaRegFolderOpen } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { getUserDetails } from "../../../network/auth/auth";
import { StateContext } from "../../../context";

function DashboardHome() {
  const [params] = useSearchParams();
  const { userData, setUserData } = useContext<any>(StateContext);
  const userCode = params.get("code") ?? "";

  // useEffect(() => {
  //   if (!userCode) return;

  //   async function getUserData() {
  //     console.log("hey");
  //     try {
  //       const userDataResponse = await getUserDetails(userCode);
  //       setUserData(userDataResponse);
  //       console.log(userData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   getUserData();

  //   return () => {};
  // }, []);

  function getUserDataFromButtonCLick() {
    console.log("kilode");
    try {
      const userDataResponse = getUserDetails(userCode);
      setUserData(userDataResponse);
      console.log(userData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout>
      <div className="text-primary-white ">
        <h1 className="text-2xl">SetUp a project to get started</h1>
        <div className="border border-primary-border w-ful flex justify-center my-6 flex-col items-center gap-4 rounded-lg py-16 border-dashed px-36">
          <div className=""></div>
          <FaRegFolderOpen size={40} />
          <a href="/dashboard/projects" className="underline">
            Add new project.
          </a>
        </div>
        <div>
          <p>
            Enable multistreaming by connecting your stream2peer account to
            different social platforms.{" "}
            <a href="/dashboard/destination" className="underline opacity-90">
              start multistreaming
            </a>
          </p>
          <button className="bg-yellow-500" onClick={getUserDataFromButtonCLick}>
            Use code to get data
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default DashboardHome;
