import { Link } from "react-router-dom";
import { HiOutlineMenuAlt2, HiOutlineX } from "react-icons/hi";
import { LuChartPie } from "react-icons/lu";
import ThemeToggle from "../ThemeToggle";
import APP_LOGO from "../../assets/images/safespend_logo.png";

const Navbar = ({ activeMenu, toggleSideMenu, isSideMenuOpen }) => {
  return (
    <header
      className="sticky top-0 z-[50] w-full border-b border-[var(--color-border)] backdrop-blur-xl transition-all duration-300"
      style={{ backgroundColor: "rgba(var(--color-bg-rgb), 0.85)" }}
    >
      <div className="max-w-[1920px] mx-auto flex items-center justify-between px-4 md:px-10 py-3 md:py-4">

        {/* Left Section: Menu Toggle + Logo */}
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          {/* Menu Toggle Button */}
          <button
            onClick={toggleSideMenu}
            aria-label={isSideMenuOpen ? "Close menu" : "Open menu"}
            className="flex-shrink-0 p-2.5 rounded-xl bg-[var(--color-divider)] border border-[var(--color-border)] text-[var(--color-text)] hover:text-primary active:scale-90 transition-all duration-200"
          >
            {isSideMenuOpen ? (
              <HiOutlineX className="text-xl sm:text-2xl" />
            ) : (
              <HiOutlineMenuAlt2 className="text-xl sm:text-2xl" />
            )}
          </button>

          {/* Logo & Text - Ensured visibility with min-w-0 to prevent clipping */}
          <Link
            to="/dashboard"
            className="flex items-center gap-3 group min-w-0"
          >
            <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center shadow-lg group-hover:rotate-[10deg] transition-all duration-500 bg-white/5">
              <img
                src={APP_LOGO}
                alt="SafeSpend Logo"
                width="44"
                height="44"
                className="w-full h-full object-cover"
              />
            </div>

            {/* SafeSpend Text: Always visible, just sizes down on mobile */}
            <div className="flex flex-col truncate">
              <h1 className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-[var(--color-text)] leading-none">
                SafeSpend
              </h1>
              <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.3em] text-primary opacity-50 mt-1 truncate">
                Premium 3.0
              </span>
            </div>
          </Link>
        </div>

        {/* Right Section: Status + Theme */}
        <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
          {/* Secure Badge: Hidden on very small screens to give SafeSpend room */}
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[var(--color-divider)] border border-[var(--color-border)] shadow-inner">
            <div className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary"></span>
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-[var(--color-text-muted)] whitespace-nowrap">
              SECURE
            </span>
          </div>

          <div className="h-6 w-[1px] bg-[var(--color-border)] mx-1 hidden sm:block" />

          <div className="flex-shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;