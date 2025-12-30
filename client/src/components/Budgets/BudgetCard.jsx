import moment from "moment";
import { FaPen, FaTrash } from "react-icons/fa";
import { addThousandsSeparator } from "../../utils/helper";

const BudgetCard = ({ budget, onEdit, onDelete }) => {
  const { category, spent, limit, _id } = budget;

  const percent = Math.min(100, (spent / limit) * 100);
  const isOver = spent > limit;

  return (
    <div className="group relative bg-[var(--color-surface)] p-10 rounded-[56px] border border-[var(--color-border)] transition-all duration-500 hover:scale-[1.02] hover:border-primary/30 hover:shadow-2xl hover:shadow-[0_20px_50px_color-mix(in_srgb,var(--color-primary),transparent_95%)] flex flex-col min-h-[320px]">
      {/* Background Glow Atmospheric */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-colors pointer-events-none" />

      <div className="flex justify-between items-start mb-10">
        <div className="space-y-2">
          <h3 className="text-2xl font-black tracking-tighter text-[var(--color-text)]">
            {category}
          </h3>
          <div className="inline-flex py-1.5 px-4 rounded-xl bg-[var(--color-divider)] border border-[var(--color-border)] text-[9px] uppercase font-black tracking-[0.3em] text-primary/60">
            {moment(budget.month, "YYYY-MM").format("MMMM YYYY")}
          </div>
        </div>

        <div className="flex gap-2 relative z-10">
          <button
            onClick={() => onEdit(budget)}
            className="p-3 rounded-2xl bg-[var(--color-divider)] text-[var(--color-text-muted)] opacity-40 hover:text-primary hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20"
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

      <div className="flex justify-between items-end mb-8 relative z-10">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-20">Drain State</p>
          <div className={`text-4xl font-black tracking-tighter tabular-nums ${isOver ? 'text-red-500' : 'text-[var(--color-text)]'}`}>
            <span className="text-xl opacity-30 mr-1.5">₹</span>{addThousandsSeparator(spent)}
          </div>
        </div>
        <div className="text-right space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-text-muted)] opacity-20">Cap Limit</p>
          <div className="text-xl font-black text-[var(--color-text-muted)] opacity-40 tabular-nums">
            ₹{addThousandsSeparator(limit)}
          </div>
        </div>
      </div>

      <div className="relative h-2.5 w-full bg-[var(--color-bg)] rounded-full overflow-hidden border border-[var(--color-border)] p-0.5">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out relative ${isOver ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-primary shadow-[0_0_15px_rgba(0,229,255,0.5)]'}`}
          style={{ width: `${percent}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[45deg] animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      <div className="mt-10 flex justify-between items-center pt-6 border-t border-[var(--color-divider)]">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${isOver ? 'bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]' : 'bg-secondary shadow-[0_0_10px_rgba(0,255,163,0.5)]'}`} />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)] opacity-40">
            {isOver ? 'Threshold Breached' : 'Structural Integrity'}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)] opacity-20 mr-3">Delta</span>
          <span className={`text-sm font-black tabular-nums ${isOver ? 'text-red-500' : 'text-secondary'}`}>
            ₹{addThousandsSeparator(Math.max(0, limit - spent))}
          </span>
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



export default BudgetCard;
