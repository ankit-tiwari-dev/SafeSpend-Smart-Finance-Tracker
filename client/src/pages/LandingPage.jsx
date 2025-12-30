import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    LuLayoutDashboard,
    LuChartPie,
    LuGoal,
    LuArrowRight,
    LuShieldCheck,
    LuChartLine,
    LuSmartphone
} from "react-icons/lu";

// Using the generated images (assuming paths are accessible relative to public or src)
// Since I can't be 100% sure about the build setup for absolute imports of artifacts, 
// I will use them as background images or placeholder-like paths if they are moved to assets.
// For now, I'll use placeholders or assume they will be moved.
import HERO_BG from "../assets/images/safespend_hero_bg.png";
import FINANCE_IMG from "../assets/images/finance_management_card_img.png";
import INSIGHTS_IMG from "../assets/images/insights_card_img.png";

const LandingPage = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");

    const handleGetStarted = () => {
        if (isAuthenticated) {
            navigate("/dashboard");
        } else {
            navigate("/signup");
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30">
            {/* Header */}
            <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto sticky top-0 z-50 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[var(--color-brand-logo)] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--color-brand-logo)]/20">
                        <LuChartPie className="text-[var(--color-brand-logo-contrast)] text-2xl" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">SafeSpend</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#about" className="hover:text-white transition-colors">About</a>
                    <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Login
                    </Link>
                    <button
                        onClick={handleGetStarted}
                        className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-[0_8px_24px_color-mix(in_srgb,var(--color-primary),transparent_90%)]"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 px-8 overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                            <LuShieldCheck /> Trusted by 50,000+ users
                        </div>

                        <h1 className="text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                            Smart Finance for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Modern Living.</span>
                        </h1>

                        <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
                            Take control of your financial future with SafeSpend. Track expenses, set budgets, and gain AI-driven insights—all in one beautiful, secure dashboard.
                        </p>

                        <div className="flex items-center gap-6 pt-4">
                            <button
                                onClick={handleGetStarted}
                                className="group px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full text-lg font-bold transition-all shadow-xl shadow-[0_12px_32px_color-mix(in_srgb,var(--color-primary),transparent_80%)] flex items-center gap-2"
                            >
                                Start for Free <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="flex -space-x-3 overflow-hidden">
                                {[1, 2, 3, 4].map((i) => (
                                    <img
                                        key={i}
                                        className="inline-block h-10 w-10 rounded-full ring-2 ring-[#050505]"
                                        src={`https://i.pravatar.cc/100?u=${i}`}
                                        alt="User"
                                    />
                                ))}
                            </div>
                            <div className="text-sm text-gray-500">
                                <span className="block font-bold text-gray-300">4.9/5</span> Rating
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                        <div className="relative aspect-square rounded-[32px] overflow-hidden border border-white/10 bg-[#0a0a0a]">
                            <img
                                src={HERO_BG}
                                alt="Financial Globe"
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 px-8 bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto text-center space-y-4 mb-20">
                    <h2 className="text-4xl font-bold">Powerful tools to grow your wealth.</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to manage your money efficiently in a single platform.</p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Unified Dashboard",
                            desc: "Get a bird's eye view of your entire financial landscape in real-time.",
                            icon: <LuLayoutDashboard />,
                            img: FINANCE_IMG
                        },
                        {
                            title: "Smart Insights",
                            desc: "AI-driven analytics that help you identify saving opportunities.",
                            icon: <LuChartLine />,
                            img: INSIGHTS_IMG
                        },
                        {
                            title: "Financial Goals",
                            desc: "Set, track, and achieve your saving goals with ease.",
                            icon: <LuGoal />,
                            img: FINANCE_IMG // fallback or reused for consistency
                        }
                    ].map((feature, i) => (
                        <div key={i} className="group p-8 rounded-[32px] bg-[#050505] border border-white/5 hover:border-primary/20 transition-all flex flex-col h-full">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary text-2xl mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed mb-8 flex-1">{feature.desc}</p>
                            <div className="aspect-[16/10] rounded-2xl overflow-hidden mt-auto grayscale group-hover:grayscale-0 transition-all">
                                <img src={feature.img} alt={feature.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* App Stats */}
            <section className="py-24 px-8 border-y border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
                    {[
                        { label: "Volume Managed", value: "₹2.5B+" },
                        { label: "Active Users", value: "85K+" },
                        { label: "Availability", value: "99.9%" },
                        { label: "User Support", value: "24/7" }
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                                {stat.value}
                            </div>
                            <div className="text-xs uppercase tracking-widest font-black text-gray-500">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -z-10" />
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <h2 className="text-5xl lg:text-6xl font-bold">Ready to master your money?</h2>
                    <p className="text-xl text-gray-400">Join thousands of people who have already changed their financial lives with SafeSpend.</p>
                    <button
                        onClick={handleGetStarted}
                        className="px-10 py-5 bg-white text-black hover:bg-gray-200 rounded-full text-xl font-bold transition-all shadow-2xl flex items-center gap-3 mx-auto"
                    >
                        Create My Free Account <LuArrowRight />
                    </button>
                </div>
            </section>

            {/* Footer (Standalone for now, will integrate component later) */}
            <footer className="py-20 px-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[var(--color-brand-logo)] rounded-lg flex items-center justify-center">
                                <LuChartPie className="text-[var(--color-brand-logo-contrast)] text-xl" />
                            </div>
                            <span className="text-xl font-bold tracking-tight uppercase">SafeSpend</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            SafeSpend is the leading financial management platform for the modern era. Secure, smart, and stunningly simple.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Connect</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
                    &copy; {new Date().getFullYear()} SafeSpend Technologies Inc. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
