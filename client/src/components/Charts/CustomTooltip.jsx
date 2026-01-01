const CustomTooltip = ({
  active,
  payload = [],
  colors = [],
  data = [],
  isLoading = false,
}) => {
  // ✅ Loading State
  if (isLoading) {
    return (
      <div className="bg-[var(--color-surface)] p-4 rounded-2xl border border-[var(--color-border)] shadow-xl animate-pulse w-48">
        <div className="h-3 w-24 bg-[var(--color-divider)] rounded mb-3" />
        <div className="h-6 w-32 bg-[var(--color-divider)] rounded" />
      </div>
    );
  }

  // ✅ Safety checks (prevents crash)
  if (!active || !payload.length || !data.length) return null;

  const name = payload[0]?.name ?? "Unknown";
  const value = payload[0]?.value ?? 0;

  const index = data.findIndex((item) => item.name === name);
  const color = colors[index % colors.length] || "var(--color-text-muted)";

  return (
    <div className="bg-[var(--color-surface)] backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-[var(--color-border)] shadow-3xl max-w-[220px]">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2 border-b border-[var(--color-divider)] pb-2">
        <div
          className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] flex-shrink-0"
          style={{ backgroundColor: color, color }}
        />
        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)] truncate">
          {name}
        </p>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-2">
        <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-muted)] opacity-30">
          Value
        </span>
        <p className="text-lg sm:text-xl font-black text-[var(--color-text)] tracking-tight tabular-nums truncate">
          ₹{Number(value).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CustomTooltip;
