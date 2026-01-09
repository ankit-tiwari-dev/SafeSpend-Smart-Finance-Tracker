import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import Modal from "../Modal";
import ConfirmAlert from "../ConfirmAlert";
import { HiOutlineX } from "react-icons/hi"; // Added for mobile close

const SideMenu = ({ activeMenu, closeSideMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleClick = (route) => {
    if (route === "/logout") {
      setOpenLogoutModal(true);
      return;
    }
    navigate(route);
    // Close sidebar on mobile after clicking a link
    if (window.innerWidth < 1024) closeSideMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };

  return (
    <>
      <aside className="h-full flex flex-col bg-[var(--color-sidebar)] p-8 overflow-y-auto scrollbar-hide relative">
        {/* Mobile Close Button - Visible only on small screens */}
        <button
          onClick={closeSideMenu}
          className="lg:hidden absolute top-6 right-6 p-2 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] hover:text-primary transition-all z-50"
        >
          <HiOutlineX className="text-xl" />
        </button>

        {/* Profile Card */}
        <div className="relative mb-12 group cursor-pointer" onClick={() => navigate("/profile")}>
          <div className="absolute -inset-0.5 bg-gradient-to-br from-primary via-transparent to-secondary rounded-[32px] opacity-10 group-hover:opacity-30 blur-sm transition-all duration-500" />
          <div className="relative bg-[var(--color-bg)] p-6 rounded-[30px] border border-[var(--color-border)] flex flex-col items-center">
            <div className="relative mb-4">
              {user?.profileImageUrl ? (
                <img src={user.profileImageUrl} alt="Profile" className="w-20 h-20 rounded-full border-2 border-white/10 ring-4 ring-black" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                  <span className="text-primary text-3xl font-black">{user?.fullName?.[0]}</span>
                </div>
              )}
            </div>
            <div className="text-center w-full">
              <h5 className="text-lg font-black text-[var(--color-text)] truncate tracking-tight mb-0.5">{user?.fullName || "Agent Spectre"}</h5>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary opacity-60">SafeSpend Authorized</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text)] opacity-20 mb-6 ml-4">Command Center</p>
          {SIDE_MENU_DATA.map((item, index) => {
            const isActive = activeMenu === item.label;
            return (
              <button
                key={index}
                onClick={() => handleClick(item.path)}
                className={`w-full relative flex items-center gap-4 py-4 px-6 rounded-2xl transition-all duration-500 ${
                  isActive ? "text-primary bg-primary/5" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                {isActive && <div className="absolute left-0 w-1 h-2/3 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.8)]" />}
                <item.icon className={`text-xl ${isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.5)]" : ""}`} />
                <span className="font-black text-sm uppercase tracking-widest">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Status */}
        <div className="mt-auto pt-8 border-t border-[var(--color-divider)] flex items-center gap-3 px-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60">System Online</span>
        </div>
      </aside>

      <Modal isOpen={openLogoutModal} onClose={() => setOpenLogoutModal(false)} title="Terminate Session">
        <div className="p-6">
          <ConfirmAlert content="Disconnect from the Portal? Unsaved tactical data may be lost." onConfirm={handleLogout} confirmContent="Disconnect" color="error" />
        </div>
      </Modal>
    </>
  );
};

export default SideMenu;