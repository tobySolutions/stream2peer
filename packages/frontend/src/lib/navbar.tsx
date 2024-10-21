import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "/vite.svg";
import { navItems } from "../utils/navContent";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (route: string) => {
    toggleMobileMenu();
    navigate(route, { replace: true });
  };

  return (
    <nav className="bg-[#1e1e1e] sticky bottom-0 top-0 right-0 left-0 z-[100] h-[60px] border-b border-[hsl(155,6%,42.5%)] flex items-center justify-between px-[36px] py-[25px]">
      {/* Logo Container */}
      <div className="flex items-center gap-[10px] cursor-pointer">
        <img src={Logo} alt="Logo" width="60px" height="60px" />
        <p className="text-white font-montserrat">STREAM2PEER</p>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-[20px] items-center list-none">
        <li className="text-[16px] font-normal font-raleway px-[20px] py-[12px] rounded-[30px] cursor-pointer text-white">
          My Account
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <div
        className="relative cursor-pointer md:hidden"
        onClick={toggleMobileMenu}
      >
        {/* Hamburger icon with pseudo-elements for lines */}
        <div className="relative w-[28px] h-[2.7px] bg-white rounded-full transition-all duration-300 before:absolute before:w-[28px] before:h-[2.7px] before:bg-white before:rounded-full before:transition-all before:duration-300 after:absolute after:w-[28px] after:h-[2.7px] after:bg-white after:rounded-full after:transition-all after:duration-300">
          <div
            className={`absolute top-0 left-0 transition-all duration-300 ${
              menuOpen
                ? "before:rotate-45 before:top-0 after:rotate-[-45deg] after:top-0"
                : "before:top-[-7px] after:top-[7px]"
            }`}
          ></div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`${menuOpen ? "flex" : "hidden"} fixed top-0 left-0 w-full h-screen z-[1000] bg-[#1e1e1e]`}
      >
        <div className="flex justify-end p-[40px]">
          {/* Close icon (uses the same lines as the hamburger) */}
          <div className="relative w-[28px] h-[2.7px] bg-white rounded-full transition-all duration-300 before:absolute before:w-[28px] before:h-[2.7px] before:bg-white before:rounded-full before:rotate-45 before:top-0 after:absolute after:w-[28px] after:h-[2.7px] after:bg-white after:rounded-full after:rotate-[-45deg] after:top-0"></div>
        </div>

        <div className="px-[25px] pb-[25px]">
          <ul className="flex flex-col gap-[20px] list-none">
            {navItems.map((item) => (
              <li
                key={item.value}
                className={`${location.pathname === item.route ? "bg-white" : ""} p-[10px] rounded-[8px]`}
              >
                <button
                  onClick={() => handleNavigation(item.route)}
                  className="text-white no-underline font-raleway w-full text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
