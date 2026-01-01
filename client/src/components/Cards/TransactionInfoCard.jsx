import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2, LuPencil } from "react-icons/lu";
import { formatAmount } from "../../utils/helper";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
  onEdit,
  isLoading = false,
}) => {
  const isIncome = type === "income";

  // ✅ Loading skeleton
  if (isLoading) {
    return (
      <div className="flex items-center gap-4 p-4 sm:p-6 rounded-[24px] border border-[var(--color-border)] animate-pulse">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-[18px] bg-[var(--color-divider)]" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-1/2 bg-[var(--color-divider)] rounded" />
          <div className="h-3 w-1/3 bg-[var(--color-divider)] rounded" />
        </div>
        <div className="h-4 w-20 bg-[var(--color-divider)] rounded" />
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] transition-all duration-500 hover:bg-[var(--color-divider)] border border-transparent hover:border-[var(--color-border)] mt-2">
      
      {/* Icon */}
      <div
        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-[18px] sm:rounded-[24px] flex items-center justify-center text-xl sm:text-2xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0 shadow-2xl ${
          isIncome
            ? "bg-primary/10 border-primary/20 text-primary"
            : "bg-[var(--color-chart-4)]/10 border-[var(--color-chart-4)]/20 text-[var(--color-chart-4)]"
        }`}
      >
        {icon ? (
          icon.startsWith("http") ? (
            <img src={icon} alt={title} className="w-8 h-8 object-contain" />
          ) : (
            <span>{icon}</span>
          )
        ) : (
          isIncome ? <LuTrendingUp /> : <LuTrendingDown />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 min-w-0">
        <div className="min-w-0">
          <h4 className="text-base sm:text-lg font-black truncate">{title}</h4>
          <p className="text-[9px] uppercase tracking-[0.3em] opacity-40">{date}</p>
        </div>

        {/* Amount + Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-4 min-w-[120px]">
          <div
            className={`text-lg sm:text-xl font-bold tabular-nums truncate ${
              isIncome ? "text-primary" : "text-[var(--color-chart-4)]"
            }`}
            title={`${isIncome ? "+" : "-"} ₹${formatAmount(amount)}`}
          >
            {isIncome ? "+" : "-"} ₹{formatAmount(amount)}
          </div>

          {!hideDeleteBtn && (
            <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all">
              <button
                onClick={onEdit}
                className="p-2 rounded-xl border hover:text-primary hover:bg-primary/10"
                aria-label="Edit Transaction"
              >
                <LuPencil size={12} />
              </button>
              <button
                onClick={onDelete}
                className="p-2 rounded-xl border hover:text-red-500 hover:bg-red-500/10"
                aria-label="Delete Transaction"
              >
                <LuTrash2 size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
