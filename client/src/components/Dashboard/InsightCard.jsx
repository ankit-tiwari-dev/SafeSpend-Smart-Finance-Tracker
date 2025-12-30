import moment from "moment";
import { LuTriangleAlert, LuCircleCheck, LuTrendingUp, LuInfo } from "react-icons/lu";

const InsightCard = ({ insight }) => {
  const { type, message, date } = insight;

  const getStyle = (type) => {
    switch (type) {
      case "warning":
        return {
          icon: <LuTriangleAlert size={24} />,
          color: "text-[#ff3366]",
          bg: "bg-[#ff3366]/10 border-[#ff3366]/20",
          glow: "shadow-[0_0_20px_color-mix(in_srgb,var(--color-error),transparent_60%)]",
          label: "Anomaly Detected"
        };
      case "success":
        return {
          icon: <LuCircleCheck size={24} />,
          color: "text-secondary",
          bg: "bg-secondary/10 border-secondary/20",
          glow: "shadow-[0_0_20px_color-mix(in_srgb,var(--color-secondary),transparent_60%)]",
          label: "Optimization Peak"
        };
      case "revenue":
        return {
          icon: <LuTrendingUp size={24} />,
          color: "text-primary",
          bg: "bg-primary/10 border-primary/20",
          glow: "shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary),transparent_60%)]",
          label: "Yield Acceleration"
        };
      case "info":
      default:
        return {
          icon: <LuInfo size={24} />,
          color: "text-primary",
          bg: "bg-primary/10 border-primary/20",
          glow: "shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary),transparent_60%)]",
          label: "System Briefing"
        };
    }
  };

  const style = getStyle(type);

  return (
    <div className="group relative flex items-center gap-8 bg-[var(--color-surface)] p-8 rounded-[40px] border border-[var(--color-border)] transition-all duration-500 hover:scale-[1.01] hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5">
      <div className={`w-20 h-20 rounded-[28px] border flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${style.color} ${style.bg} ${style.glow} shadow-2xl`}>
        {style.icon}
      </div>

      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-3">
          <span className={`text-[9px] font-black uppercase tracking-[0.4em] ${style.color}`}>
            {style.label}
          </span>
          <div className="h-px w-8 bg-[var(--color-border)]" />
        </div>
        <h4 className="text-xl font-black tracking-tight text-[var(--color-text)] leading-tight">
          {message}
        </h4>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)] opacity-20">
            Protocols synchronized {moment(date).fromNow()}
          </p>
        </div>
      </div>

      <div className="absolute right-10 opacity-0 group-hover:opacity-100 transition-all duration-700">
        <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center animate-spin-slow">
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,229,255,1)]" />
        </div>
      </div>

      <style>{`
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};



export default InsightCard;
