import SHOWCASE_DASHBOARD from "../../assets/images/showcase-dashboard.png";
import SHOWCASE_INSIGHTS from "../../assets/images/showcase-insights.png";
import SHOWCASE_BUDGET from "../../assets/images/showcase-budget.png";
import { LuShieldCheck, LuTrophy } from "react-icons/lu";
import APP_LOGO from "../../assets/images/safespend_logo.png";
import { Link } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--color-bg)] overflow-hidden">
      <div className="flex-1 flex flex-col p-6 sm:p-12 md:p-16 lg:px-20 lg:pt-5 lg:pb-20 relative z-10 overflow-y-auto">
        <div className="max-w-xl w-full mx-auto mt-6 sm:mt-12 md:mt-16 lg:mt-4 lg:mb-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
          <Link to="/" className="flex items-center gap-4 sm:gap-6 group mb-10 sm:mb-16">
            <div className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl shadow-white/5 -mt-1 bg-white/5">
              <img
                src={APP_LOGO}
                alt="SafeSpend Logo"
                width="48"
                height="48"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-black tracking-tight text-[var(--color-text)] leading-none">
                SafeSpend
              </h2>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/40 leading-none mt-1">
                Premium 3.0
              </span>
            </div>
          </Link>

          <div className="w-full">
            {children}
          </div>
        </div>

        <div className="mt-auto pt-10 flex flex-wrap items-center gap-6 opacity-30 text-[10px]">
          <div className="flex items-center gap-2">
            <LuShieldCheck className="text-primary text-xl" />
            <span className="font-black uppercase tracking-widest text-[var(--color-text)]">
              SafeSpend Secure
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LuTrophy className="text-primary text-xl" />
            <span className="font-black uppercase tracking-widest text-[var(--color-text)]">
              Elite Class A
            </span>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-full lg:w-[45vw] bg-[var(--color-surface)] border-l border-[var(--color-border)] relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute top-1/4 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-700" />

        <div className="relative w-full h-full flex items-center justify-center p-16 sm:p-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-video bg-black/20 rounded-[40px] blur-3xl" />
          <div className="relative w-full aspect-video z-30 transform hover:scale-[1.02] transition-transform duration-700 bg-white/5 rounded-[32px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-transparent opacity-20 rounded-[32px] z-10" />
            <img
              src={SHOWCASE_DASHBOARD}
              alt="Dashboard Showcase"
              loading="lazy"
              width="800"
              height="450"
              className="w-full h-full object-cover rounded-[32px] border border-white/10 shadow-2xl"
            />
          </div>

          <div className="absolute -bottom-10 left-10 w-2/3 aspect-video z-40 animate-in slide-in-from-bottom-20 duration-1000 bg-white/5 rounded-[24px]">
            <img
              src={SHOWCASE_INSIGHTS}
              alt="Insights Showcase"
              loading="lazy"
              width="600"
              height="337"
              className="w-full h-full object-cover rounded-[24px] border border-white/10 shadow-2xl"
            />
          </div>

          <div className="absolute -top-10 right-10 w-2/3 aspect-video z-20 opacity-40 blur-sm hover:blur-none transition-all duration-700 bg-white/5 rounded-[24px]">
            <img
              src={SHOWCASE_BUDGET}
              alt="Budget Showcase"
              loading="lazy"
              width="600"
              height="337"
              className="w-full h-full object-cover rounded-[24px] border border-white/10 shadow-lg"
            />
          </div>
        </div>

        <div className="absolute bottom-12 inset-x-0 text-center z-50">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[var(--color-text)] opacity-20">
            Institutional Asset Management Interface
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
