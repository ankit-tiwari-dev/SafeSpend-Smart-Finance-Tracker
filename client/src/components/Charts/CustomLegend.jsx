const CustomLegend = ({ payload = [], isLoading = false }) => {
  // ✅ Loading / skeleton state
  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4 mb-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-[var(--color-divider)]" />
            <div className="h-2 w-10 bg-[var(--color-divider)] rounded" />
          </div>
        ))}
      </div>
    );
  }

  // ✅ Empty state
  if (!payload.length) {
    return (
      <div className="flex justify-center mt-4 mb-4 text-[10px] text-[var(--color-text-muted)] opacity-40">
        No legend data available
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-4 mb-4">
      {payload.map((entry, index) => {
        const label = entry.value ?? entry.dataKey ?? "Unknown";
        const color = entry.color ?? "var(--color-divider)";

        return (
          <div
            key={`legend-${index}`}
            className="flex items-center gap-2 sm:gap-3 group cursor-default"
            title={label}
          >
            <div
              aria-hidden
              className="w-2 h-2 rounded-full transition-transform group-hover:scale-150 duration-300 flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest truncate text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors duration-300">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CustomLegend;
