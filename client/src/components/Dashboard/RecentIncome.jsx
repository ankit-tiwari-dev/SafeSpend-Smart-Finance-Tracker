import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import EmptyTransactionInfoCard from "../Cards/EmptyTransactionInfoCard";

const RecentIncome = ({ transactions = [], onSeeMore }) => {
  const hasTransactions = transactions.length > 0;

  return (
    <section
      role="region"
      aria-label="Recent income transactions"
      className="card border-none bg-transparent shadow-none p-0"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8 px-2">
        <h5 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.45em] text-[var(--color-text-muted)] opacity-40">
          Inflow Streams <span className="hidden sm:inline">// Revenue</span>
        </h5>

        <button
          onClick={onSeeMore}
          aria-label="View all income transactions"
          className="text-[9px] font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors flex items-center gap-1 sm:gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
        >
          See All
          <LuArrowRight className="text-sm sm:text-base" />
        </button>
      </div>

      {/* Content */}
      {!hasTransactions ? (
        <EmptyTransactionInfoCard
          title="No Income Records"
          description="Your income transactions will appear here."
        />
      ) : (
        <div className="mt-4 sm:mt-6 space-y-1">
          {transactions.slice(0, 5).map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
              hideDeleteBtn
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentIncome;
