import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { Select } from "antd";

interface PeerInviteFormProps {
  userData: { role: "co-Host" | "Subscriber"; userId: string }[];
  setUserData: React.Dispatch<
    React.SetStateAction<{ role: "co-Host" | "Subscriber"; userId: string }[]>
  >;
  inputEmail: string;
  setInputEmail: React.Dispatch<React.SetStateAction<string>>;
  selectedRole: "co-Host" | "Subscriber";
  setSelectedRole: React.Dispatch<
    React.SetStateAction<"co-Host" | "Subscriber">
  >;
  handleAddEmail: (e: React.FormEvent) => void;
  handleDeleteEmail: (email: string) => void;
}

const PeerInviteForm: React.FC<PeerInviteFormProps> = ({
  userData,
  inputEmail,
  setInputEmail,
  selectedRole,
  setSelectedRole,
  handleAddEmail,
  handleDeleteEmail,
}) => {
  const rolesOption = [
    { label: "Co-host", value: "co-Host" },
    { label: "Subscriber", value: "Subscriber" },
  ];

  return (
    <div>
      <form onSubmit={handleAddEmail} className="relative">
        <label htmlFor="email-input" className="block mb-2">
          Invite users via email
        </label>
        <div className="flex">
          <input
            type="text"
            id="email-input"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            className="flex-grow border border-gray-600 rounded-md py-2 pl-3 pr-[150px] mr-2 focus:outline-none"
            placeholder="Enter email"
            disabled={userData.length >= 3}
          />
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded-md disabled:bg-gray-400"
            disabled={!inputEmail || userData.length >= 3}
          >
            Add
          </button>
        </div>
        <div className="absolute right-[74px] top-19 h-[41px] w-36">
          <Select
            options={rolesOption}
            placeholder="Select user role"
            value={selectedRole}
            onChange={(value) =>
              setSelectedRole(value as "co-Host" | "Subscriber")
            }
          />
        </div>
      </form>

      <div className="mt-4">
        {userData.map((user, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b py-2"
          >
            <span className="text-[14px]">{`${user.userId} (${user.role})`}</span>
            <button
              onClick={() => handleDeleteEmail(user.userId)}
              className="text-orange-500 hover:text-orange-700 font-bold"
            >
              <FaRegTrashCan />
            </button>
          </div>
        ))}
      </div>

      {userData.length > 0 && (
        <div className="mt-4">
          <button
            type="button"
            className="bg-orange-500 text-white px-4 py-2 rounded"
            onClick={handleAddEmail}
          >
            Submit
          </button>
        </div>
      )}

      {userData.length >= 3 && (
        <p className="text-red-500 text-sm mt-1">
          You can only add up to 3 emails.
        </p>
      )}
    </div>
  );
};

export default PeerInviteForm;
