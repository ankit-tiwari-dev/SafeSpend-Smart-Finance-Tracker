import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";

const VerifySignUp = () => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");

    useEffect(() => {
        if (!email) {
            navigate("/signup");
        }
    }, [email, navigate]);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) return setError("Enter the 6-digit security code.");

        setError("");
        setLoading(true);

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.VERIFY_SIGNUP, {
                email,
                otp,
            });

            const { token, user } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                toast.success("Account activated. Welcome to the elite tier.");
                window.location.href = "/dashboard"; // Using href for fresh state
            }
        } catch (err) {
            setError(err.response?.data?.message || "Verification failed. Check your code.");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setLoading(true);
        try {
            await axiosInstance.post(API_PATHS.AUTH.SEND_OTP, { email });
            toast.success("Security code re-transmitted.");
        } catch (err) {
            toast.error("Transmission failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-sm">
                <div className="space-y-2 mb-10">
                    <h1 className="text-3xl font-black tracking-tight text-[var(--color-text)]">
                        Account Activation
                    </h1>
                    <p className="text-sm font-bold text-[var(--color-text-muted)] opacity-60">
                        Enter the security code sent to {email}
                    </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                    <input
                        type="text"
                        placeholder="000000"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full py-4 px-6 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl text-center text-4xl font-black tracking-[0.5em] focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none mb-4"
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
                        className={`btn-primary w-full py-4 text-sm tracking-[0.3em] ${loading ? "opacity-70" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "VERIFYING..." : "ACTIVATE ACCESS"}
                    </button>

                    <div className="flex flex-col items-center gap-4 pt-6">
                        <button
                            type="button"
                            onClick={handleResend}
                            className="text-xs font-black uppercase tracking-widest text-[var(--color-primary)] hover:opacity-70 transition-opacity"
                            disabled={loading}
                        >
                            Resend Security Code
                        </button>
                        <Link
                            to="/signup"
                            className="text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                        >
                            Abort & Return
                        </Link>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
};

export default VerifySignUp;
