import { MdHome } from "react-icons/md";
import { CiStreamOn } from "react-icons/ci";
import { FaLink } from "react-icons/fa6";

export const navItems = [
  { label: "Home", value: "home", route: "/dashboard", icon: <MdHome size={22}/> },
  {
    label: "Projects",
    value: "project",
    route: "/dashboard/projects",
    icon: <CiStreamOn  size={22}/>,
  },
  {
    label: "Destination",
    value: "destination",
    route: "/dashboard/destination",
    icon: <FaLink size={22}/>,
  },
];
