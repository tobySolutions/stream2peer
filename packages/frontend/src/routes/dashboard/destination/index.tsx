import { useState } from "react";
import Layout from "../layout";
import { MdOutlineLinkOff } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import SocialMediaCards from "../../../lib/components/socialCards";

export const Destination = () => {
  const [viewDestinations, setViewDestinations] = useState(true);
  const [destinationData, setDestinationData] = useState([]);
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
            <h2>Destinations</h2>
            {destinationData.length === 0 ? (
              <div className="border border-primary-border w-ful flex justify-center flex-col items-center gap-4 rounded-lg py-16 border-dashed px-36 my-6">
                <MdOutlineLinkOff size={40} />
                <div className="">
                  <p>No destination added yet.</p>
                </div>
              </div>
            ) : (
              <div>
                <ul></ul>
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
                <SocialMediaCards/>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
