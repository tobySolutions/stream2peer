import { useEffect, useRef, useState } from "react";
import Layout from "../layout";
import { MdOutlineLinkOff } from "react-icons/md";
import { IoIosArrowBack, IoLogoYoutube } from "react-icons/io";
import SocialMediaCards from "../../../lib/components/socialCards";
import {
  disconnectPlatform,
  validateTwitch,
  validateYouTube,
} from "../../../network/streams/streams-api";
import { useLocation } from "react-router-dom";
import { ImTwitch } from "react-icons/im";
import { toast } from "react-toastify";
import { fetchPlatforms } from "../../../network/projects/projects";
import { EmptyCard } from "../../../lib/components/emptyCard";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Loader } from "../../../lib/Loader";

export const Destination = () => {
  const [viewDestinations, setViewDestinations] = useState(true);
  const [destinationData, setDestinationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDisconnected, setOpenDisconnected] = useState({
    twitch: false,
    youtube: false,
  });

  const dropdownRef = useRef(null);

  const OutsideClickListener = (ref: any, callback: () => void) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
  };

  OutsideClickListener(dropdownRef, () => {
    setOpenDisconnected({ youtube: false, twitch: false });
  });
  const location = useLocation(); // Access the location object
  const queryParams = new URLSearchParams(location.search);

  const handleTwitchValidation = async () => {
    try {
      await validateTwitch(queryParams.get("code")!);
      toast.success("Twitch validation successful");
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  };
  const fetchPlatformsData = async () => {
    setLoading(true);
    try {
      const response = await fetchPlatforms();
      response?.data?.platforms
        ? setDestinationData(response?.data?.platforms)
        : setDestinationData([]);
    } catch (err: any) {
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message);
      } else {
        toast.error(err?.message);
      }
    }
    setLoading(false);
  };

  const handleYouTubeValidation = async () => {
    try {
      await validateYouTube(queryParams.get("code")!);
      toast.success("YouTube validation successfull");
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  };

  useEffect(() => {
    fetchPlatformsData();

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
  }, []);

  const handleDisconnect = async (platform: "Twitch" | "Youtube") => {
    try {
      const response = await disconnectPlatform(platform);
      toast.success(response?.message);
      setOpenDisconnected({ twitch: false, youtube: false });
      window.location.reload();
    } catch (error: any) {
      toast.error(error?.message) || toast.error("An error occured");
    }
  };

  return (
    <Layout>
      <div className="text-primary-white">
        {!viewDestinations && (
          <div
            onClick={() => setViewDestinations(true)}
            className="flex gap-2 py-2 cursor-pointer items-center text-black dark:text-white"
          >
            <IoIosArrowBack />
            Back
          </div>
        )}
        {viewDestinations && (
          <div className="flex gap-4 w-full justify-between items-center flex-wrap">
            <h1 className="md:text-[18px] text-[16px]">
              Connect seemlessly to other social platforms{" "}
            </h1>
            <button
              onClick={() => setViewDestinations(false)}
              className="dark:bg-dark-gray bg-primary text-white px-4 py-2 rounded border border-primary-border hover:bg-primary/90 text-[13px] md:text-[14px] transition"
            >
              Add destination
            </button>
          </div>
        )}
        {viewDestinations ? (
          <div className="mt-6">
            <h2>Destinations connected</h2>
            {loading ? (
              <div className="grid place-content-center h-[calc(100vh-400px)]">
                <Loader variant="large" />
              </div>
            ) : destinationData?.length === 0 ? (
              <div className="w-full flex justify-center">
                <EmptyCard
                  icon={<MdOutlineLinkOff size={40} />}
                  text="No destination added yet."
                />
              </div>
            ) : (
              <div className="mt-4">
                <ul className="flex gap-3 flex-wrap">
                  {destinationData?.map((platform, indx) => (
                    <div key={indx} className="">
                      {platform == "Twitch" ? (
                        <div className="bg-[#9147ff] w-48 text-white relative px-4 py-3  rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-[#9147ffbe] transition">
                          <ImTwitch />
                          <span>Twitch</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDisconnected({
                                youtube: false,
                                twitch: true,
                              });
                            }}
                            className="absolute top-4 right-2"
                          >
                            <FaEllipsisVertical />
                          </button>
                          {openDisconnected && (
                            <button
                              ref={dropdownRef}
                              onClick={() => handleDisconnect("Twitch")}
                              className="bg-[#fff6ffd1] absolute -bottom-5 right-1 px-2 py-1 text-black rounded-sm"
                            >
                              Disconnect
                            </button>
                          )}
                        </div>
                      ) : platform == "Youtube" ? (
                        <div className="bg-red-600 text-white relative px-4 py-3  rounded-lg pr-8 flex items-center space-x-2 cursor-pointer hover:bg-red-700 transition">
                          <IoLogoYoutube />
                          <span>YouTube Channel</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDisconnected({
                                youtube: true,
                                twitch: false,
                              });
                            }}
                            className="absolute top-4 right-2"
                          >
                            <FaEllipsisVertical />
                          </button>
                          {openDisconnected.youtube && (
                            <button
                              ref={dropdownRef}
                              onClick={() => handleDisconnect("Twitch")}
                              className="bg-[#fff6ffd1] absolute -bottom-5 right-1 px-2 py-1 text-black rounded-sm"
                            >
                              Disconnect
                            </button>
                          )}
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
