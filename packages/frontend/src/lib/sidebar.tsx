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
    <aside className="fixed w-[20%] top-0 bottom-0 left-0 right-0 px-5 mt-[57px] pt-8 h-full bg-[#1e1e1e]  border-r-0 border-[hsl(155,6%,42.5%)] md:flex md:flex-col md:gap-5 md:border-r">
      <ul className="list-none p-0 flex flex-col gap-5  md:w-full md:justify-between">
        {navItems.map((item) => (
          <li
            key={item.value}
            className={`${
              isActive(item.route) ? "bg-white text-[#1e1e1e]" : "text-white"
            } p-2 rounded-md no-underline font-raleway cursor-pointer`}
            onClick={() => navigate(item.route)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
