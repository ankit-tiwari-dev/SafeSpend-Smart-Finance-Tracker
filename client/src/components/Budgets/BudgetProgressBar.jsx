import React from "react";

const BudgetProgressBar = ({ spent, limit }) => {
  const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
  const displayPercentage = limit > 0 ? Math.round((spent / limit) * 100) : 0;

  let colorClass = "bg-emerald-500"; // Safe
  let textColorClass = "text-emerald-500";
  let statusLabel = "Safe";

  if (spent > limit && limit > 0) {
    colorClass = "bg-red-500"; // Exceeded
    textColorClass = "text-red-500";
    statusLabel = "Exceeded";
  } else if (percentage >= 80) {
    colorClass = "bg-amber-500"; // Warning
    textColorClass = "text-amber-500";
    statusLabel = "Warning";
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--color-text)" }}>
          {displayPercentage}% Consumed
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${textColorClass}`}>
          {statusLabel}
        </span>
      </div>
      <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ backgroundColor: "var(--color-divider)" }}>
        <div
          className={`h-full rounded-full transition-all duration-700 ease-in-out ${colorClass}`}
          style={{ width: `${percentage}%`, boxShadow: `0 0 8px ${spent > limit ? 'rgba(239, 68, 68, 0.4)' : statusLabel === 'Warning' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(16, 185, 129, 0.4)'}` }}
        ></div>
      </div>
    </div>
  );
};

export default BudgetProgressBar;
