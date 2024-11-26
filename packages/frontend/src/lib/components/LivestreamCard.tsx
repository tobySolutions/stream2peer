import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";

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
    navigate(`/broadcast/${livestream?.streamKey}`)
  };

  console.log(livestream)

  return (
    <div className="bg-dark-gray border border-primary-border w-[100%] mb-4 py-2 px-5 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-primary-white flex items-center gap-2">
          {livestream?.title}
          <span
            onClick={handleCopy}
            title="Click to copy stream url"
            className="cursor-pointer"
          >
            {isCopied ? (
              <span className="text-green-500 text-[12px]">
                Copied to clipboard!
              </span>
            ) : (
              <FaRegCopy />
            )}
          </span>
        </h3>
        {/* <p className="text-primary-white text-sm mb-2">Date: {livestream.date}</p> */}
        <p className="text-primary-white text-[13px]">
          Status: {livestream?.status}
        </p>
      </div>
      <button
        onClick={viewDetails}
        className="relative mt-2 group overflow-hidden px-4 py-2 font-semibold text-primary-foreground hover:text-black bg-transparent border border-primary-border rounded-md"
      >
        <span className="relative z-[10]">Start stream</span>
        <div className="absolute inset-0 w-full h-full bg-primary transition-transform duration-500 transform translate-y-full group-hover:translate-y-0"></div>
      </button>

      {/* <button className="bg-dark-gray border border-primary-border text-white px-4 py-2 rounded hover:bg-white hover:text-gray-800">
        Start stream
      </button> */}
    </div>
  );
};

export default LivestreamCard;
