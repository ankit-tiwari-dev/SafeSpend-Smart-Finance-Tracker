import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LuMail, LuUser, LuMessageSquare, LuSend, LuArrowLeft } from "react-icons/lu";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/apiPaths";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const Contact = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        subject: "",
        message: ""
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({ ...prev, name: user.fullName || "" }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const submitData = {
            ...formData,
            email: user?.email
        };

        try {
            await axios.post(`${BASE_URL}/api/v1/contact`, submitData);
            toast.success("Message sent successfully!");
            setFormData({ name: user?.fullName || "", subject: "", message: "" });
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans flex items-center justify-center p-4">
            <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[var(--color-surface)] rounded-[32px] overflow-hidden border border-[var(--color-border)] shadow-2xl">

                {/* Visual Side */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-8"
                        >
                            <LuArrowLeft /> Back
                        </button>
                        <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
                        <p className="text-[var(--color-text-muted)] leading-relaxed">
                            Have questions about SafeSpend? We're here to help. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg)] flex items-center justify-center text-primary shadow-lg">
                                <LuMail size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Email Us</p>
                                <p className="text-lg font-medium">oliver827691@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                    <div className="lg:hidden mb-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                        >
                            <LuArrowLeft /> Back
                        </button>
                    </div>

                    <h3 className="text-2xl font-bold mb-2">Send a Message</h3>
                    <p className="text-[var(--color-text-muted)] mb-8">Fill out the form below to contact our team.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] pl-1">Full Name</label>
                            <div className="relative">
                                <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-3 pl-11 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium placeholder:text-[var(--color-text-muted)]/50"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] pl-1">Subject</label>
                            <div className="relative">
                                <LuMessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-3 pl-11 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium placeholder:text-[var(--color-text-muted)]/50"
                                    placeholder="How can we help?"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)] pl-1">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl py-3 px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium placeholder:text-[var(--color-text-muted)]/50 resize-none"
                                placeholder="Write your message here..."
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
                                    Send Message <LuSend />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
