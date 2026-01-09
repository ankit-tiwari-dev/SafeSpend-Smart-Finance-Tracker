import { LuTrendingUp, LuTrendingDown, LuTrash2, LuPencil } from "react-icons/lu";
import { formatAmount } from "../../utils/helper";

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete, onEdit, isLoading = false }) => {
  const isIncome = type === "income";

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 p-4 rounded-[24px] border border-white/5 animate-pulse bg-white/[0.01]">
        <div className="w-12 h-12 rounded-xl bg-white/5 shrink-0" />
        <div className="flex-1 space-y-2 min-w-0">
          <div className="h-3 w-1/2 bg-white/5 rounded" />
          <div className="h-2 w-1/4 bg-white/5 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-[24px] transition-all duration-300 bg-white/[0.01] border border-white/5 hover:border-primary/20 hover:bg-white/[0.04] min-w-0 w-full overflow-hidden">
      
      {/* Icon Section */}
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-lg sm:text-xl border transition-all ${
        isIncome ? "bg-primary/5 border-primary/20 text-primary" 
                 : "bg-red-500/5 border-red-500/20 text-red-500"
      }`}>
        {icon ? (
          icon.startsWith("http") ? (
            <img src={icon} alt={title} className="w-full h-full object-cover rounded-xl" />
          ) : (
            <span>{icon}</span>
          )
        ) : (
          isIncome ? <LuTrendingUp /> : <LuTrendingDown />
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 flex items-center justify-between min-w-0 gap-3">
        <div className="flex flex-col min-w-0 flex-1">
          <h4 className="text-[12px] sm:text-sm font-black uppercase tracking-wider truncate text-[var(--color-text)] opacity-90">
            {title}
          </h4>
          <p className="text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)] opacity-30">
            {date}
          </p>
        </div>

        {/* Right Side Logic: Amount + Actions */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 relative">
          
          {/* Amount: Moves/Fades only on Desktop Hover */}
          <div className={`transition-all duration-500 sm:group-hover:opacity-0 sm:group-hover:scale-90 ${isIncome ? "text-primary" : "text-red-500"}`}>
            <div className="text-[12px] sm:text-base font-black tracking-tighter tabular-nums whitespace-nowrap">
              {isIncome ? "+" : "-"} ₹{formatAmount(amount)}
            </div>
          </div>

          {/* Actions Section */}
          {!hideDeleteBtn && (
            <div className={`
              /* Mobile: Always visible, slightly smaller */
              flex items-center gap-1 opacity-100 static 
              /* Desktop: Hidden until hover, slides in over amount */
              sm:opacity-0 sm:absolute sm:inset-0 sm:justify-end sm:group-hover:opacity-100 sm:translate-x-4 sm:group-hover:translate-x-0 transition-all duration-300
            `}>
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(); }} 
                className="p-2 sm:p-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-black transition-all active:scale-90"
              >
                <LuPencil size={12} className="sm:w-[14px] sm:h-[14px]" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(); }} 
                className="p-2 sm:p-2.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90"
              >
                <LuTrash2 size={12} className="sm:w-[14px] sm:h-[14px]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;