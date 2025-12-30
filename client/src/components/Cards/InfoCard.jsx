const InfoCard = (props) => {
  const { icon, label, value, moneyType } = props;

  const getMetrics = () => {
    const maps = {
      revenue: {
        color: "var(--color-money-1)",
        label: "Capital Inflow"
      },
      expenses: {
        color: "var(--color-money-2)",
        label: "Financial Burn"
      },
      profit: {
        color: "var(--color-money-3)",
        label: "Net Yield"
      },
      forecast: {
        color: "var(--color-money-4)",
        label: "Strategic Projection"
      },
    };
    return maps[moneyType] || { color: "var(--color-text)", label };
  };

  const metrics = getMetrics();

  return (
    <div className="group relative bg-[var(--color-surface)] p-8 rounded-[40px] border border-[var(--color-border)] transition-all duration-500 hover:scale-[1.02] hover:border-primary/30 shadow-card hover:shadow-2xl hover:shadow-[0_20px_50px_color-mix(in_srgb,var(--color-primary),transparent_95%)]">
      {/* Radiant Atmosphere (Hover) */}
      <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex items-center gap-6 relative z-10">
        <div
          className="w-16 h-16 flex items-center justify-center text-3xl rounded-3xl border transition-all duration-500 group-hover:scale-110 shadow-lg"
          style={{
            backgroundColor: `color-mix(in_srgb, ${metrics.color}, transparent 90%)`,
            borderColor: `color-mix(in_srgb, ${metrics.color}, transparent 80%)`,
            color: metrics.color
          }}
        >
          {icon}
        </div>

        <div>
          <h6 className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--color-text-muted)] opacity-30 mb-1.5">
            {metrics.label}
          </h6>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-sm font-bold opacity-30" style={{ color: metrics.color }}>₹</span>
            <span
              className="text-3xl font-bold tracking-tighter tabular-nums drop-shadow-sm"
              style={{ color: metrics.color }}
            >
              {value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};



export default InfoCard;
