import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { navItems } from "../utils/navContent";
import { IoPersonCircleOutline } from "react-icons/io5";
import { LogoIcon } from "../assets/svg-exports";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (route: string) => {
    toggleMobileMenu();
    navigate(route, { replace: true });
  };

  const handleLogout = () => {};

  return (
    <nav className="bg-dark-gray sticky bottom-0 top-0 right-0 left-0 z-[100] h-[60px] border-b border-primary-border flex items-center justify-between px-[36px] py-[25px]">
      {/* Logo Container */}
      <div className="flex items-center gap-[10px] cursor-pointer">
        <Link
          to={
            location.pathname.includes("dashboard")
              ? "/dashboard"
              : "https://stream2peer.on-fleek.app/"
          }
        >
          <LogoIcon theme="dark" />
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden relative md:flex gap-[20px] items-center list-none">
        {/* Conditionally render "My Account" menu */}
        {!location.pathname.includes("signIn") && (
          <li
            onClick={() => setSubMenuOpen((prev) => !prev)}
            className="text-[16px] font-normal font-raleway px-[20px] py-[12px] rounded-[30px] cursor-pointer text-white flex items-center gap-2"
          >
            <IoPersonCircleOutline size={24} />
            My Account
          </li>
        )}
        {subMenuOpen && (
          <div
            onClick={handleLogout}
            className="absolute bg-dark-gray top-12 left-6 border border-primary-border"
          >
            <button className="bg-primary hover:bg-primary/90 flex items-center text-primary-foreground py-2 px-4 gap-2">
              <CiLogout />
              <span>Logout</span>
            </button>
          </div>
        )}
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
        className={`${
          menuOpen ? "flex" : "hidden"
        } fixed top-0 left-0 w-full h-screen z-[1000] bg-dark-gray`}
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
                className={`${
                  location.pathname === item.route ? "bg-white" : ""
                } p-[10px] rounded-[8px]`}
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
