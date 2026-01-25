import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password");
        }
    }, [email, navigate]);

    const handleReset = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) return setError("Enter the 6-digit security code.");
        if (!newPassword || newPassword.length < 8) return setError("Security key must be at least 8 characters.");
        if (newPassword !== confirmPassword) return setError("Security keys do not match.");

        setError("");
        setLoading(true);

        try {
            await axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD, {
                email,
                otp,
                newPassword,
            });
            toast.success("Security protocols restored. Access granted.");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Reset failed. Verify your code and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-sm">
                <div className="space-y-2 mb-10">
                    <h1 className="text-3xl font-black tracking-tight text-[var(--color-text)]">
                        Verify & Update
                    </h1>
                    <p className="text-sm font-bold text-[var(--color-text-muted)] opacity-60">
                        Confirm identity and establish new security parameters.
                    </p>
                </div>

                <form onSubmit={handleReset} className="space-y-6">
                    <Input
                        value={otp}
                        onChange={({ target }) => setOtp(target.value)}
                        label="Verification Code (6-Digits)"
                        placeholder="000000"
                        type="text"
                        maxLength={6}
                    />
                    <Input
                        value={newPassword}
                        onChange={({ target }) => setNewPassword(target.value)}
                        label="New Access Key"
                        placeholder="Min. 8 chars"
                        type="password"
                    />
                    <Input
                        value={confirmPassword}
                        onChange={({ target }) => setConfirmPassword(target.value)}
                        label="Confirm New Key"
                        placeholder="Repeat key"
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
                        className={`btn-primary w-full py-4 text-sm tracking-[0.3em] ${loading ? "opacity-70" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "PROCESSING..." : "COMMIT CHANGES"}
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default ResetPassword;
