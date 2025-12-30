import React, { useState, useEffect } from "react";
import { LuLightbulb, LuTrendingUp, LuShieldCheck, LuChevronLeft, LuChevronRight } from "react-icons/lu";

const SLIDES = [
    {
        title: "Smart Spending Tip",
        desc: "Allocate 50% of your income to needs, 30% to wants, and 20% to savings or debt repayment.",
        icon: <LuLightbulb className="text-amber-400" />,
        color: "from-amber-500/10 to-transparent"
    },
    {
        title: "Investment Insights",
        desc: "Consistency is key. Consider setting up automatic monthly contributions to your investment accounts.",
        icon: <LuTrendingUp className="text-emerald-400" />,
        color: "from-emerald-500/10 to-transparent"
    },
    {
        title: "Safety First",
        desc: "Ensure your emergency fund covers at least 3-6 months of essential living expenses.",
        icon: <LuShieldCheck className="text-blue-400" />,
        color: "from-blue-500/10 to-transparent"
    }
];

const DashboardSlider = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
    const prev = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

    return (
        <div className="relative w-full h-44 rounded-[32px] overflow-hidden group bg-[var(--color-surface)] border border-[var(--color-border)] mb-8 shadow-card">
            {/* Gradient Backgrounds */}
            <div className={`absolute inset-0 bg-gradient-to-r ${SLIDES[current].color} opacity-40 transition-all duration-1000`} />

            <div className="relative h-full flex items-center px-10 gap-8">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-divider)] border border-[var(--color-border)] flex items-center justify-center text-3xl shrink-0 shadow-inner">
                    {SLIDES[current].icon}
                </div>

                <div className="space-y-1 max-w-2xl animate-in slide-in-from-bottom-2 duration-500">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary opacity-60">
                        {SLIDES[current].title}
                    </h4>
                    <p className="text-xl font-bold text-[var(--color-text)] leading-tight tracking-tight">
                        {SLIDES[current].desc}
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="absolute right-8 bottom-8 flex gap-2">
                <button
                    onClick={prev}
                    className="p-2 rounded-full bg-[var(--color-divider)] hover:bg-primary/20 text-[var(--color-text)] transition-colors border border-[var(--color-border)]"
                >
                    <LuChevronLeft size={16} />
                </button>
                <button
                    onClick={next}
                    className="p-2 rounded-full bg-[var(--color-divider)] hover:bg-primary/20 text-[var(--color-text)] transition-colors border border-[var(--color-border)]"
                >
                    <LuChevronRight size={16} />
                </button>
            </div>

            {/* Pagination dots */}
            <div className="absolute left-10 bottom-8 flex gap-2">
                {SLIDES.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-primary' : 'w-2 bg-[var(--color-border)]'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default DashboardSlider;
