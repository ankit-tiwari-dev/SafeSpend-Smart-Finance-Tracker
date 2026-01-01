import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    LuLayoutDashboard,
    LuChartPie,
    LuGoal,
    LuArrowRight,
    LuShieldCheck,
    LuChartLine,
    LuMenu,
    LuX,
    LuQuote
} from "react-icons/lu";

import HERO_BG from "../assets/images/safespend_hero_bg.png";
import FINANCE_IMG from "../assets/images/finance_management_card_img.png";
import INSIGHTS_IMG from "../assets/images/insights_card_img.png";

// Enhanced data for a more professional look
const testimonials = [
    { text: "SafeSpend helped me save over 20% more each month. Highly recommend!", name: "Alex Johnson", role: "Freelancer" },
    { text: "The AI insights are amazing! I finally understand where my money goes.", name: "Sarah Williams", role: "Product Manager" },
    { text: "Easy to use, secure, and visually stunning dashboard.", name: "Michael Chen", role: "Developer" },
    { text: "I love how I can set goals and track them effortlessly.", name: "Emily Davis", role: "Designer" },
    { text: "Customer support is fast and helpful whenever needed.", name: "David Miller", role: "Entrepreneur" },
];

const LandingPage = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isAuthenticated = !!localStorage.getItem("token");

    const handleGetStarted = () => navigate(isAuthenticated ? "/dashboard" : "/signup");
    
    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const NavLink = ({ href, children, mobile = false }) => (
        <a 
            href={href} 
            onClick={() => mobile && setIsMobileMenuOpen(false)}
            className={`font-medium text-gray-400 hover:text-white transition-colors ${mobile ? 'block py-3 text-lg' : 'text-sm'}`}
        >
            {children}
        </a>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 font-sans">
            {/* Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#050505]/70 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
                            <div className="w-10 h-10 bg-[var(--color-brand-logo)] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--color-brand-logo)]/20 group-hover:scale-105 transition-transform">
                                <LuChartPie className="text-[var(--color-brand-logo-contrast)] text-2xl" />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold tracking-tight">SafeSpend</span>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-8">
                            <NavLink href="#features">Features</NavLink>
                            <NavLink href="#feedback">Feedback</NavLink>
                            <NavLink href="#contact">Contact</NavLink>
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                Login
                            </Link>
                            <button
                                onClick={handleGetStarted}
                                className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-0.5"
                            >
                                Get Started
                            </button>
                        </div>

                        {/* Mobile Toggle */}
                        <button 
                            className="md:hidden text-2xl text-gray-300 hover:text-white p-2"
                            onClick={toggleMenu}
                        >
                            {isMobileMenuOpen ? <LuX /> : <LuMenu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 shadow-2xl animate-fade-in-down">
                        <div className="px-6 py-8 flex flex-col gap-2">
                            <NavLink href="#features" mobile>Features</NavLink>
                            <NavLink href="#feedback" mobile>Feedback</NavLink>
                            <NavLink href="#contact" mobile>Contact</NavLink>
                            <div className="h-px bg-white/10 my-4" />
                            <Link 
                                to="/login" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-3 text-lg font-medium text-gray-400 hover:text-white"
                            >
                                Login
                            </Link>
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    handleGetStarted();
                                }}
                                className="mt-2 w-full py-4 bg-primary text-white rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-8 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] lg:w-[800px] h-[500px] bg-primary/15 blur-[100px] lg:blur-[130px] rounded-full -z-10" />
                
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="space-y-6 lg:space-y-8 text-center lg:text-left z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0 backdrop-blur-md">
                            <LuShieldCheck /> Trusted by 50,000+ users
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                            Smart Finance for <br className="hidden lg:block"/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-400">Modern Living.</span>
                        </h1>

                        <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                            Take control of your financial future with SafeSpend. Track expenses, set budgets, and gain AI-driven insights—all in one beautiful, secure dashboard.
                        </p>

                        <div className="pt-4 flex justify-center lg:justify-start">
                            <button
                                onClick={handleGetStarted}
                                className="group px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-full text-lg font-bold transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center gap-2 transform hover:-translate-y-1"
                            >
                                Start for Free <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="relative group mx-auto w-full max-w-[500px] lg:max-w-none perspective-1000">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-[32px] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative aspect-square rounded-[32px] overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
                            <img
                                src={HERO_BG}
                                alt="Financial Globe"
                                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 px-4 sm:px-8 bg-[#0a0a0a] relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                
                <div className="max-w-7xl mx-auto text-center space-y-4 mb-20">
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Powerful tools to <span className="text-primary">grow your wealth.</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">Everything you need to manage your money efficiently in a single platform.</p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[{
                        title: "Unified Dashboard",
                        desc: "Get a bird's eye view of your entire financial landscape in real-time.",
                        icon: <LuLayoutDashboard />,
                        img: FINANCE_IMG
                    },{
                        title: "Smart Insights",
                        desc: "AI-driven analytics that help you identify saving opportunities.",
                        icon: <LuChartLine />,
                        img: INSIGHTS_IMG
                    },{
                        title: "Financial Goals",
                        desc: "Set, track, and achieve your saving goals with ease.",
                        icon: <LuGoal />,
                        img: FINANCE_IMG
                    }].map((feature, i) => (
                        <div key={i} className="group relative p-1 rounded-[32px] transition-all duration-300 h-full">
                            {/* Gradient Border Effect on Hover */}
                            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div className="absolute -inset-[1px] rounded-[33px] bg-gradient-to-b from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                            
                            <div className="relative h-full p-8 rounded-[30px] bg-[#050505] border border-white/5 group-hover:border-transparent transition-all overflow-hidden flex flex-col group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/10">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-primary text-2xl mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-lg">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-100">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed mb-8 flex-1 group-hover:text-gray-300 transition-colors">{feature.desc}</p>
                                <div className="aspect-[16/10] rounded-xl overflow-hidden mt-auto grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/5 group-hover:border-primary/20">
                                    <img src={feature.img} alt={feature.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Feedback Section */}
            <section id="feedback" className="py-24 bg-[#050505] relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center mb-16 px-4">
                    <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">Testimonials</span>
                    <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        Loved by thousands
                    </h2>
                </div>

                {/* Fade Masks for Infinite Scroll */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 z-10 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 z-10 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />
                
                <div className="w-full overflow-hidden flex py-4">
                    <div className="flex animate-slide whitespace-nowrap gap-6 sm:gap-8 px-4">
                        {/* Duplicate Data for seamless loop */}
                        {[...testimonials, ...testimonials].map((item, i) => (
                            <div
                                key={i}
                                className="inline-block relative w-[350px] sm:w-[400px] bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm border border-white/5 hover:border-white/10 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl whitespace-normal group"
                            >
                                <LuQuote className="text-4xl text-white/10 mb-4 group-hover:text-primary/50 transition-colors" />
                                <p className="text-lg text-gray-300 leading-relaxed mb-6 font-light">"{item.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs font-bold text-white ring-2 ring-black">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <style>
                    {`
                        @keyframes slide {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-slide {
                            display: flex;
                            width: max-content;
                            animation: slide 60s linear infinite;
                        }
                        /* Pause on Hover for better UX */
                        .animate-slide:hover {
                            animation-play-state: paused;
                        }
                        .animate-fade-in-down {
                            animation: fadeInDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                        }
                        @keyframes fadeInDown {
                            from { opacity: 0; transform: translateY(-10px) scale(0.98); }
                            to { opacity: 1; transform: translateY(0) scale(1); }
                        }
                    `}
                </style>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-4 sm:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />
                
                <div className="max-w-4xl mx-auto text-center space-y-10">
                    <h2 className="text-4xl lg:text-7xl font-bold tracking-tight text-white">
                        Ready to master <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">your money?</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">Join thousands of people who have already changed their financial lives with SafeSpend.</p>
                    <button
                        onClick={handleGetStarted}
                        className="w-full sm:w-auto px-12 py-5 bg-white text-black hover:bg-gray-200 rounded-full text-xl font-bold transition-all shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] flex items-center justify-center gap-3 mx-auto transform hover:scale-105 active:scale-95"
                    >
                        Create My Free Account <LuArrowRight />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-4 sm:px-8 border-t border-white/5 bg-[#020202]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20">
                    <div className="col-span-1 sm:col-span-2 md:col-span-1 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[var(--color-brand-logo)] rounded-lg flex items-center justify-center">
                                <LuChartPie className="text-[var(--color-brand-logo-contrast)] text-xl" />
                            </div>
                            <span className="text-xl font-bold tracking-tight uppercase">SafeSpend</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                            SafeSpend is the leading financial management platform for the modern era. Secure, smart, and stunningly simple.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-white">Product</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-white">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-white">Connect</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
                    <span>&copy; {new Date().getFullYear()} SafeSpend Technologies Inc. All rights reserved.</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
                        <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-gray-400 transition-colors">Cookies</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;