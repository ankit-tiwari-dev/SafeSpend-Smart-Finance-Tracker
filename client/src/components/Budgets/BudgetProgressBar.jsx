import React from "react";

const BudgetProgressBar = ({ spent = 0, limit = 0, isLoading = false }) => {
  // ✅ Loading / skeleton state
  if (isLoading) {
    return (
      <div className="w-full animate-pulse">
        <div className="flex justify-between mb-2 gap-2">
          <div className="h-3 w-24 bg-[var(--color-divider)] rounded" />
          <div className="h-3 w-16 bg-[var(--color-divider)] rounded" />
        </div>
        <div className="w-full h-2 rounded-full bg-[var(--color-divider)]" />
      </div>
    );
  }

  // ✅ Handle zero limit safely
  const safeLimit = limit > 0 ? limit : 1;
  const percentage = Math.min((spent / safeLimit) * 100, 100);
  const displayPercentage = limit > 0 ? Math.round((spent / safeLimit) * 100) : 0;

  // ✅ Determine status & color
  let colorClass = "bg-emerald-500";
  let textColorClass = "text-emerald-500";
  let statusLabel = "Safe";

  if (spent > limit && limit > 0) {
    colorClass = "bg-red-500";
    textColorClass = "text-red-500";
    statusLabel = "Exceeded";
  } else if (percentage >= 80 && limit > 0) {
    colorClass = "bg-amber-500";
    textColorClass = "text-amber-500";
    statusLabel = "Warning";
  }

  // ✅ Handle empty / zero budget
  if (limit === 0) {
    return (
      <div className="w-full text-center text-[11px] text-[var(--color-text-muted)] opacity-60">
        No budget limit set
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header: percentage + status */}
      <div className="flex justify-between items-center mb-2 gap-2">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[var(--color-text)]">
          {displayPercentage}% Consumed
        </span>
        <span
          className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${textColorClass}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Progress Bar */}
      <div
        className="w-full rounded-full h-2 sm:h-1.5 overflow-hidden border border-[var(--color-border)]"
        style={{ backgroundColor: "var(--color-divider)" }}
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ease-in-out ${colorClass}`}
          style={{
            width: `${percentage}%`,
            boxShadow:
              spent > limit
                ? "0 0 10px rgba(239,68,68,0.4)"
                : statusLabel === "Warning"
                ? "0 0 10px rgba(245,158,11,0.4)"
                : "0 0 10px rgba(16,185,129,0.4)",
          }}
        />
      </div>
    </div>
  );
};

export default BudgetProgressBar;
