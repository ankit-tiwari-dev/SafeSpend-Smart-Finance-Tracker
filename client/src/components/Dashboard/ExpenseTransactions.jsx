import { LuArrowRight, LuActivity } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import EmptyTransactionInfoCard from "../Cards/EmptyTransactionInfoCard";

const ExpenseTransactions = ({
  transactions = [],
  onSeeMore,
  isLoading = false,
}) => {
  return (
    <div className="flex flex-col h-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[40px] p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full -mr-16 -mt-16 pointer-events-none" />

      {/* Header Section */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
              <LuActivity className="text-red-500 text-xs animate-pulse" />
            </div>
            <h5 className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-[var(--color-text)]">
              Capital Outflow
            </h5>
          </div>
          <p className="text-[9px] font-bold text-[var(--color-text-muted)] opacity-30 uppercase tracking-widest ml-7">
            Live Transaction Feed
          </p>
        </div>

        <button
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
          onClick={onSeeMore}
          disabled={isLoading}
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] group-hover:text-primary transition-colors">
            Full Audit
          </span>
          <LuArrowRight className="text-xs group-hover:translate-x-1 transition-transform text-[var(--color-text-muted)] group-hover:text-primary" />
        </button>
      </div>

      {/* State Management */}
      <div className="flex-1 overflow-hidden">
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="h-16 w-full rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse" 
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !transactions.length && (
          <div className="py-12 px-4">
            <EmptyTransactionInfoCard
              title="Ledger Empty"
              description="No active capital outflow detected in the current cycle."
            />
          </div>
        )}

        {/* Transaction Feed */}
        {!isLoading && transactions.length > 0 && (
          <div className="space-y-3 sm:space-y-4">
            {transactions.slice(0, 5).map((expense, index) => (
              <div
                key={expense._id}
                className="animate-in fade-in slide-in-from-right-4 duration-500 ease-out fill-mode-both"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <TransactionInfoCard
                  title={expense.category}
                  icon={expense.icon}
                  date={moment(expense.date).format("DD MMM YYYY")}
                  amount={expense.amount}
                  type="expense"
                  hideDeleteBtn
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decorative Footer Detail */}
      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between opacity-20">
        <div className="text-[8px] font-black uppercase tracking-tighter">Secure Link: 128-bit Encryption</div>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-primary" />
          <div className="w-1 h-1 rounded-full bg-primary" />
          <div className="w-1 h-1 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
};

export default ExpenseTransactions;