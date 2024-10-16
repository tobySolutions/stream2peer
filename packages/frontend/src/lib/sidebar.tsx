import { useLocation } from "react-router-dom";
import { navItems } from "../utils/navContent";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex-[0_0_20%] px-5 pt-20 bg-[#1e1e1e]  border-r border-[hsl(155,6%,42.5%)] md:flex md:flex-col md:gap-5 md:border-r md:border-none md:border-t md:mt-[10px] md:overflow-x-scroll">
      <ul className="list-none p-0 flex flex-col gap-5  md:w-full md:justify-between">
        {navItems.map((item) => (
          <li
            key={item.value}
            className={`${location.pathname === item.route ? "bg-white" : ""} p-2 rounded-md`}
          >
            <a
              href={item.route}
              className={`${
                location.pathname === item.route
                  ? "text-[#1e1e1e]"
                  : "text-white"
              } no-underline font-raleway`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
