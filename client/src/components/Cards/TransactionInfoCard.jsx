import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
  LuPencil,
} from "react-icons/lu";

const TransactionInfoCard = (props) => {
  const { title, icon, date, amount, type, hideDeleteBtn, onDelete, onEdit } = props;

  const isIncome = type === "income";

  return (
    <div className="group relative flex items-center gap-3 sm:gap-6 p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] transition-all duration-500 hover:bg-[var(--color-divider)] border border-transparent hover:border-[var(--color-border)] mt-2">
      <div
        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-[18px] sm:rounded-[24px] flex items-center justify-center text-xl sm:text-2xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0 shadow-2xl ${isIncome
          ? "bg-primary/10 border-primary/20 text-primary shadow-[0_4px_20px_color-mix(in_srgb,var(--color-primary),transparent_90%)]"
          : "bg-[var(--color-chart-4)]/10 border-[var(--color-chart-4)]/20 text-[var(--color-chart-4)] shadow-[0_4px_20px_color-mix(in_srgb,var(--color-error),transparent_90%)]"
          }`}
      >
        {icon ? (
          icon.startsWith('http') ? (
            <img src={icon} alt={title} className="w-8 h-8 object-contain" />
          ) : (
            <span>{icon}</span>
          )
        ) : (
          isIncome ? <LuTrendingUp /> : <LuTrendingDown />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="min-w-0 space-y-1">
          <h4 className="text-lg font-black tracking-tight text-[var(--color-text)] truncate">
            {title}
          </h4>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[var(--color-text-muted)] opacity-20" />
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)] opacity-40">
              {date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-right space-y-1">
            <div className={`text-xl font-bold tracking-tighter tabular-nums ${isIncome ? 'text-primary' : 'text-[var(--color-chart-4)]'}`}>
              {isIncome ? "+" : "-"} <span className="text-sm opacity-30 mr-1">₹</span>{amount}
            </div>

            <div className="flex justify-end">
              {!hideDeleteBtn && (
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                  <button
                    onClick={onEdit}
                    className="p-2 rounded-xl bg-[var(--color-divider)] text-[var(--color-text-muted)] opacity-40 hover:text-primary hover:bg-primary/10 transition-all border border-[var(--color-border)]"
                  >
                    <LuPencil size={12} />
                  </button>
                  <button
                    onClick={onDelete}
                    className="p-2 rounded-xl bg-[var(--color-divider)] text-[var(--color-text-muted)] opacity-40 hover:text-red-500 hover:bg-red-500/10 transition-all border border-[var(--color-border)]"
                  >
                    <LuTrash2 size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default TransactionInfoCard;
