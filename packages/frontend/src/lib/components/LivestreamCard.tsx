import React from "react";
import { useNavigate } from "react-router-dom";

const LivestreamCard = ({ livestream, type }: any) => {

    let navigate = useNavigate();
  const viewDetails = () => {
    // Calls the onView function passed from parent with the livestream id
    navigate(`/dashboard/projects/livestream/${livestream?.identifier}`)
  };

  console.log(livestream)

  return (
    <div className="bg-dark-gray border border-primary-border rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-primary-white">
        {livestream?.title}
      </h3>
      {/* <p className="text-primary-white text-sm mb-2">Date: {livestream.date}</p> */}
      <p className="text-primary-white text-sm mb-4">Status: {livestream?.status}</p>
      <button
        className="bg-dark-gray border border-primary-border text-white px-4 py-2 rounded hover:bg-white hover:text-gray-800"
        onClick={viewDetails}
      >
        View Details
      </button>
    </div>
  );
};

export default LivestreamCard;
