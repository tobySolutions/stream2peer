import React from "react";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const SocialMediaCards: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4">
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
      <div className="bg-blue-800 w-48 text-white px-4 py-3 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-blue-900 transition">
        <FaLinkedin />
        <span>LinkedIn Page</span>
      </div>

      {/* YouTube Channel */}
      <div className="bg-red-600 text-white px-4 py-3  rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-red-700 transition">
        <IoLogoYoutube />
        <span>YouTube Channel</span>
      </div>

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
