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
import APP_LOGO from "../assets/images/safespend_logo.png";

import ThemeToggle from "../components/ThemeToggle";

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

    const handleGetStarted = () => navigate(isAuthenticated ? "/dashboard" : "/login");

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const NavLink = ({ href, children, mobile = false }) => (
        <a
            href={href}
            onClick={() => mobile && setIsMobileMenuOpen(false)}
            className={`font-medium transition-colors ${mobile ? 'block py-3 text-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary)]' : 'text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
        >
            {children}
        </a>
    );

    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-primary/30 font-sans">
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[var(--color-bg)]/70 backdrop-blur-xl border-b border-[var(--color-border)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
                            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-black/5 group-hover:scale-105 transition-transform bg-[var(--color-surface)]">
                                <img
                                    src={APP_LOGO}
                                    alt="SafeSpend Logo"
                                    width="40"
                                    height="40"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold tracking-tight">SafeSpend</span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <NavLink href="#features">Features</NavLink>
                            <NavLink href="#security">Security</NavLink>
                            <NavLink href="#feedback">Feedback</NavLink>
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            <ThemeToggle className="!p-2 !bg-transparent border-none hover:text-[var(--color-primary)]" />
                            <Link to="/login" className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                                Login
                            </Link>
                            <button
                                onClick={handleGetStarted}
                                className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-0.5"
                            >
                                Get Started
                            </button>
                        </div>

                        <div className="md:hidden flex items-center gap-2">
                            <ThemeToggle className="!p-2 !bg-transparent border-none" />
                            <button
                                className="text-2xl text-[var(--color-text-muted)] hover:text-[var(--color-text)] p-2"
                                onClick={toggleMenu}
                            >
                                {isMobileMenuOpen ? <LuX /> : <LuMenu />}
                            </button>
                        </div>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-[var(--color-bg)] border-b border-[var(--color-border)] shadow-2xl animate-fade-in-down">
                        <div className="px-6 py-8 flex flex-col gap-2">
                            <NavLink href="#features" mobile>Features</NavLink>
                            <NavLink href="#security" mobile>Security</NavLink>
                            <NavLink href="#feedback" mobile>Feedback</NavLink>
                            <div className="h-px bg-[var(--color-border)] my-4" />
                            <Link
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-3 text-lg font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
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

            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-8 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] lg:w-[800px] h-[500px] bg-primary/15 blur-[100px] lg:blur-[130px] rounded-full -z-10" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="space-y-6 lg:space-y-8 text-center lg:text-left z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-primary text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0 backdrop-blur-md">
                            <LuShieldCheck /> Trusted by 50,000+ users
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                            Smart Finance for <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-400">Modern Living.</span>
                        </h1>

                        <p className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                            Take control of your financial future with SafeSpend. Track expenses, set budgets, and gain AI-driven insights—all in one beautiful, secure dashboard.
                        </p>

                        <div className="pt-4 flex justify-center lg:justify-start">
                            <button
                                onClick={handleGetStarted}
                                className="group px-8 py-4 bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90 rounded-full text-lg font-bold transition-all shadow-[0_10px_40px_-10px_rgba(var(--color-primary-rgb),0.3)] flex items-center gap-2 transform hover:-translate-y-1"
                            >
                                Start for Free <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="relative group mx-auto w-full max-w-[500px] lg:max-w-none perspective-1000">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-500 rounded-[32px] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative aspect-square rounded-[32px] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">
                            <img
                                src={HERO_BG}
                                alt="Financial Globe"
                                fetchpriority="high"
                                loading="eager"
                                width="500"
                                height="500"
                                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="py-24 px-4 sm:px-8 bg-[var(--color-bg)] relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

                <div className="max-w-7xl mx-auto text-center space-y-4 mb-20">
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Financial Mastery, <span className="text-primary">Simplified.</span></h2>
                    <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg">SafeSpend provides a comprehensive suite of tools designed to help you track, analyze, and optimize your personal finances through an intuitive, data-driven interface.</p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[{
                        title: "Unified Dashboard",
                        desc: "Get a bird's eye view of your entire financial landscape in real-time.",
                        icon: <LuLayoutDashboard />,
                        img: FINANCE_IMG
                    }, {
                        title: "Smart Insights",
                        desc: "AI-driven analytics that help you identify saving opportunities.",
                        icon: <LuChartLine />,
                        img: INSIGHTS_IMG
                    }, {
                        title: "Financial Goals",
                        desc: "Set, track, and achieve your saving goals with ease.",
                        icon: <LuGoal />,
                        img: FINANCE_IMG
                    }].map((feature, i) => (
                        <div key={i} className="group relative p-1 rounded-[32px] transition-all duration-300 h-full">
                            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-[var(--color-border)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div className="absolute -inset-[1px] rounded-[33px] bg-gradient-to-b from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                            <div className="relative h-full p-8 rounded-[30px] bg-[var(--color-surface)] border border-[var(--color-border)] group-hover:border-transparent transition-all overflow-hidden flex flex-col group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/10">
                                <div className="w-14 h-14 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center text-primary text-2xl mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-lg">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-[var(--color-text-muted)] leading-relaxed mb-8 flex-1 group-hover:text-[var(--color-text)] transition-colors">{feature.desc}</p>
                                <div className="aspect-[16/10] rounded-xl overflow-hidden mt-auto grayscale group-hover:grayscale-0 transition-all duration-500 border border-[var(--color-border)] group-hover:border-primary/20 bg-[var(--color-bg)]">
                                    <img
                                        src={feature.img}
                                        alt={feature.title}
                                        loading="lazy"
                                        width="400"
                                        height="250"
                                        className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="security" className="py-24 px-4 sm:px-8 bg-[var(--color-bg)] relative overflow-hidden text-left">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -z-10" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 relative text-left">
                        <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full opacity-50" />
                        <div className="relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[32px] p-8 sm:p-12 backdrop-blur-xl">
                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary text-2xl shrink-0">
                                        <LuShieldCheck />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold mb-2">Secure Authentication</h3>
                                        <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">We use Google OAuth for secure, passwordless login. We only request your <strong>primary email address</strong> and basic profile info to identify you and protect your account.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary text-2xl shrink-0">
                                        <LuChartLine />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold mb-2">Data Transparency</h3>
                                        <p className="text-[var(--color-text-muted)] leading-relaxed text-sm">Your financial data is private and encrypted. We use your email solely to send <strong>automated login notifications</strong> and <strong>account updates</strong> to keep you informed of your financial status.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 space-y-6 text-left">
                        <span className="text-primary text-sm font-bold uppercase tracking-widest block">Privacy First</span>
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Your data, <br /> protected by design.</h2>
                        <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
                            At SafeSpend, transparency isn't just a feature—it's our foundation. We clearly outline why we need your data and how it helps you master your finances. No hidden tracking, no data selling. Just pure financial empowerment.
                        </p>
                        <ul className="space-y-4">
                            {["Verified Google Authentication", "End-to-End Encrypted Data", "Transparent Usage Policies"].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-[var(--color-text-muted)]">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">✓</div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
            <section id="feedback" className="py-24 bg-[var(--color-bg)] relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center mb-16 px-4">
                    <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">Testimonials</span>
                    <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[var(--color-text)] to-[var(--color-text-muted)]">
                        Loved by thousands
                    </h2>
                </div>

                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 z-10 bg-gradient-to-r from-[var(--color-bg)] to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 z-10 bg-gradient-to-l from-[var(--color-bg)] to-transparent pointer-events-none" />

                <div className="w-full overflow-hidden flex py-4">
                    <div className="flex animate-slide whitespace-nowrap gap-6 sm:gap-8 px-4">
                        {[...testimonials, ...testimonials].map((item, i) => (
                            <div
                                key={i}
                                className="inline-block relative w-[350px] sm:w-[400px] bg-[var(--color-surface)] hover:bg-[var(--color-surface)]/80 backdrop-blur-sm border border-[var(--color-border)] rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl whitespace-normal group"
                            >
                                <LuQuote className="text-4xl text-[var(--color-text-muted)]/10 mb-4 group-hover:text-primary/50 transition-colors" />
                                <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-6 font-light">"{item.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-purple-500 flex items-center justify-center text-xs font-bold text-white ring-2 ring-[var(--color-bg)]">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">{item.name}</h4>
                                        <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">{item.role}</p>
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

            <section className="py-32 px-4 sm:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />

                <div className="max-w-4xl mx-auto text-center space-y-10">
                    <h2 className="text-4xl lg:text-7xl font-bold tracking-tight">
                        Ready to master <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-text)] via-[var(--color-text-muted)] to-[var(--color-text)]">your money?</span>
                    </h2>
                    <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto font-light">Join thousands of people who have already changed their financial lives with SafeSpend.</p>
                    <button
                        onClick={handleGetStarted}
                        className="w-full sm:w-auto px-12 py-5 bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90 rounded-full text-xl font-bold transition-all shadow-[0_10px_50px_-10px_rgba(var(--color-primary-rgb),0.4)] flex items-center justify-center gap-3 mx-auto transform hover:scale-105 active:scale-95"
                    >
                        Create My Free Account <LuArrowRight />
                    </button>
                </div>
            </section>

            <footer className="py-20 px-4 sm:px-8 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20">
                    <div className="col-span-1 sm:col-span-2 md:col-span-1 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-[var(--color-surface)]">
                                <img
                                    src={APP_LOGO}
                                    alt="SafeSpend Logo"
                                    loading="lazy"
                                    width="32"
                                    height="32"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-xl font-bold tracking-tight uppercase">SafeSpend</span>
                        </div>
                        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs">
                            SafeSpend is the leading financial management platform for the modern era. Secure, smart, and stunningly simple.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-[var(--color-text-muted)]">
                            <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#security" className="hover:text-primary transition-colors">Security</a></li>
                            <li><a href="#feedback" className="hover:text-primary transition-colors">Testimonials</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-[var(--color-text-muted)]">
                            <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                            <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Connect</h4>
                        <ul className="space-y-4 text-sm text-[var(--color-text-muted)]">
                            <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center text-xs text-[var(--color-text-muted)] gap-4">
                    <span>&copy; {new Date().getFullYear()} SafeSpend Technologies Inc. All rights reserved.</span>
                    <div className="flex gap-6">
                        <Link to="/terms-and-conditions" className="hover:text-[var(--color-text)] transition-colors">Terms & Conditions</Link>
                        <Link to="/privacy-policy" className="hover:text-[var(--color-text)] transition-colors">Privacy</Link>
                        <a href="#" className="hover:text-[var(--color-text)] transition-colors">Cookies</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;