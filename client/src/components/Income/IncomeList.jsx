import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { LuDownload, LuInbox } from "react-icons/lu";

const IncomeList = (props) => {
  const { transactions, onDelete, onDownload, onEdit } = props;

  return (
    <div className="bg-[var(--color-surface)] backdrop-blur-xl p-4 sm:p-8 rounded-[30px] sm:rounded-[38px] border border-[var(--color-border)] shadow-xl transition-all">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-5">
        <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <h5 className="text-base sm:text-2xl font-black tracking-tight text-[var(--color-text)]">
              Revenue Ledger
            </h5>
            <div className="inline-flex w-fit px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] border border-emerald-500/20">
              {transactions?.length || 0} Entries
            </div>
          </div>

          <button
            onClick={onDownload}
            className="sm:hidden p-2.5 rounded-xl bg-[var(--color-divider)] border border-[var(--color-border)] text-primary active:scale-95 transition-all shrink-0"
            aria-label="Download Report"
          >
            <LuDownload size={16} />
          </button>
        </div>

        <button
          onClick={onDownload}
          className="hidden sm:flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-primary transition-all bg-[var(--color-divider)] py-3 px-6 rounded-2xl border border-[var(--color-border)] hover:border-primary/40 shadow-sm active:scale-95"
        >
          <LuDownload size={16} />
          <span>Export Report</span>
        </button>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-x-10">
        {transactions?.length > 0 ? (
          transactions.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
              onEdit={() => onEdit(income)}
            />
          ))
        ) : (
          /* ULTIMATE RESPONSIVE EMPTY STATE */
          <div className="col-span-full py-16 sm:py-24 flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-border)] rounded-[30px] bg-[var(--color-bg)]/50 px-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-[var(--color-divider)] flex items-center justify-center mb-6 text-[var(--color-text-muted)] opacity-30">
              <LuInbox size={28} className="sm:w-8 sm:h-8" />
            </div>

            <p className="
              text-[9px] sm:text-xs 
              font-black uppercase 
              text-center 
              w-full max-w-[120px] sm:max-w-none
              break-words
              leading-relaxed
              text-[var(--color-text-muted)] opacity-60
              tracking-tight sm:tracking-[0.3em]
            ">
              No tactical inflow detected
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeList;