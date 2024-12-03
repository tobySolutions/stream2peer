import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";

const LivestreamCard = ({ livestream }: any) => {
  let navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const url = `https://stream2peer.on-fleek.app/stream/${livestream?.playbackId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("An error occured, try again")
    }
  };
  const viewDetails = () => {
    // Calls the onView function passed from parent with the livestream id
    navigate(`/broadcast/${livestream?.streamKey}`);
  };

  return (
    <div className="bg-dark-gray border border-primary-border w-[100%] mb-4 py-2 px-5 rounded-lg dark:shadow-md flex justify-between items-center flex-wrap gap-4 shadow-lg">
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
        className="relative mt-2 group overflow-hidden px-4 py-2 font-semibold text-primary-white hover:text-black bg-transparent border border-primary-border rounded-md"
      >
        <span className="relative z-[10]">Start stream</span>
        <div className="absolute inset-0 w-full h-full bg-primary transition-transform duration-500 transform translate-y-full group-hover:translate-y-0"></div>
      </button>
    </div>
  );
};

export default LivestreamCard;
