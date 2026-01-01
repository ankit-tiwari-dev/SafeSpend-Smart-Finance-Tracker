import moment from "moment";
import { FaPen, FaTrash } from "react-icons/fa";
import { addThousandsSeparator } from "../../utils/helper";

const GoalCard = ({ goal, onEdit, onDelete }) => {
  const {
    title = "Untitled Goal",
    targetAmount = 0,
    currentAmount = 0,
    deadline,
    color,
    _id,
  } = goal;

  const safeTarget = Math.max(targetAmount, 1);
  const percentage = Math.min((currentAmount / safeTarget) * 100, 100);
  const remaining = Math.max(0, targetAmount - currentAmount);

  return (
    <div
      className="
        group relative bg-[var(--color-surface)]
        p-6 sm:p-8 lg:p-10
        rounded-[32px] sm:rounded-[44px] lg:rounded-[56px]
        border border-[var(--color-border)]
        transition-all duration-500
        hover:scale-[1.015] hover:border-secondary/30
        hover:shadow-2xl hover:shadow-[0_20px_50px_color-mix(in_srgb,var(--color-secondary),transparent_95%)]
        flex flex-col min-h-[320px] sm:min-h-[360px]
      "
    >
      {/* Atmospheric Glow */}
      <div
        className="absolute top-0 left-0 w-56 sm:w-64 h-56 sm:h-64 blur-[120px] rounded-full opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none"
        style={{ backgroundColor: color || "#00ffa3" }}
      />

      {/* Header */}
      <div className="flex justify-between items-start gap-4 mb-8 sm:mb-10 relative z-10">
        <div className="space-y-2 min-w-0">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-[var(--color-text)] truncate">
            {title}
          </h3>

          {deadline && (
            <div className="inline-flex py-1.5 px-3 sm:px-4 rounded-xl bg-[var(--color-divider)] border border-[var(--color-border)] text-[9px] uppercase font-black tracking-[0.3em] text-secondary/60">
              Target Horizon: {moment(deadline).format("MMM YYYY")}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 shrink-0">
          <button
            aria-label="Edit goal"
            onClick={() => onEdit(goal)}
            className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[var(--color-divider)] text-[var(--color-text-muted)] opacity-50 hover:opacity-100 hover:text-secondary hover:bg-secondary/10 transition-all border border-transparent hover:border-secondary/20"
          >
            <FaPen size={14} />
          </button>

          <button
            aria-label="Delete goal"
            onClick={() => onDelete(_id)}
            className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[var(--color-divider)] text-[var(--color-text-muted)] opacity-50 hover:opacity-100 hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="mt-auto space-y-8 sm:space-y-10 relative z-10">
        {/* Amounts */}
        <div className="flex justify-between items-end gap-6">
          <div className="space-y-2">
            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-30">
              Accumulated Assets
            </p>

            <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[var(--color-text)] tabular-nums">
              <span className="text-lg opacity-30 mr-1">₹</span>
              {addThousandsSeparator(currentAmount)}
            </div>
          </div>

          <div className="text-right space-y-2">
            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-30">
              Objective Peak
            </p>
            <div className="text-sm sm:text-lg font-black text-[var(--color-text-muted)] opacity-50 tabular-nums">
              ₹{addThousandsSeparator(targetAmount)}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-4">
          <div className="w-full h-3 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] overflow-hidden p-[3px]">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden shadow-[0_0_20px_rgba(0,255,163,0.35)]"
              style={{
                width: `${percentage}%`,
                backgroundColor: color || "#00ffa3",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[45deg] animate-[shimmer_2s_infinite]" />
            </div>
          </div>

          <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-black uppercase tracking-[0.35em]">
            <span className="text-secondary">
              {Math.round(percentage)}% Achieved
            </span>
            <span className="text-[var(--color-text-muted)] opacity-30">
              ₹{addThousandsSeparator(remaining)} Remaining
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-45deg); }
          100% { transform: translateX(150%) skewX(-45deg); }
        }
      `}</style>
    </div>
  );
};

export default GoalCard;
