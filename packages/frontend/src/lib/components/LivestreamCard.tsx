import React from "react";
import { useNavigate } from "react-router-dom";

const LivestreamCard = ({ livestream, type }: any) => {

    let navigate = useNavigate();
  const viewDetails = () => {
    // Calls the onView function passed from parent with the livestream id
    navigate(`/dashboard/projects/livestream/${livestream.id}`)
  };

  return (
    <div className="bg-[#1e1e1e] border border-[hsl(155,6%,42.5%)] rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-[#fff6ff]">
        {livestream.title}
      </h3>
      <p className="text-[#fff6ff] text-sm mb-2">Date: {livestream.date}</p>
      <p className="text-[#fff6ff] text-sm mb-4">Status: {livestream.status}</p>
      <button
        className="bg-[#1e1e1e] border border-[hsl(155,6%,42.5%)] text-white px-4 py-2 rounded hover:bg-white hover:text-gray-800"
        onClick={viewDetails}
      >
        View Details
      </button>
    </div>
  );
};

export default LivestreamCard;
