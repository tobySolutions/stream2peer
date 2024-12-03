import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { navItems } from "../../utils/navContent";
import { IoPersonCircleOutline } from "react-icons/io5";
import { LogoIcon } from "../../assets/svg-exports";
import { deleteDataInCookie, getDataInCookie } from "../../utils/utils";
import { ModeToggle } from "../../lib/components/mode-toggle";
import { useTheme } from "../../state/theme";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {theme} = useTheme()

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (route: string) => {
    toggleMobileMenu();
    navigate(route, { replace: true });
  };

  const handleLogout = () => {
    deleteDataInCookie("userToken");
    deleteDataInCookie("userDataResponse");
    deleteDataInCookie("userCode");
    navigate("/signIn");
  };

  const userData = getDataInCookie("userDataResponse")
    ? JSON.parse(getDataInCookie("userDataResponse"))
    : "";

  return (
    <nav className="bg-dark-gray sticky bottom-0 top-0 right-0 left-0 z-[100] h-[60px] border-b border-primary-border flex items-center justify-between px-[20px] md:px-[36px] py-[25px]">
      {/* Logo Container */}
      <div className="flex items-center gap-[10px] cursor-pointer">
        <Link
          to={
            location.pathname.includes("dashboard")
              ? "/dashboard"
              : "https://stream2peer.on-fleek.app/"
          }
        >
          <LogoIcon theme={theme} />
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden relative md:flex gap-[5px] items-center list-none">
        <li
          onClick={() => setSubMenuOpen((prev) => !prev)}
          className="text-[16px] font-normal font-raleway px-[20px] py-[12px] rounded-[30px] cursor-pointer text-primary-white flex items-center gap-2"
        >
          <IoPersonCircleOutline size={24} />
          My Account
        </li>

        <ModeToggle />

        {/* <ModeToggle /> */}
        {subMenuOpen && (
          <div className="absolute bg-dark-gray top-12 right-2 border border-primary-border rounded-sm">
            <p className="py-2 px-3 text-primary-white/60">
              {userData?.data?.userId ? userData?.data?.userId : ""}
            </p>
            <button
              onClick={handleLogout}
              className="hover:bg-primary w-full flex justify-center items-center hover:text-primary-foreground border-t border-t-primary-border transition-all ease-in-out duration-300 py-2 px-4 gap-2"
            >
              <CiLogout />
              <span>Sign out</span>
            </button>
          </div>
        )}
      </ul>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="cursor-pointer md:pr-0 pr-6 relative md:hidden block"
      >
        <div id="icon" className={`${menuOpen ? "icon-close" : "icon-menu"}`} />
      </button>
      {/* Mobile Menu */}
      <div
        className={`${menuOpen ? "block" : "hidden"} fixed top-0 left-0 w-full h-screen z-[1000] overflow-hidden bg-dark-gray`}
      >
        <div className="flex justify-end p-[40px]">
          {/* Close icon (uses the same lines as the hamburger) */}
          <button
            onClick={() => setMenuOpen(false)}
            className="icon-close"
          ></button>
        </div>

        <div className="overflow-hidden">
          <ul className="flex flex-col gap-[20px] items-center justify-center h-[calc(100dvh-150px)] list-none">
            {navItems.map((item) => (
              <li
                key={item.value}
                className={`${location.pathname === item.route ? "dark:bg-white bg-[#1e1e1e] px-12 py-2" : ""} rounded-[8px]`}
              >
                <button
                  onClick={() => handleNavigation(item.route)}
                  className={`${location.pathname === item.route ? "text-dark-gray" : "text-primary-white"} no-underline font-raleway w-full text-left`}
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
