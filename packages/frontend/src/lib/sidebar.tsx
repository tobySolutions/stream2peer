import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../utils/navContent";

function Sidebar() {
  const location = useLocation();
  let navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/dashboard/projects") {
      return location.pathname.startsWith("/dashboard/projects");
    }
    return location.pathname === path;
  };

  return (
    <aside className="fixed hidden w-[20%] top-0 bottom-0 left-0 right-0 px-5 mt-[57px] pt-8 h-full bg-dark-gray  border-r-0 border-primary-border md:flex md:flex-col md:gap-5 md:border-r">
      <ul className="list-none p-0 md:flex flex-col gap-5  md:w-full md:justify-between">
        {navItems.map((item) => (
          <li
            key={item.value}
            className={`${
              isActive(item.route)
                ? "dark:bg-white text-dark-gray bg-primary"
                : "dark:text-primary-white text-[#1e1e1e]"
            } p-2 rounded-md no-underline font-raleway cursor-pointer flex items-center gap-2`}
            onClick={() => navigate(item.route)}
          >
            {item.icon}
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
