import React from "react";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { ImTwitch } from "react-icons/im";
import { FaLinkedin } from "react-icons/fa6";
import {
  connectToTwitch,
  connectToYouTube,
} from "../../network/streams/streams-api";
import { toast } from "react-toastify";

const SocialMediaCards: React.FC = () => {
  const handleTwitchConnect = async () => {
    try {
      const { data } = await connectToTwitch();
      window.location.href = data.authUrl;
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  };
  const handleYouTubeConnect = async () => {
    try {
      const { data } = await connectToYouTube();
      window.location.href = data.authUrl;
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div
        onClick={handleYouTubeConnect}
        className="bg-red-600 text-white px-4 py-3  rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-red-700 transition"
      >
        <IoLogoYoutube />
        <span>YouTube Channel</span>
      </div>
      <div
        onClick={handleTwitchConnect}
        className="bg-[#9147ff] w-48 text-white px-4 py-3  rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-[#9147ffbe] transition"
      >
        <ImTwitch />
        <span>Twitch</span>
      </div>
      {/* Facebook Page */}
      <div className="relative bg-blue-600 text-white w-48 px-4 py-3 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-blue-700 transition md:opacity-100 md:hover:opacity-75">
        <FaFacebook />
        <span>Facebook Page</span>
        {/* Overlay for "Coming Soon" */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg  md:hover:flex md:opacity-0 md:hover:opacity-100">
          Coming Soon
        </div>
        {/* Show "Coming Soon" on mobile */}
        <div className="md:hidden absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg">
          Coming Soon
        </div>
      </div>

      {/* LinkedIn Page */}
      <div className="bg-blue-800 relative w-48 text-white px-4 py-3 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-blue-900 transition">
        <FaLinkedin />
        <span>LinkedIn Page</span>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg  md:hover:flex md:opacity-0 md:hover:opacity-100">
          Coming Soon
        </div>
        {/* Show "Coming Soon" on mobile */}
        <div className="md:hidden absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg">
          Coming Soon
        </div>
      </div>

      {/* YouTube Channel */}

      {/* Twitter (X) */}
      <div className="relative bg-black  w-48 text-white px-4 py-3 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-800 transition md:opacity-100 md:hover:opacity-75 border border-primary-border">
        <FaXTwitter />
        <span>X (Twitter)</span>
        {/* Overlay for "Coming Soon" */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg md:hover:flex md:opacity-0 md:hover:opacity-100">
          Coming Soon
        </div>
        {/* Show "Coming Soon" on mobile */}
        <div className="md:hidden absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg">
          Coming Soon
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCards;
