import { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";

const SignUpPage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null); // 'taken', 'available', 'checking', 'invalid'
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otp, setOtp] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const checkEmail = async (emailToCheck) => {
    if (!validateEmail(emailToCheck)) {
      setEmailStatus(null);
      return;
    }
    setEmailStatus("checking");
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.CHECK_EMAIL, { email: emailToCheck });
      if (response.data.exists) {
        setEmailStatus("taken");
      } else {
        setEmailStatus("available");
      }
    } catch (err) {
      if (err.response?.data?.invalid) {
        setEmailStatus("invalid");
        setError(err.response.data.message);
      } else {
        setEmailStatus(null);
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    // Trim inputs
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) return setError("Full name cannot be empty!");
    if (!validateEmail(trimmedEmail)) return setError("Please enter a valid email address!");
    if (!password) return setError("Please enter a password!");
    if (!confirmPassword) return setError("Please confirm your password!");
    if (password !== confirmPassword) return setError("Passwords do not match!");

    setLoading(true);

    try {
      let profileImageUrl = "";
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName: trimmedName,
        email: trimmedEmail,
        password,
        profileImageUrl,
      });

      if (response.data) {
        setIsOtpStep(true);
      }
    } catch (err) {
      if (!err.response) {
        setError("Connection protocol failed. Ensure backend is active and permits this origin (CORS).");
      } else {
        setError(err.response?.data?.message || "Sign up failed, please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySignUp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return setError("Please enter the 6-digit code.");
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.VERIFY_SIGNUP, {
        email: email.trim(),
        otp,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-lg">
        <div className="space-y-2 mb-10">
          <h1 className="text-3xl font-black tracking-tight text-[var(--color-text)]">
            Credential Deployment
          </h1>
          <p className="text-sm font-bold text-[var(--color-text-muted)] opacity-60">
            {isOtpStep ? "Verify your email to activate your account." : "Join the elite tier of asset management."}
          </p>
        </div>

        {!isOtpStep ? (
          <form onSubmit={handleSignUp} className="space-y-8">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Legal Name"
                placeholder="e.g. John Wick"
                type="text"
              />
              <div className="relative">
                <Input
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  onBlur={({ target }) => checkEmail(target.value)}
                  label="Contact Identifier"
                  placeholder="agent@safespend.io"
                  type="text"
                />
                {emailStatus === "taken" && (
                  <p className="absolute -bottom-5 left-0 text-[10px] font-black uppercase text-red-500 tracking-widest animate-pulse">
                    ID ALREADY INITIALIZED
                  </p>
                )}
                {emailStatus === "available" && (
                  <p className="absolute -bottom-5 left-0 text-[10px] font-black uppercase text-emerald-500 tracking-widest">
                    ID AVAILABLE
                  </p>
                )}
                {emailStatus === "invalid" && (
                  <p className="absolute -bottom-5 left-0 text-[10px] font-black uppercase text-red-500 tracking-widest animate-pulse">
                    INVALID IDENTIFIER
                  </p>
                )}
              </div>
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Security Key"
                placeholder="Minimum 8 characters"
                type="password"
              />
              <Input
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
                label="Key Verification"
                placeholder="Re-enter security key"
                type="password"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                <p className="text-xs font-black text-red-500 uppercase tracking-widest text-center">
                  {error}
                </p>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                className={`btn-primary w-full py-4 text-sm tracking-[0.3em] ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? "Establishing ID..." : "ESTABLISH SAFESPEND ID"}
              </button>
            </div>

            <p className="text-xs font-bold text-center text-[var(--color-text-muted)]">
              Already authenticated?{" "}
              <Link className="text-[var(--color-primary)] hover:underline ml-1" to="/login">
                Portal Access
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerifySignUp} className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
                Verification Code Sent to {email}
              </label>
              <input
                type="text"
                placeholder="000000"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full py-4 px-6 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl text-center text-3xl font-black tracking-[0.5em] focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                <p className="text-xs font-black text-red-500 uppercase tracking-widest text-center">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              className={`btn-primary w-full py-4 text-sm tracking-[0.3em] ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "VERIFYING..." : "ACTIVATE ACCOUNT"}
            </button>

            <button
              type="button"
              onClick={() => setIsOtpStep(false)}
              className="w-full text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] hover:text-primary transition-colors"
            >
              Change Details
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
