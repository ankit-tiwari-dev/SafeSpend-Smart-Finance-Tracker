import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { LuDownload } from "react-icons/lu";

const IncomeList = ({ transactions = [], onDelete, onDownload, onEdit }) => {
  const totalEntries = transactions.length;

  return (
    <section
      className="
        bg-[var(--color-surface)]
        backdrop-blur-xl
        p-4 sm:p-6 lg:p-8
        rounded-[24px] sm:rounded-[32px] lg:rounded-[38px]
        border border-[var(--color-border)]
        shadow-xl
        w-full
      "
      aria-labelledby="income-ledger-title"
    >
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h5
            id="income-ledger-title"
            className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-[var(--color-text)]"
          >
            Revenue Ledger
          </h5>

          <span
            className="
              px-2.5 py-1
              rounded-md
              bg-emerald-500/10
              text-emerald-500
              text-[9px] sm:text-[10px]
              font-black
              uppercase
              tracking-widest
              whitespace-nowrap
            "
          >
            {totalEntries} Entries
          </span>
        </div>

        <button
          onClick={onDownload}
          aria-label="Download income report"
          className="
            flex items-center justify-center gap-2
            text-[9px] sm:text-[10px]
            font-black uppercase tracking-widest
            text-[var(--color-text-muted)]
            opacity-70
            hover:opacity-100
            hover:text-primary
            transition-all
            bg-[var(--color-divider)]
            py-2.5 px-4
            rounded-xl
            border border-[var(--color-border)]
            hover:border-primary/30
            active:scale-95
          "
        >
          <LuDownload size={14} />
          Export Report
        </button>
      </header>

      {/* Content */}
      {totalEntries > 0 ? (
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-x-8 lg:gap-x-12
            gap-y-4
          "
        >
          {transactions.map((income) => (
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
          ))}
        </div>
      ) : (
        <div
          className="
            py-12
            flex flex-col
            items-center
            justify-center
            text-center
            opacity-40
          "
        >
          <p className="text-xs sm:text-sm font-black uppercase tracking-widest">
            No income data available
          </p>
          <p className="text-[10px] mt-2 tracking-wide">
            Add your first income entry to get started
          </p>
        </div>
      )}
    </section>
  );
};

export default IncomeList;
