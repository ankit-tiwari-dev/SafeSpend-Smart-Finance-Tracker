import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import Footer from "./Footer";

const DashboardLayout = (props) => {
  const { children, activeMenu } = props;
  const { user } = useContext(UserContext);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(window.innerWidth >= 1024);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-x-hidden" style={{ backgroundColor: "var(--color-bg)" }}>
      {user && (
        <>
          {/* Main Sidebar Container */}
          <div
            className={`fixed inset-y-0 left-0 z-[60] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
            ${isSideMenuOpen ? 'translate-x-0 w-80' : '-translate-x-full w-80'} 
            lg:block bg-[var(--color-sidebar)] border-r border-[var(--color-border)] shadow-2xl`}
          >
            <SideMenu activeMenu={activeMenu} closeSideMenu={() => setIsSideMenuOpen(false)} />
          </div>

          {/* Mobile Overlay */}
          {isSideMenuOpen && (
            <div
              className="fixed inset-0 bg-[#050505]/40 backdrop-blur-sm z-[55] lg:hidden animate-in fade-in duration-300"
              onClick={() => setIsSideMenuOpen(false)}
            />
          )}

          {/* Main Content Area */}
          <div
            className={`flex-1 flex flex-col min-w-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
            ${isSideMenuOpen ? 'lg:pl-80' : 'lg:pl-0'}`}
          >
            <Navbar
              activeMenu={activeMenu}
              isSideMenuOpen={isSideMenuOpen}
              toggleSideMenu={() => setIsSideMenuOpen(!isSideMenuOpen)}
            />
            <div className="flex-1 p-4 md:p-8">
              {children}
            </div>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
