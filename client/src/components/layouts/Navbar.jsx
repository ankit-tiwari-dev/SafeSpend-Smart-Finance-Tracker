import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LuChartPie } from "react-icons/lu";
import SideMenu from "./SideMenu";
import ThemeToggle from "../ThemeToggle";

const Navbar = (props) => {
  const { activeMenu, toggleSideMenu, isSideMenuOpen } = props;

  return (
    <div
      className="flex gap-8 backdrop-blur-[120px] py-5 px-10 sticky top-0 z-50 transition-all duration-500 border-b border-[var(--color-border)]"
      style={{
        backgroundColor: "rgba(var(--color-bg-rgb), 0.7)",
      }}
    >
      <button
        className="hover:scale-110 transition-transform text-[var(--color-text-muted)] hover:text-[var(--color-text)] mr-4"
        onClick={toggleSideMenu}
      >
        {isSideMenuOpen ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <Link to="/dashboard" className="flex items-center gap-4 group overflow-hidden" style={{ flex: 1 }}>
        <div className="w-10 h-10 bg-[var(--color-brand-logo)] rounded-2xl flex items-center justify-center shadow-2xl shadow-[0_8px_32px_color-mix(in_srgb,var(--color-brand-logo),transparent_70%)] group-hover:rotate-[20deg] group-hover:scale-110 transition-all duration-500">
          <LuChartPie className="text-[var(--color-brand-logo-contrast)] text-xl" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-black tracking-tight text-[var(--color-text)] leading-none group-hover:translate-x-1 transition-transform duration-500">
            SafeSpend
          </h2>
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-primary/40 leading-none mt-1">
            Premium 3.0
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-divider)] border border-[var(--color-border)]">
          <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Secure Connection</span>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};


export default Navbar;
