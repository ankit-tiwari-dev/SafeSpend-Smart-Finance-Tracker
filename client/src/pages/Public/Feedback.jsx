import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LuStar, LuMessageCircle, LuSend, LuArrowLeft } from "react-icons/lu";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/apiPaths";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const Feedback = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [formData, setFormData] = useState({
        category: "General Feedback",
        comment: ""
    });

    const categories = ["General Feedback", "Feature Request", "Bug Report", "Other"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            return toast.error("Please select a rating.");
        }
        setLoading(true);

        const submitData = {
            ...formData,
            rating,
            email: user?.email
        };

        try {
            await axios.post(`${BASE_URL}/api/v1/feedback`, submitData);
            toast.success("Thank you for your feedback!");
            setFormData({ category: "General Feedback", comment: "" });
            setRating(0);
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit feedback.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-[var(--color-surface)] rounded-[32px] overflow-hidden border border-[var(--color-border)] shadow-2xl p-8 sm:p-12 relative">

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-8 left-8 flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                    <LuArrowLeft /> Back
                </button>

                <div className="text-center mb-10 mt-8">
                    <h2 className="text-3xl font-bold mb-3">We Value Your Feedback</h2>
                    <p className="text-[var(--color-text-muted)]">Help us improve SafeSpend by sharing your thoughts.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Rating Stars */}
                    <div className="flex flex-col items-center gap-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">How would you rate your experience?</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                    className="transition-all transform hover:scale-110 focus:outline-none"
                                >
                                    <LuStar
                                        size={32}
                                        className={`${(hoverRating || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-[var(--color-border)]'} transition-colors duration-200`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] pl-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-3 px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-[var(--color-text)] appearance-none cursor-pointer"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        {/* Email field removed */}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] pl-1">Comments</label>
                        <textarea
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-3 px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium placeholder:text-[var(--color-text-muted)]/50 resize-none"
                            placeholder="Tell us what you think..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Submit Feedback <LuSend />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
