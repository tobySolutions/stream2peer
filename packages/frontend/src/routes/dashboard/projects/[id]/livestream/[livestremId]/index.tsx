import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LivestreamDetails from '../../../../../../lib/components/LivestreamDetails';
import Layout from '../../../../layout';
import { IoIosArrowBack } from 'react-icons/io';

const LivestreamPage = () => {
  const { livestreamId } = useParams(); // Extract livestreamId from the route parameters
  let navigate = useNavigate();

  return (
    <Layout>
      <div
        onClick={() => navigate(-1)}
        className="flex gap-2 px-4 py-2 cursor-pointer items-center text-white"
      >
        <IoIosArrowBack />
        Back
      </div>
      <div className="container mx-auto p-4">
        <LivestreamDetails livestreamId={livestreamId} />
      </div>
    </Layout>
  );
};

export default LivestreamPage;