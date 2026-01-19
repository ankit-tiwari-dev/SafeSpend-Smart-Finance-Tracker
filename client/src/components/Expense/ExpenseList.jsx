import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { LuDownload } from "react-icons/lu";

const ExpenseList = ({ transactions, onDelete, onDownload, onEdit }) => {
  return (
    <section className="bg-[var(--color-surface)] p-5 sm:p-8 rounded-[28px] sm:rounded-[38px] border border-[var(--color-border)] shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h5 className="text-lg sm:text-2xl font-black tracking-tight text-[var(--color-text)]">
              Burn Ledger
            </h5>

            {/* Entry count (visible on all screens) */}
            <span className="inline-flex w-fit px-2 py-0.5 rounded-md bg-red-500/10 text-red-500 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
              {transactions?.length || 0} Entries
            </span>
          </div>

          {/* Export button */}
          <button
            onClick={onDownload}
            className="flex items-center justify-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] opacity-70 hover:opacity-100 hover:text-primary transition-colors bg-[var(--color-divider)] py-2.5 px-4 rounded-xl border border-[var(--color-border)] hover:border-primary/30 active:scale-[0.97]"
          >
            <LuDownload size={14} />
            Export Report
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[65vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 sm:gap-y-4">
            {transactions?.length > 0 ? (
              transactions.map((expense) => (
                <TransactionInfoCard
                  key={expense._id}
                  title={expense.category}
                  icon={expense.icon}
                  date={moment(expense.date).format("Do MMM YYYY")}
                  amount={expense.amount}
                  type="expense"
                  onDelete={() => onDelete(expense._id)}
                  onEdit={() => onEdit(expense)}
                />
              ))
            ) : (
              <div className="col-span-full py-12 flex flex-col items-center justify-center opacity-40">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-center">
                  No expense data available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpenseList;
