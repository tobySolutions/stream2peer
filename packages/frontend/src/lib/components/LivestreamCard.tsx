import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LivestreamCard = ({ livestream, type }: any) => {

    let navigate = useNavigate();
     const [isCopied, setIsCopied] = useState(false);
     const url = `http://localhost:5173/stream/${livestream?.playbackId}`;

     const handleCopy = async () => {
       try {
         await navigator.clipboard.writeText(url);
         setIsCopied(true);

         // Reset the copied state after 2 seconds
         setTimeout(() => setIsCopied(false), 2000);
       } catch (err) {
         console.error("Failed to copy text: ", err);
       }
     };
  const viewDetails = () => {
    // Calls the onView function passed from parent with the livestream id
    navigate(`/dashboard/projects/livestream/${livestream?.playbackId}`)
  };

  console.log(livestream)

  return (
    <div className="bg-dark-gray border border-primary-border w-[100%] mb-4 py-2 px-5 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-primary-white">
          {livestream?.title}
        </h3>
        {/* <p className="text-primary-white text-sm mb-2">Date: {livestream.date}</p> */}
        <p className="text-primary-white text-sm">
          Status: {livestream?.status}
        </p>
      </div>
      <div>
        <p
          onClick={handleCopy}
          className="text-blue-500 cursor-pointer hover:underline w-64 overflow-hidden whitespace-nowrap overflow-ellipsis"
          title="Click to copy"
        >
          {url}
        </p>
        {isCopied && (
          <span className="text-green-500">Copied to clipboard!</span>
        )}
      </div>
      {/* <button
        className="bg-dark-gray border border-primary-border text-white px-4 py-2 rounded hover:bg-white hover:text-gray-800"
        onClick={viewDetails}
      >
        View Details
      </button> */}
    </div>
  );
};

export default LivestreamCard;
