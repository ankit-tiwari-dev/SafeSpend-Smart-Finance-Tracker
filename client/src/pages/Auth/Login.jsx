import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS, BASE_URL } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address!");
      return;
    }
    if (!password) {
      setError("Password cannot be empty!");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed, please try again."
      );
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="space-y-2 mb-10">
          <h1 className="text-3xl font-black tracking-tight text-[var(--color-text)]">
            SafeSpend Portal
          </h1>
          <p className="text-sm font-bold text-[var(--color-text-muted)] opacity-60">
            Authorization required for system access.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Security Identifier (Email)"
            placeholder="e.g. agent@safespend.io"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Access Protocol (Password)"
            placeholder="Enter security key"
            type="password"
          />

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <p className="text-xs font-black text-red-500 uppercase tracking-widest text-center">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary w-full py-4 text-sm tracking-[0.3em]"
          >
            AUTHORIZE ACCESS
          </button>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[var(--color-divider)]"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-black tracking-widest">
              <span className="bg-[var(--color-bg)] px-4 text-[var(--color-text-muted)] opacity-30">
                Analytical Peer Login
              </span>
            </div>
          </div>

          {/* Google/SafeSpend ID Login */}
          <button
            type="button"
            onClick={() => (window.location.href = `${BASE_URL}/api/v1/auth/google`)}
            className="w-full py-4 text-xs font-black uppercase tracking-widest border-2 border-[var(--color-divider)] hover:border-[var(--color-primary)] hover:bg-[var(--color-divider)] rounded-2xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with SafeSpend ID
          </button>

          {/* Signup Link */}
          <p className="text-xs font-bold text-center text-[var(--color-text-muted)] pt-6">
            New operative?{" "}
            <Link
              className="text-[var(--color-primary)] hover:underline ml-1"
              to="/signup"
            >
              Establish Credentials
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
