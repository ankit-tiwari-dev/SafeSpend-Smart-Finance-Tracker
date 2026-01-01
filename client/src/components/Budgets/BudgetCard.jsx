import React from "react";
import moment from "moment";
import { FaPen, FaTrash } from "react-icons/fa";
import { formatAmount } from "../../utils/helper";

const BudgetCard = ({ budget, onEdit, onDelete }) => {
  if (!budget) {
    return (
      <div className="bg-[var(--color-surface)] p-6 rounded-3xl border border-dashed border-[var(--color-border)] text-center text-sm text-[var(--color-text-muted)] opacity-60">
        No budget data available
      </div>
    );
  }

  const {
    category = "Untitled",
    spent = 0,
    limit = 0,
    _id,
    month,
  } = budget;

  const safeLimit = limit > 0 ? limit : 1;
  const percent = Math.min(100, (spent / safeLimit) * 100);
  const isOver = spent > limit && limit > 0;

  return (
    <div className="group relative bg-[var(--color-surface)] p-6 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[48px] border border-[var(--color-border)] transition-all duration-500 hover:scale-[1.02] hover:border-primary/30 hover:shadow-2xl flex flex-col min-h-[260px] sm:min-h-[300px]">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-[90px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex justify-between items-start mb-6 sm:mb-8 gap-4">
        <div className="space-y-2 min-w-0">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight truncate">
            {category}
          </h3>
          {month && (
            <div className="inline-flex py-1 px-3 rounded-lg bg-[var(--color-divider)] border border-[var(--color-border)] text-[9px] uppercase font-black tracking-widest text-primary/60">
              {moment(month, "YYYY-MM").format("MMMM YYYY")}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(budget)}
            disabled={!limit}
            className="p-2.5 rounded-xl bg-[var(--color-divider)] text-[var(--color-text-muted)] hover:text-primary hover:bg-primary/10 transition disabled:opacity-30"
            title="Edit Budget"
          >
            <FaPen size={13} />
          </button>

          <button
            onClick={() => onDelete(_id)}
            disabled={!limit}
            className="p-2.5 rounded-xl bg-[var(--color-divider)] text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-500/10 transition disabled:opacity-30"
            title="Delete Budget"
          >
            <FaTrash size={13} />
          </button>
        </div>
      </div>

      {/* Amounts */}
      <div className="flex justify-between items-end mb-6 gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-widest opacity-30">
            Spent
          </p>
          <div
            className={`text-2xl sm:text-3xl lg:text-4xl font-black tabular-nums ${isOver ? "text-red-500" : ""}`}
            title={`₹${spent}`}
          >
            <span className="text-lg opacity-30 mr-1">₹</span>
            {formatAmount(spent)}
          </div>
        </div>

        <div className="text-right">
          <p className="text-[9px] uppercase tracking-widest opacity-30">
            Limit
          </p>
          <div
            className="text-sm sm:text-base font-black opacity-50"
            title={`₹${limit}`}
          >
            ₹{formatAmount(limit)}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="relative h-2.5 w-full bg-[var(--color-bg)] rounded-full overflow-hidden border border-[var(--color-border)]">
        <div
          className={`h-full rounded-full transition-all duration-700 ${isOver ? "bg-red-500" : "bg-primary"}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Footer */}
      <div className="mt-auto pt-5 flex justify-between items-center text-xs opacity-60">
        <span>{isOver ? "Limit exceeded" : "Within limit"}</span>
        <span
          className={`font-bold ${isOver ? "text-red-500" : "text-secondary"}`}
          title={`₹${Math.max(0, limit - spent)}`}
        >
          ₹{formatAmount(Math.max(0, limit - spent))}
        </span>
      </div>
    </div>
  );
};

export default BudgetCard;
