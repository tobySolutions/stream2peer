import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../layout";
import { IoIosArrowBack } from "react-icons/io";
import Modal from "../../../../lib/modal";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import LivestreamCard from "../../../../lib/components/LivestreamCard";
import {
  FetchProjectById,
  getAccessToken,
  sendPeerInvite,
} from "../../../../network/projects/projects";
import { useAppStore } from "../../../../state";
import { CiCalendar } from "react-icons/ci";
import {
  createLiveStream,
  fetchAllStreams,
} from "../../../../network/streams/streams-api";
import LivestreamForm from "./components/livestreamForm";
import PeerInviteForm from "./components/peerInviteForm";
import { IoLogoYoutube } from "react-icons/io5";
import { ImTwitch } from "react-icons/im";
import { getDataInCookie, storeDataInCookie } from "../../../../utils/utils";

const ProjectPage = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();
  const setCurrentStream = useAppStore((state) => state.setCurrentStream);
  const setSubmitLoader = useAppStore((state) => state.setLoading);

  const [activeTab, setActiveTab] = useState("upcoming");
  const [projectData, setProjectData] = useState<any>(null);
  const [livestreamData, setLivestreamData] = useState<any[]>([]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "", // "instant" or "schedule"
  });
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [userData, setUserData] = useState<
    { role: "co-Host" | "Subscriber"; userId: string }[]
  >([]);
  const [streamDetails, setStreamDetails] = useState<{
    title: string;
    description: string;
    type: "instant" | "schedule";
  }>({
    title: "",
    description: "",
    type: "instant",
  });
  const [inputEmail, setInputEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<"co-Host" | "Subscriber">(
    "co-Host"
  );
  const [selectedPlatform, setSelectedPlatform] = useState<
    ("Twitch" | "Youtube")[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState({
    project: false,
    invite: false,
    createStream: false,
  });

  const dropdownRef = useRef(null);

  const platformStyles = {
    Twitch: {
      label: "Twitch",
      icon: <ImTwitch style={{ color: "#9146FF" }} />,
    },
    Youtube: {
      label: "YouTube",
      icon: <IoLogoYoutube style={{ color: "#FF0000" }} />,
    },
  };

  const UserResponseData = JSON.parse(getDataInCookie("userDataResponse"));

  const platforms =
    UserResponseData?.data?.platforms?.map(
      (platform: "Twitch" | "Youtube") => ({
        label: platformStyles[platform]?.label || platform,
        value: platform,
        icon: platformStyles[platform]?.icon || null,
      })
    ) || [];

  // Fetch project details
  const fetchProjectDetails = async () => {
    setLoading((prev) => ({ ...prev, project: true }));
    try {
      const response = await FetchProjectById(projectId!);
      setProjectData(response?.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, project: false }));
    }
  };

  const OutsideClickListener = (ref: any, callback: () => void) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, callback]);
  };

  // OutsideClickListener(dropdownRef, () => {
  //   setModalState({ type: "", isOpen: false });
  // });

  // Fetch accessTokens
  const fetchAccessTokens = async () => {
    try {
      const res = await getAccessToken(projectId!);
      console.log(res);
      storeDataInCookie(
        "stream-access-token",
        JSON.stringify(res?.access_token),
        1
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all streams
  const fetchStreams = async () => {
    try {
      const response = await fetchAllStreams(projectId!);
      setLivestreamData(response?.results || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle peer invite submission
  const handlePeerInviteSubmit = async () => {
    setLoading((prev) => ({ ...prev, invite: true }));
    try {
      await sendPeerInvite(projectId!, { users: userData });
      toast.success("Peer invited successfully");
      setInviteModalOpen(false);
      setUserData([]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, invite: false }));
    }
  };

  useEffect(() => {
    console.log("Livestream Data Updated:", livestreamData);
  }, [livestreamData]);

  // Handle livestream creation
  const handleCreateLiveStream = async () => {
    setLoading((prev) => ({ ...prev, createStream: true }));
    setSubmitLoader(true);
    try {
      const payload = {
        title: streamDetails.title,
        description: streamDetails.description,
        ...(modalState.type === "schedule" && { date: selectedDate }),
        platforms: selectedPlatform,
        scheduleDate: selectedDate,
      };
      const response = await createLiveStream(projectId!, payload);
      setCurrentStream(response?.results);
      toast.success("Livestream created successfully");
      setModalState({ isOpen: false, type: "" });
      setSelectedDate(null);
      storeDataInCookie("stream_details", JSON.stringify(response?.results), 1);
      if (streamDetails.type == "instant") {
        navigate(`/broadcast/${response?.results.streamKey}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading((prev) => ({ ...prev, createStream: false }));
      setSubmitLoader(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
    fetchStreams();
    fetchAccessTokens();
  }, []);

  // Helpers
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAddEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(inputEmail) && userData.length < 3) {
      setUserData((prev) => [
        ...prev,
        { role: selectedRole, userId: inputEmail },
      ]);
      setInputEmail("");
    }
  };

  const handleDeleteEmail = (email: string) => {
    setUserData((prev) => prev.filter((user) => user.userId !== email));
  };

  const handleChange = (value: "Twitch" | "Youtube") => {
    console.log("Selected Platform:", value);
    setSelectedPlatform([...selectedPlatform, value]); // Update state or perform other actions
  };

  // Render
  return (
    <Layout>
      <div
        onClick={() => navigate(-1)}
        className="flex gap-2 px-4 py-2 cursor-pointer items-center text-white"
      >
        <IoIosArrowBack />
        Back
      </div>

      {loading.project ? (
        <div className="grid place-content-center h-[calc(100vh-400px)]">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-white"></div>
        </div>
      ) : (
        <div className="container p-4">
          <h1 className="text-2xl text-white font-bold mb-1">
            {projectData?.title}
          </h1>
          <p className="text-md text-primary-white mb-6">
            {projectData?.description}
          </p>

          <div className="flex justify-between items-center mb-6">
            <div className="flex">
              {["upcoming", "past"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 ${
                    activeTab === tab
                      ? "bg-gray-100 text-gray-800"
                      : "bg-dark-gray text-white"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "upcoming"
                    ? "Upcoming Livestreams"
                    : "Past Livestreams"}
                </button>
              ))}
            </div>
            <button
              className="bg-dark-gray text-white px-4 py-2 rounded"
              onClick={() => setModalState({ isOpen: true, type: "instant" })}
              ref={dropdownRef}
            >
              Create New Livestream
            </button>
          </div>

          <div>
            {activeTab === "upcoming"
              ? renderStreams("upcoming", livestreamData)
              : renderStreams("past", livestreamData)}
          </div>
        </div>
      )}

      {/* Livestream Modal */}
      <Modal
        isOpen={modalState.isOpen}
        title="Create Livestream"
        onClose={() => setModalState({ isOpen: false, type: "" })}
        onSubmit={handleCreateLiveStream}
      >
        <LivestreamForm
          streamDetails={streamDetails}
          platforms={platforms}
          handleChange={handleChange}
          setStreamDetails={setStreamDetails}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </Modal>

      {/* Peer Invite Modal */}
      <Modal
        isOpen={inviteModalOpen}
        title="Invite Peers"
        onClose={() => setInviteModalOpen(false)}
        onSubmit={handlePeerInviteSubmit}
      >
        <PeerInviteForm
          userData={userData}
          setUserData={setUserData}
          inputEmail={inputEmail}
          setInputEmail={setInputEmail}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          handleAddEmail={handleAddEmail}
          handleDeleteEmail={handleDeleteEmail}
        />
      </Modal>
    </Layout>
  );
};

// Helper components
const renderStreams = (tab: string, livestreamData: any[]) => {
  const filteredStreams = livestreamData?.filter((stream) =>
    tab === "upcoming" ? stream.status !== "ended" : stream.status === "ended"
  );

  if (filteredStreams?.length === 0) {
    return (
      <div className="text-primary-white grid place-content-center w-full h-[calc(100vh-400px)]">
        <div className="border border-primary-border rounded-lg py-16 flex items-center flex-col px-36 border-dashed">
          <CiCalendar size={40} />
          <p>
            {tab === "upcoming"
              ? "Scheduled streams will appear here."
              : "Completed streams will appear here."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {filteredStreams?.map((stream) => (
        <LivestreamCard key={stream.id} livestream={stream} />
      ))}
    </div>
  );
};

export default ProjectPage;
