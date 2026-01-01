const InfoCard = ({
  icon,
  label,
  value = "0",
  moneyType,
  isLoading = false,
}) => {
  const getMetrics = () => {
    const maps = {
      revenue: { color: "var(--color-money-1)", label: "Capital Inflow" },
      expenses: { color: "var(--color-money-2)", label: "Financial Burn" },
      profit: { color: "var(--color-money-3)", label: "Net Yield" },
      forecast: { color: "var(--color-money-4)", label: "Strategic Projection" },
    };
    return maps[moneyType] || { color: "var(--color-text)", label };
  };

  const metrics = getMetrics();

  // ✅ Loading / skeleton state
  if (isLoading) {
    return (
      <div className="bg-[var(--color-surface)] p-6 sm:p-8 rounded-3xl border border-[var(--color-border)] animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[var(--color-divider)]" />
          <div className="space-y-2 flex-1">
            <div className="h-3 w-24 bg-[var(--color-divider)] rounded" />
            <div className="h-6 w-full max-w-[120px] bg-[var(--color-divider)] rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative bg-[var(--color-surface)] p-6 sm:p-8 rounded-3xl sm:rounded-[40px]
                 border border-[var(--color-border)] transition-all duration-500
                 hover:scale-[1.02] hover:border-primary/30 shadow-card hover:shadow-2xl"
      aria-label={`${metrics.label}: ₹${value}`}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-3xl sm:rounded-[40px] bg-gradient-to-br from-primary/5 to-transparent
                   opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
      />

      <div className="flex items-center gap-4 sm:gap-6 relative z-10">
        {/* Icon */}
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-xl sm:text-2xl
                     rounded-2xl border transition-all duration-500 group-hover:scale-110 shrink-0"
          style={{
            backgroundColor: `color-mix(in_srgb, ${metrics.color}, transparent 90%)`,
            borderColor: `color-mix(in_srgb, ${metrics.color}, transparent 80%)`,
            color: metrics.color,
          }}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="min-w-0">
          <h6 className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest
                         text-[var(--color-text-muted)] opacity-40 mb-1 truncate">
            {metrics.label}
          </h6>

          <div className="flex items-baseline gap-1 overflow-hidden">
            <span
              className="text-xs sm:text-sm font-bold opacity-30 flex-shrink-0"
              style={{ color: metrics.color }}
            >
              ₹
            </span>
            <span
              className="text-2xl sm:text-3xl font-bold tracking-tight tabular-nums truncate"
              style={{ color: metrics.color }}
              title={`₹${value}`}
            >
              {value ?? "0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
