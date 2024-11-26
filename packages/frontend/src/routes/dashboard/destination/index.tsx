import { useEffect, useState } from "react";
import Layout from "../layout";
import { MdOutlineLinkOff } from "react-icons/md";
import { IoIosArrowBack, IoLogoYoutube } from "react-icons/io";
import SocialMediaCards from "../../../lib/components/socialCards";
import { validateTwitch, validateYouTube } from "../../../network/streams/streams-api";
import { useLocation, useParams } from "react-router-dom";
import { getDataInCookie } from "../../../utils/utils";
import { ImTwitch } from "react-icons/im";

export const Destination = () => {
  const [viewDestinations, setViewDestinations] = useState(true);
  const [destinationData, setDestinationData] = useState([]);

  const location = useLocation(); // Access the location object
  const queryParams = new URLSearchParams(location.search);

  const handleTwitchValidation = async () => {
    try {
      const response = await validateTwitch(queryParams.get("code")!);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleYouTubeValidation = async () => {
    try {
      const response = await validateYouTube(queryParams.get("code")!);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (
      queryParams.get("code") &&
      queryParams.get("scope") !== "https://www.googleapis.com/auth/youtube"
    ) {
      handleTwitchValidation();
    }
    if (
      queryParams.get("code") &&
      queryParams.get("scope") == "https://www.googleapis.com/auth/youtube"
    ) {
      handleYouTubeValidation();
    }

    const userData = JSON.parse(getDataInCookie("userDataResponse"));
    if (userData?.data?.platforms) {
      setDestinationData(userData?.data?.platforms);
    }
  }, []);

  return (
    <Layout>
      <div className="text-primary-white">
        {!viewDestinations && (
          <div
            onClick={() => setViewDestinations(true)}
            className="flex gap-2 py-2 cursor-pointer items-center text-white"
          >
            <IoIosArrowBack />
            Back
          </div>
        )}
        {viewDestinations && (
          <div className="flex w-full justify-between items-center">
            <h1>Connect seemlessly to other social platforms </h1>
            <button
              onClick={() => setViewDestinations(false)}
              className="bg-dark-gray text-white px-4 py-2 rounded hover:bg-dark-gray border border-primary-border text-[14px] transition"
            >
              Add destination
            </button>
          </div>
        )}
        {viewDestinations ? (
          <div className="mt-6">
            <h2>Destinations connected</h2>
            {destinationData?.length === 0 ? (
              <div className="border border-primary-border w-ful flex justify-center flex-col items-center gap-4 rounded-lg py-16 border-dashed px-36 my-6">
                <MdOutlineLinkOff size={40} />
                <div className="">
                  <p>No destination added yet.</p>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <ul className="flex gap-3 flex-wrap">
                  {destinationData?.map((platform, indx) => (
                    <div key={indx} className="">
                      {platform == "Twitch" ? (
                        <div className="bg-[#9147ff] w-48 text-white px-4 py-3  rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-[#9147ffbe] transition">
                          <ImTwitch />
                          <span>Twitch</span>
                        </div>
                      ) : platform == "Youtube" ? (
                        <div className="bg-red-600 text-white px-4 py-3  rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-red-700 transition">
                          <IoLogoYoutube />
                          <span>YouTube Channel</span>
                        </div>
                      ) : (
                        ""
                      )}
                    
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-6">
            <p>
              Connect an account to Stream2Peer. Once connected, you can stream
              to it as often as you like.
            </p>
            <div className="my-4">
              <SocialMediaCards />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
