import React, { useState, useEffect, useCallback } from "react";
import {
  LuLightbulb,
  LuTrendingUp,
  LuShieldCheck,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";

const SLIDES = [
  {
    title: "Strategic Allocation",
    desc: "Adhere to the 50/30/20 rule: 50% Essentials, 30% Lifestyle, 20% Financial Growth.",
    icon: <LuLightbulb className="text-amber-400" />,
    color: "from-amber-500/10 via-transparent to-transparent",
    accent: "bg-amber-400/20"
  },
  {
    title: "Capital Momentum",
    desc: "Market consistency outperforms timing. Automate your contribution stream to leverage compounding.",
    icon: <LuTrendingUp className="text-emerald-400" />,
    color: "from-emerald-500/10 via-transparent to-transparent",
    accent: "bg-emerald-400/20"
  },
  {
    title: "Liquidity Reserve",
    desc: "Maintain a 3–6 month emergency buffer to ensure protocol stability during volatility.",
    icon: <LuShieldCheck className="text-blue-400" />,
    color: "from-blue-500/10 via-transparent to-transparent",
    accent: "bg-blue-400/20"
  },
];

const DashboardSlider = ({ isLoading = false }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    if (isLoading || isPaused) return;

    const timer = setInterval(nextSlide, 8000); // 8 seconds for better readability
    return () => clearInterval(timer);
  }, [isLoading, isPaused, nextSlide]);

  if (isLoading) {
    return (
      <div className="w-full min-h-[160px] sm:min-h-[200px] rounded-[32px] sm:rounded-[48px] border border-[var(--color-border)] bg-[var(--color-surface)] animate-pulse mb-8 p-6 sm:p-10 flex items-center gap-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white/[0.03]" />
        <div className="space-y-4 flex-1">
          <div className="h-2 w-24 bg-white/[0.03] rounded" />
          <div className="h-6 w-2/3 bg-white/[0.03] rounded" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full min-h-[160px] sm:min-h-[200px] rounded-[32px] sm:rounded-[48px] overflow-hidden group bg-[var(--color-surface)] border border-[var(--color-border)] mb-8 transition-all duration-500 hover:border-white/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${SLIDES[current].color} opacity-60 transition-all duration-1000 ease-in-out`}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.02]" />

      {/* Main Content */}
      <div className="relative h-full flex items-center px-6 sm:px-12 py-8 gap-6 sm:gap-10">
        
        {/* Animated Icon Container */}
        <div className="relative shrink-0">
          <div className={`absolute -inset-4 ${SLIDES[current].accent} rounded-full blur-2xl opacity-40 transition-all duration-1000`} />
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-[22px] sm:rounded-[30px] bg-[var(--color-bg)] border border-white/5 flex items-center justify-center text-2xl sm:text-4xl shadow-2xl relative z-10 backdrop-blur-xl">
            {SLIDES[current].icon}
          </div>
        </div>

        {/* Textual Intelligence - Key triggers animation on change */}
        <div 
          key={current}
          className="space-y-2 max-w-full sm:max-w-2xl animate-in fade-in slide-in-from-right-8 duration-700 ease-out"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary/30" />
            <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-primary/80">
              {SLIDES[current].title}
            </h4>
          </div>
          <p className="text-sm sm:text-2xl font-bold text-[var(--color-text)] leading-tight tracking-tight sm:tracking-tighter italic">
            "{SLIDES[current].desc}"
          </p>
        </div>
      </div>

      {/* Navigation Controls - Desktop Only Floating */}
      <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 hidden group-hover:flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={prevSlide}
          className="p-3 rounded-2xl bg-[var(--color-bg)]/80 backdrop-blur-md hover:bg-primary/20 text-[var(--color-text)] transition-all border border-white/5 hover:border-primary/40 active:scale-90"
        >
          <LuChevronLeft size={18} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-2xl bg-[var(--color-bg)]/80 backdrop-blur-md hover:bg-primary/20 text-[var(--color-text)] transition-all border border-white/5 hover:border-primary/40 active:scale-90"
        >
          <LuChevronRight size={18} />
        </button>
      </div>

      {/* Progress Pagination */}
      <div className="absolute left-6 sm:left-12 bottom-6 sm:bottom-10 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group py-2 px-1"
          >
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current
                  ? "w-8 sm:w-12 bg-primary shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)]"
                  : "w-2 sm:w-3 bg-white/10 group-hover:bg-white/20"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardSlider;