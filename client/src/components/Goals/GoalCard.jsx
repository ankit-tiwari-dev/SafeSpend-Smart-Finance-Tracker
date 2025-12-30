import moment from "moment";
import { FaPen, FaTrash } from "react-icons/fa";
import { addThousandsSeparator } from "../../utils/helper";

const GoalCard = ({ goal, onEdit, onDelete }) => {
  const { title, targetAmount, currentAmount, deadline, color, _id } = goal;
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);

  return (
    <div className="group relative bg-[var(--color-surface)] p-10 rounded-[56px] border border-[var(--color-border)] transition-all duration-500 hover:scale-[1.02] hover:border-secondary/30 hover:shadow-2xl hover:shadow-[0_20px_50px_color-mix(in_srgb,var(--color-secondary),transparent_95%)] flex flex-col min-h-[360px]">
      {/* Dynamic Background Atmospheric Bloom */}
      <div
        className="absolute top-0 left-0 w-64 h-64 blur-[120px] rounded-full opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none"
        style={{ backgroundColor: color || '#00ffa3' }}
      />

      <div className="flex justify-between items-start mb-10">
        <div className="space-y-2">
          <h3 className="text-2xl font-black tracking-tighter text-[var(--color-text)]">
            {title}
          </h3>
          <div className="inline-flex py-1.5 px-4 rounded-xl bg-[var(--color-divider)] border border-[var(--color-border)] text-[9px] uppercase font-black tracking-[0.3em] text-secondary/60">
            Target Horizon: {moment(deadline).format("MMM YYYY")}
          </div>
        </div>

        <div className="flex gap-2 relative z-10">
          <button
            onClick={() => onEdit(goal)}
            className="p-3 rounded-2xl bg-[var(--color-divider)] text-[var(--color-text-muted)] opacity-40 hover:text-secondary hover:bg-secondary/10 transition-all border border-transparent hover:border-secondary/20"
          >
            <FaPen size={14} />
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="p-3 rounded-2xl bg-[var(--color-divider)] text-[var(--color-text-muted)] opacity-40 hover:text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>

      <div className="mt-auto space-y-10 relative z-10">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-20">Accumulated Assets</p>
            <div className="text-4xl font-black tracking-tighter text-[var(--color-text)] tabular-nums">
              <span className="text-xl opacity-30 mr-1.5">₹</span>{addThousandsSeparator(currentAmount)}
            </div>
          </div>
          <div className="text-right space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-20">Objective Peak</p>
            <div className="text-xl font-black text-[var(--color-text-muted)] opacity-40 tabular-nums">
              ₹{addThousandsSeparator(targetAmount)}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="w-full h-3 rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] overflow-hidden p-[3px]">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden shadow-[0_0_20px_rgba(0,255,163,0.3)]"
              style={{
                width: `${percentage}%`,
                backgroundColor: color || '#00ffa3',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[45deg] animate-[shimmer_2s_infinite]" />
            </div>
          </div>

          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary">
              {Math.round(percentage)}% Synchronization
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-20">
              ₹{addThousandsSeparator(Math.max(0, targetAmount - currentAmount))} to Peak
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
