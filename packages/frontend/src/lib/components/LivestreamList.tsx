import LivestreamCard from "./LivestreamCard";

export const LivestreamList = ({
  type,
}: {
  projectId: string | undefined;
  type: "upcoming" | "past";
}) => {
  const livestreams = [
    { id: 1, title: "Livestream 1", date: "2023-05-15", status: "Scheduled" },
    { id: 2, title: "Livestream 2", date: "2023-05-20", status: "Live" },
    { id: 3, title: "Livestream 3", date: "2023-05-25", status: "Ended" },
  ];
  return (
    <div className="grid grid-cols-3 w-full gap-6">
      {livestreams.map((livestream) => (
        <LivestreamCard livestream={livestream} type={type} />
      ))}
    </div>
  );
};
