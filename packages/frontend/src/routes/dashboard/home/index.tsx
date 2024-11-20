import { useSearchParams } from "react-router-dom";
import Layout from "../layout";
import { FaRegFolderOpen } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { getUserDetails } from "../../../network/auth/auth";
import { StateContext } from "../../../context";
import { getDataInCookie, storeDataInCookie } from "../../../utils/utils";
import { ImUser } from "react-icons/im";

function DashboardHome() {
  const [params] = useSearchParams();
  // const { userData, setUserData } = useContext<any>(StateContext);
  const [user, setUser] = useState();
  const userCode = params.get("code") ?? "";
  storeDataInCookie("userCode", userCode, 1);

  useEffect(() => {
    const userCodeFromCookie = getDataInCookie("userCode");
    // if (!userCodeFromCookie) return;
    if (userCodeFromCookie !== "") {
      async function getUserData() {
        console.log("hey");
        try {
          const userDataResponse = await getUserDetails(userCodeFromCookie);

          if (userDataResponse?.statusCode === 200) {
            console.log("success");
            storeDataInCookie(
              "userDataResponse",
              JSON.stringify(userDataResponse.data),
              1
            );
          }

          console.log(
            JSON.parse(getDataInCookie("userDataResponse")),
            "I don enter jor"
          );
        } catch (error) {
          console.error(error);
        }
      }
      getUserData();
    }

    return () => {};
  }, [userCode]);

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
        </div>
      </div>
    </Layout>
  );
}

export default DashboardHome;
