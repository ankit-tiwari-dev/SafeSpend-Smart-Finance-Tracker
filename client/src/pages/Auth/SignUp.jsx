import { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

const SignUpPage = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { updateUser } = useContext(UserContext);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Full name cannot be empty!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    if (!password) {
      setError("Please enter a password!");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password!");
      return;
    }

    if (confirmPassword !== password) {
      setError("Passwords do not match!");
      return;
    }

    setError("");

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "Sign up failed, please try again.",
        );
      } else {
        setError("An unexpected error occurred, please try again later.");
      }
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
            Join the elite tier of asset management.
          </p>
        </div>

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
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Contact Identifier"
              placeholder="agent@safespend.io"
              type="text"
            />
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
            <button type="submit" className="btn-primary w-full py-4 text-sm tracking-[0.3em]">
              ESTABLISH SAFESPEND ID
            </button>
          </div>

          <p className="text-xs font-bold text-center text-[var(--color-text-muted)]">
            Already authenticated? {" "}
            <Link className="text-[var(--color-primary)] hover:underline ml-1" to="/login">
              Portal Access
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
