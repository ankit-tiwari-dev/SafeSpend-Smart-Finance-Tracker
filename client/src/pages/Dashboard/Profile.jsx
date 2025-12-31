import { useState, useEffect, useContext } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Input from "../../components/Inputs/Input";
import CharAvatar from "../../components/Cards/CharAvatar";
import Textarea from "../../components/Inputs/Textarea";
import SettingButton from "../../components/Profile/SettingButton";
import Modal from "../../components/Modal";
import ConfirmAlert from "../../components/ConfirmAlert";
import { LuPencil, LuTrash2, LuBan } from "react-icons/lu";

const Profile = () => {
  useUserAuth();

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    bio: "",
    gender: "",
    dob: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [clearAllTransactions, setClearAllTransactions] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
      if (response.data) {
        setUserProfile(response.data);
        setProfileData({
          fullName: response.data.fullName || "",
          bio: response.data.bio || "",
          gender: response.data.gender || "",
          dob: response.data.dob ? new Date(response.data.dob).toISOString().split('T')[0] : "",
          phone: response.data.phone || "",
          address: response.data.address || "",
          city: response.data.city || "",
          state: response.data.state || "",
          country: response.data.country || "",
          zip: response.data.zip || "",
        });
      }
    } catch (error) {
      toast.error("Failed to fetch user profile. Please try again.");
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      let profileImageUrl = userProfile.profileImageUrl;

      // 1. Upload image if selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const uploadRes = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        profileImageUrl = uploadRes.data.imageUrl;
      }

      // 2. Update profile data
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        ...profileData,
        profileImageUrl,
      });

      if (response.status === 200) {
        setUserProfile(response.data);
        setIsEditing(false);
        toast.success("Profile updated successfully!");
        fetchUserProfile();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearAllTransactions = async () => {
    try {
      const income_response = await axiosInstance.delete(
        API_PATHS.INCOME.DELETE_ALL_INCOME,
      );
      const expense_response = await axiosInstance.delete(
        API_PATHS.EXPENSE.DELETE_ALL_EXPENSE,
      );
      if (income_response.status === 200 && expense_response.status === 200) {
        setClearAllTransactions(false);
        toast.success("All transactions cleared successfully!");
      }
    } catch (error) {
      console.error("Error clearing all transactions:", error);
      toast.error("Failed to clear transactions. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.AUTH.DELETE_ACCOUNT,
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        clearUser();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account. Please try again.");
      setDeleteAccount(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="py-12 max-w-[1600px] mx-auto space-y-20 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="space-y-3">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[var(--color-text)]">
              Identity Matrix
            </h2>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
              Manage your financial signature and security protocols
            </p>
            <div className="h-px w-32 bg-gradient-to-r from-primary/40 to-transparent pt-0.5" />
          </div>

          <div className="flex gap-4">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="group relative flex items-center gap-3 bg-primary py-4 px-10 rounded-2xl overflow-hidden transition-all hover:scale-[1.05] active:scale-95 shadow-2xl shadow-[0_12px_32px_color-mix(in_srgb,var(--color-primary),transparent_80%)]"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <LuPencil size={18} className="text-[var(--color-primary-contrast)] relative z-10" />
                  <span className="text-[var(--color-primary-contrast)] font-black uppercase tracking-widest text-[10px] relative z-10">Refine Signature</span>
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => setClearAllTransactions(true)}
                    className="group relative px-6 py-4 rounded-2xl bg-white/[0.02] hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 transition-all"
                    title="Wipe Ledger"
                  >
                    <div className="flex items-center gap-3">
                      <LuTrash2 size={20} className="text-white/30 group-hover:text-red-500 transition-colors" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-red-500 transition-colors">Wipe Data</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setDeleteAccount(true)}
                    className="group relative px-6 py-4 rounded-2xl bg-white/[0.02] hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 transition-all"
                    title="Terminate Node"
                  >
                    <div className="flex items-center gap-3">
                      <LuBan size={20} className="text-white/30 group-hover:text-red-500 transition-colors" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-red-500 transition-colors">Delete Account</span>
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="py-4 px-10 rounded-2xl bg-[var(--color-divider)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:bg-white/10 transition-all font-black uppercase tracking-widest text-[10px]"
                >
                  Discard
                </button>
                <button
                  onClick={handleUpdateProfile}
                  className="py-4 px-10 rounded-2xl bg-primary text-[var(--color-primary-contrast)] shadow-2xl shadow-primary/20 hover:scale-[1.05] transition-all font-black uppercase tracking-widest text-[10px]"
                >
                  Commit Matrix
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left Column: Avatar & Bio */}
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-[var(--color-surface)] p-12 rounded-[56px] border border-[var(--color-border)] shadow-2xl flex flex-col items-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative group/avatar mb-10">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary via-transparent to-secondary rounded-full opacity-10 blur-2xl group-hover/avatar:opacity-30 transition-opacity animate-pulse" />

                <div className="relative z-10 p-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]">
                  {previewUrl || profileData.profileImageUrl || userProfile?.profileImageUrl ? (
                    <img
                      src={previewUrl || userProfile?.profileImageUrl}
                      alt="Profile"
                      className="w-56 h-56 rounded-full object-cover border-4 border-[var(--color-surface)] shadow-2xl"
                    />
                  ) : (
                    <div className="w-56 h-56 rounded-full border-4 border-[var(--color-surface)] bg-[var(--color-surface)] shadow-2xl flex items-center justify-center">
                      <span className="text-8xl font-black text-[var(--color-text-muted)] opacity-10 italic">
                        {userProfile?.fullName?.[0] || "S"}
                      </span>
                    </div>
                  )}
                </div>

                {isEditing && (
                  <label className="absolute bottom-4 right-4 p-5 bg-primary text-[var(--color-primary-contrast)] rounded-3xl cursor-pointer shadow-2xl hover:scale-110 active:scale-95 transition-all z-20 border-4 border-[var(--color-surface)]">
                    <LuPencil size={24} />
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                )}
              </div>

              <div className="text-center mb-10">
                <h3 className="text-3xl font-black tracking-tighter text-[var(--color-text)] truncate w-full mb-2">
                  {userProfile?.fullName || "Agent Spectre"}
                </h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-40">
                  Node Active Since {moment(userProfile?.createdAt).format("MMM YYYY")}
                </p>
              </div>

              <div className="w-full space-y-4">
                <label className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-20 ml-4 italic">Neural Codex (Bio)</label>
                <div className={`p-8 rounded-[40px] bg-[var(--color-bg)] border border-[var(--color-border)] transition-all relative overflow-hidden ${isEditing ? 'border-primary/30 ring-1 ring-primary/20' : ''}`}>
                  {isEditing ? (
                    <textarea
                      className="w-full bg-transparent border-none outline-none text-[var(--color-text)] opacity-80 leading-relaxed font-bold resize-none text-[13px] placeholder:text-[var(--color-text-muted)] opacity-20"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      placeholder="Input neural data streams..."
                      rows={6}
                    />
                  ) : (
                    <p className="text-[var(--color-text-muted)] opacity-40 leading-relaxed font-bold text-[13px]">
                      {profileData.bio || "No neural data detected. High-level financial focus maintained."}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Metadata */}
          <div className="lg:col-span-8">
            <div className="bg-[var(--color-surface)] p-12 rounded-[56px] border border-[var(--color-border)] shadow-2xl space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <ProfileField label="Identity Designation" value={profileData.fullName} isEditing={isEditing} onChange={(val) => setProfileData({ ...profileData, fullName: val })} />
                <ProfileField label="Linked Protocol (Email)" value={userProfile?.email} isEditing={false} />

                <div className="space-y-4">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-20 ml-4 italic">Biological Marker (Gender)</label>
                  <div className={`relative transition-all ${isEditing ? 'scale-[1.02]' : ''}`}>
                    <select
                      disabled={!isEditing}
                      value={profileData.gender}
                      onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                      className={`w-full py-5 px-8 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-3xl text-[var(--color-text)] font-black uppercase tracking-widest text-[11px] outline-none appearance-none transition-all ${isEditing ? 'hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10 cursor-pointer' : 'cursor-default opacity-40'}`}
                    >
                      <option value="">Undeclared</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <ProfileField label="Initial Synchronization (DOB)" value={profileData.dob} isEditing={isEditing} type="date" onChange={(val) => setProfileData({ ...profileData, dob: val })} />
                <ProfileField label="Comm-Link Trace (Phone)" value={profileData.phone} isEditing={isEditing} placeholder="+1 000 000 000" onChange={(val) => setProfileData({ ...profileData, phone: val })} />
                <ProfileField label="Geographic Sector (Country)" value={profileData.country} isEditing={isEditing} onChange={(val) => setProfileData({ ...profileData, country: val })} />

                <div className="md:col-span-2">
                  <ProfileField label="Secure Matrix Locale (Address)" value={profileData.address} isEditing={isEditing} onChange={(val) => setProfileData({ ...profileData, address: val })} />
                </div>

                <ProfileField label="City Node" value={profileData.city} isEditing={isEditing} onChange={(val) => setProfileData({ ...profileData, city: val })} />
                <ProfileField label="State Grid" value={profileData.state} isEditing={isEditing} onChange={(val) => setProfileData({ ...profileData, state: val })} />
                <ProfileField label="ZIP Encryption Protocol" value={profileData.zip} isEditing={isEditing} onChange={(val) => setProfileData({ ...profileData, zip: val })} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={clearAllTransactions}
        onClose={() => setClearAllTransactions(false)}
        title="Ledger Erasure"
      >
        <div className="p-4 bg-[var(--color-bg)] rounded-3xl border border-[var(--color-border)]">
          <ConfirmAlert
            content="Initiating a total wipe of all financial history. This operation is irreversible."
            onConfirm={handleClearAllTransactions}
            confirmContent="Execute Wipe"
            color="error"
          />
        </div>
      </Modal>

      <Modal
        isOpen={deleteAccount}
        onClose={() => setDeleteAccount(false)}
        title="Node Termination"
      >
        <div className="p-4 bg-[var(--color-bg)] rounded-3xl border border-[var(--color-border)]">
          <ConfirmAlert
            content="Prepare for total account de-materialization. All data streams will be permanently severed."
            onConfirm={handleDeleteAccount}
            confirmContent="Sever Protocol"
            color="error"
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

const ProfileField = ({ label, value, isEditing, onChange, type = "text", placeholder }) => (
  <div className="space-y-4">
    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-20 ml-4 italic">{label}</label>
    <div className={`transition-all ${isEditing ? 'scale-[1.02]' : ''}`}>
      <input
        type={type}
        value={value}
        disabled={!isEditing}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full py-5 px-8 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-3xl text-[var(--color-text)] font-black tracking-tight text-sm outline-none transition-all ${isEditing ? 'hover:border-primary/40 focus:border-primary/80 focus:ring-4 focus:ring-primary/10 placeholder:text-[var(--color-text-muted)] opacity-20' : 'cursor-default opacity-40'}`}
      />
    </div>
  </div>
);

export default Profile;
