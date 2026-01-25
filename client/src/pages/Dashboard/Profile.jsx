import { useState, useEffect, useContext } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Modal from "../../components/Modal";
import ConfirmAlert from "../../components/ConfirmAlert";
import { LuPencil, LuTrash2, LuBan, LuCamera, LuShieldCheck } from "react-icons/lu";

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
  const [isUpdatePasswordOpen, setIsUpdatePasswordOpen] = useState(false);
  const [updatePasswordData, setUpdatePasswordData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isOtpSent, setIsOtpSent] = useState(false);

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
          dob: response.data.dob
            ? new Date(response.data.dob).toISOString().split("T")[0]
            : "",
          phone: response.data.phone || "",
          address: response.data.address || "",
          city: response.data.city || "",
          state: response.data.state || "",
          country: response.data.country || "",
          zip: response.data.zip || "",
        });
      }
    } catch (error) {
      toast.error("Failed to sync identity matrix.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      let profileImageUrl = userProfile.profileImageUrl;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        const uploadRes = await axiosInstance.post(
          API_PATHS.IMAGE.UPLOAD_IMAGE,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        profileImageUrl = uploadRes.data.imageUrl;
      }

      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        ...profileData,
        profileImageUrl,
      });

      if (response.status === 200) {
        setUserProfile(response.data);
        setIsEditing(false);
        toast.success("Signature and Neural Codex updated.");

        fetchUserProfile();
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Protocol error: Failed to commit bio stream.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearAllTransactions = async () => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_ALL_INCOME);
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_ALL_EXPENSE);
      setClearAllTransactions(false);
      toast.success("Ledger wiped clean.");
    } catch (error) {
      toast.error("Erasure protocol failed.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.AUTH.DELETE_ACCOUNT
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        clearUser();
        navigate("/login");
      }
    } catch (error) {
      toast.error("Termination failed.");
      setDeleteAccount(false);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await axiosInstance.post(API_PATHS.AUTH.SEND_OTP);
      setIsOtpSent(true);
      toast.success("Security code transmitted to your linked email.");
    } catch (error) {
      toast.error("Failed to send security code.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (updatePasswordData.newPassword !== updatePasswordData.confirmPassword) {
      return toast.error("Keys do not match.");
    }
    if (updatePasswordData.otp.length !== 6) {
      return toast.error("Invalid security code.");
    }

    setLoading(true);
    try {
      await axiosInstance.put(API_PATHS.AUTH.UPDATE_PASSWORD, {
        otp: updatePasswordData.otp,
        newPassword: updatePasswordData.newPassword,
      });
      toast.success("Security protocols updated. Access key synchronized.");
      setIsUpdatePasswordOpen(false);
      setUpdatePasswordData({ otp: "", newPassword: "", confirmPassword: "" });
      setIsOtpSent(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Protocol update failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <DashboardLayout activeMenu="Profile">
      <div className="py-8 sm:py-12 max-w-[1600px] mx-auto space-y-12 sm:space-y-20 px-4 sm:px-6">
        {/* Header Protocol */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="space-y-3 relative group">
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-[0.4em] text-[var(--color-text)]">
              Identity Matrix
            </h2>
            <p className="text-[9px] sm:text-[10px] font-black text-primary uppercase tracking-[0.3em]">
              Manage your financial signature and security protocols
            </p>
            <div className="h-px w-32 bg-gradient-to-r from-primary/40 to-transparent group-hover:w-48 transition-all duration-700" />
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 sm:flex-none group relative flex items-center justify-center gap-3 bg-primary py-4 px-8 rounded-2xl transition-all hover:scale-[1.05] active:scale-95 shadow-xl shadow-primary/20"
                >
                  <LuPencil
                    size={16}
                    className="text-[var(--color-primary-contrast)]"
                  />
                  <span className="text-[var(--color-primary-contrast)] font-black uppercase tracking-widest text-[10px]">
                    Refine Signature
                  </span>
                </button>

                <button
                  onClick={() => setIsUpdatePasswordOpen(true)}
                  className="p-4 rounded-2xl bg-[var(--color-divider)] hover:bg-emerald-500/10 border border-[var(--color-border)] hover:border-emerald-500/20 transition-all text-[var(--color-text-muted)] hover:text-emerald-500 flex items-center gap-2 group"
                  title="Update Access Key"
                >
                  <LuShieldCheck size={18} />
                  <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest">
                    Secure
                  </span>
                </button>

                <button
                  onClick={() => setClearAllTransactions(true)}
                  className="p-4 rounded-2xl bg-[var(--color-divider)] hover:bg-red-500/10 border border-[var(--color-border)] hover:border-red-500/20 transition-all text-[var(--color-text-muted)] hover:text-red-500 flex items-center gap-2 group"
                >
                  <LuTrash2 size={18} />
                  <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest">
                    Wipe
                  </span>
                </button>

                <button
                  onClick={() => setDeleteAccount(true)}
                  className="p-4 rounded-2xl bg-[var(--color-divider)] hover:bg-red-500/10 border border-[var(--color-border)] hover:border-red-500/20 transition-all text-[var(--color-text-muted)] hover:text-red-500 flex items-center gap-2 group"
                >
                  <LuBan size={18} />
                  <span className="hidden sm:inline text-[9px] font-black uppercase tracking-widest">
                    Terminate
                  </span>
                </button>
              </>
            ) : (
              <div className="flex gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  Discard
                </button>
                <button
                  onClick={handleUpdateProfile}
                  className="flex-1 px-8 py-4 rounded-2xl bg-primary text-[var(--color-primary-contrast)] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.05] transition-all"
                >
                  Commit Matrix
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-20">
          {/* Avatar Component */}
          <div className="lg:col-span-4">
            <div className="bg-[var(--color-surface)] p-8 sm:p-12 rounded-[40px] sm:rounded-[56px] border border-[var(--color-border)] shadow-2xl flex flex-col items-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative mb-10 group/avatar">
                <div className="absolute -inset-6 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover/avatar:opacity-100 transition-opacity animate-pulse" />
                <div className="relative z-10 p-1 rounded-full border border-white/10 bg-[var(--color-bg)]">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[var(--color-surface)] shadow-2xl flex items-center justify-center bg-white/[0.02]">
                    {previewUrl || userProfile?.profileImageUrl ? (
                      <img
                        src={previewUrl || userProfile?.profileImageUrl}
                        alt="Identity"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-7xl font-black text-white/5 italic select-none">
                        {userProfile?.fullName?.[0] || "A"}
                      </span>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <label className="absolute bottom-2 right-2 p-4 bg-primary text-[var(--color-primary-contrast)] rounded-2xl cursor-pointer shadow-2xl hover:scale-110 active:scale-95 transition-all z-20 border-4 border-[var(--color-surface)]">
                    <LuCamera size={20} />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              <div className="text-center w-full space-y-2 mb-10">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-[var(--color-text)] truncate">
                  {userProfile?.fullName || "Agent Spectre"}
                </h3>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-30">
                  Active Since{" "}
                  {moment(userProfile?.createdAt).format("MMM YYYY")}
                </p>
              </div>

              <div className="w-full space-y-4">
                <label className="text-[8px] font-black uppercase tracking-[0.4em] text-primary/40 ml-4">
                  Neural Codex (Bio)
                </label>
                <div
                  className={`p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] bg-[var(--color-bg)] border border-[var(--color-border)] transition-all ${isEditing ? "border-primary/60 ring-2 ring-primary/10" : ""
                    }`}
                >
                  {isEditing ? (
                    <textarea
                      className="w-full bg-transparent border-none outline-none text-[var(--color-text)] leading-relaxed font-bold resize-none text-[12px] placeholder:opacity-30 focus:ring-0"
                      value={profileData.bio || ""} // Fallback prevents the 'locked' feeling
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      } // Using prev state for safety
                      placeholder="Type your bio here..."
                      rows={5}
                      autoFocus // Automatically puts the cursor there
                    />
                  ) : (
                    <p className="text-[var(--color-text-muted)] opacity-60 leading-relaxed font-bold text-[12px] min-h-[100px]">
                      {profileData.bio ||
                        "No neural data detected. High-level financial focus maintained."}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields Component */}
          <div className="lg:col-span-8">
            <div className="bg-[var(--color-surface)] p-8 sm:p-12 rounded-[40px] sm:rounded-[56px] border border-[var(--color-border)] shadow-2xl space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <ProfileField
                  label="Identity Designation"
                  value={profileData.fullName}
                  isEditing={isEditing}
                  onChange={(val) =>
                    setProfileData({ ...profileData, fullName: val })
                  }
                />
                <ProfileField
                  label="Linked Protocol (Email)"
                  value={userProfile?.email}
                  isEditing={false}
                />

                <div className="space-y-4">
                  <label className="text-[8px] font-black uppercase tracking-[0.4em] text-primary/40 ml-4">
                    Biological Marker
                  </label>
                  <select
                    disabled={!isEditing}
                    value={profileData.gender}
                    onChange={(e) =>
                      setProfileData({ ...profileData, gender: e.target.value })
                    }
                    className={`w-full py-4 px-6 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl text-[var(--color-text)] font-black uppercase tracking-widest text-[10px] outline-none transition-all ${isEditing
                        ? "border-primary/40 focus:ring-4 focus:ring-primary/5 cursor-pointer"
                        : "opacity-40"
                      }`}
                  >
                    <option value="">Undeclared</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <ProfileField
                  label="Initial Sync (DOB)"
                  value={profileData.dob}
                  isEditing={isEditing}
                  type="date"
                  onChange={(val) =>
                    setProfileData({ ...profileData, dob: val })
                  }
                />
                <ProfileField
                  label="Comm-Link Trace"
                  value={profileData.phone}
                  isEditing={isEditing}
                  placeholder="+1 000 000 000"
                  onChange={(val) =>
                    setProfileData({ ...profileData, phone: val })
                  }
                />
                <ProfileField
                  label="Geographic Sector"
                  value={profileData.country}
                  isEditing={isEditing}
                  onChange={(val) =>
                    setProfileData({ ...profileData, country: val })
                  }
                />

                <div className="md:col-span-2">
                  <ProfileField
                    label="Matrix Locale (Address)"
                    value={profileData.address}
                    isEditing={isEditing}
                    onChange={(val) =>
                      setProfileData({ ...profileData, address: val })
                    }
                  />
                </div>

                <ProfileField
                  label="City Node"
                  value={profileData.city}
                  isEditing={isEditing}
                  onChange={(val) =>
                    setProfileData({ ...profileData, city: val })
                  }
                />
                <ProfileField
                  label="State Grid"
                  value={profileData.state}
                  isEditing={isEditing}
                  onChange={(val) =>
                    setProfileData({ ...profileData, state: val })
                  }
                />
                <ProfileField
                  label="ZIP Protocol"
                  value={profileData.zip}
                  isEditing={isEditing}
                  onChange={(val) =>
                    setProfileData({ ...profileData, zip: val })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <Modal
        isOpen={clearAllTransactions}
        onClose={() => setClearAllTransactions(false)}
        title="Ledger Erasure"
      >
        <div className="p-2 sm:p-4">
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
        <div className="p-2 sm:p-4">
          <ConfirmAlert
            content="Prepare for total account de-materialization. All data streams will be permanently severed."
            onConfirm={handleDeleteAccount}
            confirmContent="Sever Protocol"
            color="error"
          />
        </div>
      </Modal>

      <Modal
        isOpen={isUpdatePasswordOpen}
        onClose={() => {
          setIsUpdatePasswordOpen(false);
          setIsOtpSent(false);
        }}
        title="Security Access Protocol"
      >
        <div className="p-4 space-y-6">
          {!isOtpSent ? (
            <div className="space-y-4 text-center">
              <p className="text-xs font-bold text-[var(--color-text-muted)] opacity-60">
                To update your access key, we must verify your identity via a one-time security code.
              </p>
              <button
                onClick={handleSendOtp}
                className="btn-primary w-full py-4 text-[10px] tracking-[0.2em]"
                disabled={loading}
              >
                {loading ? "TRANSMITTING..." : "GENERATE SECURITY CODE"}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
                  Security Code
                </label>
                <input
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  value={updatePasswordData.otp}
                  onChange={(e) => setUpdatePasswordData({ ...updatePasswordData, otp: e.target.value })}
                  className="w-full py-4 px-6 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl text-center text-2xl font-black tracking-[0.5em] focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
                  New Access Key
                </label>
                <input
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={updatePasswordData.newPassword}
                  onChange={(e) => setUpdatePasswordData({ ...updatePasswordData, newPassword: e.target.value })}
                  className="w-full py-4 px-6 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl text-xs font-bold focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
                  Verify New Key
                </label>
                <input
                  type="password"
                  placeholder="Re-enter access key"
                  value={updatePasswordData.confirmPassword}
                  onChange={(e) => setUpdatePasswordData({ ...updatePasswordData, confirmPassword: e.target.value })}
                  className="w-full py-4 px-6 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl text-xs font-bold focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none"
                />
              </div>

              <button
                onClick={handleUpdatePassword}
                className="btn-primary w-full py-4 text-[10px] tracking-[0.2em]"
                disabled={loading}
              >
                {loading ? "COMMITTING..." : "AUTHORIZE UPDATE"}
              </button>

              <button
                onClick={() => setIsOtpSent(false)}
                className="w-full py-2 text-[9px] font-black uppercase tracking-widest text-primary/40 hover:text-primary transition-colors"
                disabled={loading}
              >
                Resend Code?
              </button>
            </div>
          )}
        </div>
      </Modal>
    </DashboardLayout>
  );
};

const ProfileField = ({
  label,
  value,
  isEditing,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div className="space-y-4">
    <label className="text-[8px] font-black uppercase tracking-[0.4em] text-primary/40 ml-4 italic">
      {label}
    </label>
    <div
      className={`transition-all duration-300 ${isEditing ? "scale-[1.02]" : ""
        }`}
    >
      <input
        type={type}
        value={value}
        disabled={!isEditing}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full py-4 px-6 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl text-[var(--color-text)] font-bold text-xs outline-none transition-all ${isEditing
            ? "border-primary/40 focus:ring-4 focus:ring-primary/5 placeholder:opacity-20"
            : "opacity-40"
          }`}
      />
    </div>
  </div>
);

export default Profile;
