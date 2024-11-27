import { Select } from "antd";
import React from "react";
import DateTimePicker from "react-datetime-picker";
import { AiOutlineWarning } from "react-icons/ai";

interface LivestreamFormProps {
  streamDetails: {
    title: string;
    description: string;
    type: "instant" | "schedule";
  };
  setStreamDetails: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      type: "instant" | "schedule";
    }>
  >;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  handleChange: any;
  platforms: {
    label: string;
    icon: JSX.Element;
    value: "Twitch" | "Youtube";
  }[];
}

const LivestreamForm: React.FC<LivestreamFormProps> = ({
  streamDetails,
  setStreamDetails,
  selectedDate,
  setSelectedDate,
  platforms,
  handleChange,
}) => {
  const { Option } = Select;


  return (
    <div>
      <div className="mb-4">
        <label className="inline-flex items-center mb-2">
          <input
            type="radio"
            name="options"
            value="instant"
            checked={streamDetails.type === "instant"}
            onChange={() =>
              setStreamDetails({ ...streamDetails, type: "instant" })
            }
            className="form-radio h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-[14px]">Start instant livestream</span>
        </label>

        <label className="inline-flex items-center mb-2 ml-4">
          <input
            type="radio"
            name="options"
            value="schedule"
            checked={streamDetails.type === "schedule"}
            onChange={() =>
              setStreamDetails({ ...streamDetails, type: "schedule" })
            }
            className="form-radio h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-[14px]">
            Schedule livestream for later
          </span>
        </label>
      </div>

      <div className="mt-2">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={streamDetails.title}
          onChange={(e) =>
            setStreamDetails({ ...streamDetails, title: e.target.value })
          }
          className="w-full h-12 mt-2 border border-gray-600 rounded-md p-4"
        />
      </div>

      <div className="mt-2">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={4}
          value={streamDetails.description}
          onChange={(e) =>
            setStreamDetails({ ...streamDetails, description: e.target.value })
          }
          className="w-full mt-2 border border-gray-600 rounded-md p-4"
        ></textarea>
      </div>

      {streamDetails.type === "schedule" && (
        <div className="flex flex-col gap-2 my-4">
          <label>Select a date and time</label>
          <DateTimePicker value={selectedDate} onChange={setSelectedDate} />
        </div>
      )}
      {platforms?.length === 0 ? (
        <div className="flex items-center gap-2">
          <AiOutlineWarning className="text-yellow-dark-7"/>
          <span className="text-[12px]"> Connect your account to stream to other platforms</span>
        </div>
      ) : (
        <Select
          placeholder="Select a platform"
          style={{ width: 200 }}
          onChange={handleChange} // Handle change event
        >
          {platforms?.map((platform) => (
            <Option key={platform.value} value={platform.value}>
              <div className="flex items-center gap-1">
                {platform.icon}
                <span style={{ marginLeft: 8 }}>{platform.label}</span>
              </div>
            </Option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default LivestreamForm;
