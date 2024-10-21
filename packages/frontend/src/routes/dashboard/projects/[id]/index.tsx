import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LivestreamList } from "../../../../lib/components/LivestreamList";
import Layout from "../../layout";
import { IoIosArrowBack } from "react-icons/io";
import Modal from "../../../../lib/modal";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { streamDestinations } from "../../../../utils/streamDestinations";
import LivestreamCard from "../../../../lib/components/LivestreamCard";

const ProjectPage = () => {
  const { id: projectId } = useParams(); // Extract projectId from the route params
  const [activeTab, setActiveTab] = useState("upcoming"); // Manage active tab state
  const [modalOpen, setModalOpen] = useState(false);
  let navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const livestreams = [
    { id: 1, title: "Livestream 1", date: "2023-05-15", status: "Scheduled" },
    { id: 2, title: "Livestream 2", date: "2023-05-20", status: "Live" },
    { id: 3, title: "Livestream 3", date: "2023-05-25", status: "Ended" },
  ];

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const scheduleLivestream = () => {
    navigate("/livestream");
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const ModalContent = () => {
    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];
    const [value, onChange] = useState<Value>(new Date());
    return (
      <div>
        <label className="inline-flex items-center mb-2">
          <input
            type="radio"
            name="options"
            value="instant"
            checked={selectedOption === "instant"}
            onChange={handleChange}
            className="form-radio h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-[14px]"> Start instant livestream</span>
        </label>

        <label className="inline-flex items-center mb-2 ml-4">
          <input
            type="radio"
            name="options"
            value="schedule"
            checked={selectedOption === "schedule"}
            onChange={handleChange}
            className="form-radio h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-[14px]">
            Schedule livestream for later
          </span>
        </label>

        {selectedOption !== "" && (
          <div>
            <p className="mb-1">Add destinations</p>
            {streamDestinations.map((destination) => (
              <div className="flex items-center cursor-pointer gap-1 mb-1">
                <span>{destination.icon}</span>
                <p className="text-[14px]">{destination.name}</p>
              </div>
            ))}
          </div>
        )}

        {selectedOption !== "" && (
          <div className="mt-2">
            <label htmlFor="">Title</label>
            <input
              type="text"
              className="w-full h-12 mt-2 border border-gray-600 rounded-md p-4"
            />
          </div>
        )}

        {selectedOption == "schedule" && (
          <div className="flex flex-col gap-2 mt-4">
            <p>Select a date and time</p>
            <DateTimePicker onChange={onChange} value={value} />
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        children={<ModalContent />}
        title="Create Livestream"
      />
      <div
        onClick={() => navigate(-1)}
        className="flex gap-2 px-4 py-2 cursor-pointer items-center text-white"
      >
        <IoIosArrowBack />
        Back
      </div>
      <div className="container p-4">
        <h1 className="text-2xl text-white font-bold mb-6">
          Project {projectId}
        </h1>

        <div className="mb-4 flex justify-between items-center w-full">
          <div className="flex mb-4 rounded-lg overflow-hidden border border-[hsl(155,6%,42.5%)]">
            <button
              className={`px-4 py-2 ${
                activeTab !== "upcoming"
                  ? "bg-[#1e1e1e] text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Livestreams
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab !== "past"
                  ? "bg-[#1e1e1e] text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setActiveTab("past")}
            >
              Past Livestreams
            </button>
          </div>

          <div>
            <button
              className="bg-[#1e1e1e] text-white px-4 py-2 rounded hover:bg-[#1e1e1e] border border-[hsl(155,6%,42.5%)] text-[14px] transition"
              onClick={() => setModalOpen(true)}
            >
              Create New Livestream
            </button>
          </div>
        </div>

        {activeTab === "upcoming" ? (
          <div className="grid grid-cols-3 w-full gap-6">
            {livestreams
              .filter((item) => item.status.toLocaleLowerCase() == "live" || item.status.toLocaleLowerCase() == "scheduled")
              .map((livestream) => (
                <LivestreamCard livestream={livestream} />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 w-full gap-6">
            {livestreams
              .filter((item) => item.status.toLocaleLowerCase() == "ended")
              .map((livestream) => (
                <LivestreamCard livestream={livestream} />
              ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectPage;
