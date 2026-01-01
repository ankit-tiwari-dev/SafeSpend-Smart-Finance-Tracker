import moment from "moment";
import {
  LuTriangleAlert,
  LuCircleCheck,
  LuTrendingUp,
  LuInfo,
} from "react-icons/lu";

const InsightCard = ({ insight }) => {
  const { type = "info", message = "", date } = insight || {};

  const getStyle = (type) => {
    switch (type) {
      case "warning":
        return {
          icon: <LuTriangleAlert size={22} />,
          color: "text-[#ff3366]",
          bg: "bg-[#ff3366]/10 border-[#ff3366]/20",
          glow:
            "shadow-[0_0_20px_color-mix(in_srgb,var(--color-error),transparent_60%)]",
          label: "Anomaly Detected",
        };
      case "success":
        return {
          icon: <LuCircleCheck size={22} />,
          color: "text-secondary",
          bg: "bg-secondary/10 border-secondary/20",
          glow:
            "shadow-[0_0_20px_color-mix(in_srgb,var(--color-secondary),transparent_60%)]",
          label: "Optimization Peak",
        };
      case "revenue":
        return {
          icon: <LuTrendingUp size={22} />,
          color: "text-primary",
          bg: "bg-primary/10 border-primary/20",
          glow:
            "shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary),transparent_60%)]",
          label: "Yield Acceleration",
        };
      case "info":
      default:
        return {
          icon: <LuInfo size={22} />,
          color: "text-primary",
          bg: "bg-primary/10 border-primary/20",
          glow:
            "shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary),transparent_60%)]",
          label: "System Briefing",
        };
    }
  };

  const style = getStyle(type);

  return (
    <div
      role="article"
      aria-label={style.label}
      className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 
                 bg-[var(--color-surface)] p-5 sm:p-8 rounded-[28px] sm:rounded-[40px] 
                 border border-[var(--color-border)] transition-all duration-500
                 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5"
    >
      {/* Icon */}
      <div
        className={`w-14 h-14 sm:w-20 sm:h-20 rounded-[20px] sm:rounded-[28px] border 
                    flex items-center justify-center flex-shrink-0 
                    transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
                    ${style.color} ${style.bg} ${style.glow}`}
      >
        {style.icon}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2 sm:space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className={`text-[9px] font-black uppercase tracking-[0.35em] ${style.color}`}
          >
            {style.label}
          </span>
          <div className="h-px w-6 bg-[var(--color-border)] hidden sm:block" />
        </div>

        <h4 className="text-base sm:text-xl font-black tracking-tight text-[var(--color-text)] leading-snug line-clamp-3">
          {message}
        </h4>

        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)] opacity-30">
            {date ? `Updated ${moment(date).fromNow()}` : "Status synchronized"}
          </p>
        </div>
      </div>

      {/* Decorative Spinner (desktop only) */}
      <div className="hidden sm:block absolute right-8 opacity-0 group-hover:opacity-100 transition-all duration-700">
        <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center animate-spin-slow">
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,229,255,1)]" />
        </div>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default InsightCard;
