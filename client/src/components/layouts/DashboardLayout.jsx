import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import Footer from "./Footer";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  // Initialize to false for SSR compatibility, will be set in useEffect
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      const isDesktop = window.innerWidth >= 1024;
      setIsLargeScreen(isDesktop);
      // Auto-open on desktop, auto-close on mobile
      if (isDesktop) setIsSideMenuOpen(true);
      else setIsSideMenuOpen(false);
    };

    // Call immediately on mount to ensure state is synced
    checkSize();
    
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-[var(--color-bg)] overflow-x-hidden">
      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-[60] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
          ${isSideMenuOpen ? "translate-x-0 w-80" : "-translate-x-full w-80"}
          bg-[var(--color-sidebar)] border-r border-[var(--color-border)] shadow-2xl`}
      >
        <SideMenu activeMenu={activeMenu} closeSideMenu={() => setIsSideMenuOpen(false)} />
      </div>

      {/* Mobile Overlay */}
      {isSideMenuOpen && !isLargeScreen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55]"
          onClick={() => setIsSideMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isSideMenuOpen && isLargeScreen ? "lg:pl-80" : "lg:pl-0"}`}
      >
        <Navbar
          activeMenu={activeMenu}
          isSideMenuOpen={isSideMenuOpen}
          toggleSideMenu={() => setIsSideMenuOpen(!isSideMenuOpen)}
        />
        <main className="flex-1 p-4 md:p-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;