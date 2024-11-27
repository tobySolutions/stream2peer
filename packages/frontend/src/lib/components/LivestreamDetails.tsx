const LivestreamDetails = ({
  livestreamId,
}: {
  livestreamId: string | undefined;
}) => {
  // Mock data - replace with actual API call
  const livestream = {
    id: livestreamId,
    title: "Livestream Title",
    date: "2023-05-15",
    status: "Scheduled",
    shareUrl: "https://example.com/livestream/123",
  };

  const deleteLivestream = () => {
    if (window.confirm("Are you sure you want to delete this livestream?")) {
      // Implement delete logic here
      alert("Livestream deleted");
    }
  };

  return (
    <div className="rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-primary-white">
        {livestream.title}
      </h2>
      <p className="text-primary-white mb-2">Date: {livestream.date}</p>
      <p className="text-primary-white mb-2">Status: {livestream.status}</p>
      <p className="text-primary-white mb-2">
        Share URL:{" "}
        <a href={livestream.shareUrl} className="text-blue-500 hover:underline">
          {livestream.shareUrl}
        </a>
      </p>
      <div className="flex flex-col gap-4 mt-4">
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => alert("Edit livestream")}
          >
            Edit Livestream
          </button>
        </div>
        <div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={deleteLivestream}
          >
            Delete Livestream
          </button>
        </div>
      </div>
    </div>
  );
};

export default LivestreamDetails;
