import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please enter a valid email address!");
            return;
        }
        setError("");
        setLoading(true);

        try {
            await axiosInstance.post(API_PATHS.AUTH.SEND_OTP, { email });
            navigate(`/reset-password?email=${encodeURIComponent(email)}`);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-sm">
                <div className="space-y-2 mb-10">
                    <h1 className="text-3xl font-black tracking-tight text-[var(--color-text)]">
                        Reset Protocol
                    </h1>
                    <p className="text-sm font-bold text-[var(--color-text-muted)] opacity-60">
                        Request an access key reset via verified email.
                    </p>
                </div>

                <form onSubmit={handleRequestOTP} className="space-y-6">
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Security Identifier (Email)"
                        placeholder="agent@safespend.io"
                        type="text"
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
                        {loading ? "TRANSMITTING..." : "GENERATE RESET KEY"}
                    </button>

                    <div className="text-center pt-6">
                        <Link
                            to="/login"
                            className="text-xs font-black uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                        >
                            Abort & Return
                        </Link>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword;
